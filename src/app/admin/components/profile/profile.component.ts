  import { Component, OnInit } from '@angular/core';
import { UpdateUserService } from 'src/app/api/services/updateUser/update-user.service';
import { User } from 'src/app/models/user.model';

  @Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
  })
  export class ProfileComponent implements OnInit {
    // Variables para los valores de los campos
    name: string = 'Cargando...';
    idNumber: string = 'Cargando...';
    contact: string = 'Cargando...';
    birthDate: string = '';

    lastName: string = 'Cargando...';
    gender: string = 'Cargando...';
    email: string = 'Cargando...';
    userUp: User | undefined;
    showSuccessMessage: boolean = false;
    messagePopAd: string = "error";

    // Variable para controlar si se está en modo de edición
    isEditing: boolean = false;

    constructor(private updateUserService : UpdateUserService) {}

    // Alternar entre modo de edición y modo de visualización
    toggleEditMode(): void {

      if (this.isEditing) {
        this.updateUser();
      }

      this.isEditing = !this.isEditing;
    }

    updateUser() {
      this.changeDataUser();
      this.updateUserService.updateUser(this.userUp).subscribe(
        (response) => {
          // Manejar respuesta exitosa
          console.log('Usuario actualizado con éxito:', response);
          const user = response;
          localStorage.setItem('user', JSON.stringify(user));
        },
        (error) => {
          // Manejar error
          console.error('Error al actualizar el usuario:', error);
        }
      );
    }

    changeDataUser(){
      const updatedUserData = {
        first_name: this.name,
        birth_day: this.birthDate,
        gender: this.gender,
        number_phone: this.contact,
        second_name: this.lastName,
        number_document: this.idNumber,
      };

      this.userUp?.updateFields(updatedUserData);
    }




    ngOnInit(): void {
      // Cargar el objeto de usuario desde el almacenamiento local
      const userJson = localStorage.getItem('user');
      if (userJson) {
        // Parsear el JSON para obtener el objeto de usuario
        const user = JSON.parse(userJson);
        this.userUp = new User(user);

        // Asignar los valores a las variables del componente
        this.name = user.first_name; // Combinar nombres
        this.idNumber = user.number_document;
        this.contact = user.number_phone;
        if(this.birthDate.length >= 10){
          this.birthDate = user.birth_day.slice(0, 10); // En formato ISO
        }

        this.lastName = user.second_name; // Puedes agregar esta propiedad si existe
        this.gender = user.gender;
        this.email = user.email;
      }
    }


    //Mensajes de exito o error
    noShowMessagePopAd(message_err: string){
      this.messagePopAd = message_err;
      this.showSuccessMessage = true;
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 3000);
    }

  }
