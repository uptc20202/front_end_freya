import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddressService } from 'src/app/api/services/address/address.service';

@Component({
  selector: 'app-edit-addres',
  templateUrl: './edit-addres.component.html',
  styleUrls: ['./edit-addres.component.scss']
})
export class EditAddresComponent implements OnInit {

  @Output() back: EventEmitter<boolean> = new EventEmitter<boolean>;
  @Output() addressDeleted: EventEmitter<string> = new EventEmitter<string>();

  @Input() id_user: string = "";

  departamentos: any[] = [];
  municipios: any[] = [];

  departamentosAlmacenados: Set<string> = new Set<string>();
  departamentoSelect: string="";
  userId: string = "";
  user:any;

  nuevaDireccion: any = {  // Definición del objeto para almacenar datos del formulario
    address: '',
    municipality: '',
    aditional_info: '',
    neighborhood: '',
    name_addressee: '',
    number_phone: '',
    department:''
  };

  @Input() addressEdit: any;

  constructor(private ubicacionService: AddressService) {}

  ngOnInit(): void {
    this.foodAddress();
    this.setIdUser();
    this.getDepartamentos();
  }

  foodAddress(){
    if(this.addressEdit){
      this.nuevaDireccion = this.addressEdit;
      this.departamentoSelect = this.addressEdit.department;
      this.onDepartamentoSelected(this.departamentoSelect);
    }
  }

  setIdUser(){
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      this.userId = this.user._id; // Asignar el ID del usuario
    }
  }

  getDepartamentos(): void {
    this.ubicacionService.getAllDepartamentos().subscribe(
      (data) => {
        data.forEach((item) => {
          const departamento = item.departamento;
          if (!this.departamentosAlmacenados.has(departamento)) {
            this.departamentosAlmacenados.add(departamento); // Agregar departamento al conjunto de almacenados
            this.departamentos.push(departamento); // Agregar departamento a la lista para mostrar en el select
          }
        });
      },
      (error) => {
        console.error('Error al obtener departamentos:', error);
      }
    );
  }

  onDepartamentoSelected(departamento: any): void {
    this.ubicacionService.getMunicipiosByDepartamento(departamento).subscribe(
      (data) => {
        this.municipios = data.map((item) => item.municipio);
      },
      (error) => {
        console.error(`Error al obtener municipios para ${departamento}:`, error);
      }
    );
  }

  onSaveChanges(): void {
    // Verificar que se haya seleccionado un departamento
    if(this.addressEdit || !this.validateFields()){
      this.editAddres();
      return;
    }

    this.nuevaDireccion.department = this.departamentoSelect;
    // Llamar al servicio para crear la dirección asociada al usuario
    this.ubicacionService.createAddress(this.userId, this.nuevaDireccion).subscribe(
      (response) => {
        console.log('Dirección creada exitosamente:', response);
        this.user.shiping_address = response.usuario.shiping_address;
        localStorage.setItem('user', JSON.stringify(this.user));

        this.back.emit(true);
      },
      (error) => {
        alert('Error al crear la dirección:')
        console.error('Error al crear la dirección:', error);
        // Mostrar mensaje de error al usuario
      }
    );
  }

  editAddres(){
    this.ubicacionService.updateAddress(this.userId, this.addressEdit).subscribe(
      (response) => {
        console.log('Dirección actualizada exitosamente:', response);
        // Actualizar los datos del usuario en el almacenamiento local si es necesario
        this.user.shiping_address = response.usuario.shiping_address;
        localStorage.setItem('user', JSON.stringify(this.user));
      },
      (error) => {
        console.error('Error al actualizar la dirección:', error);
      }
    );
  }

  /**
   * Deletes the current address.
   */
  onDeleteAddress(): void {
    if (!this.addressEdit || !this.addressEdit._id) {
      console.log('No hay dirección seleccionada para eliminar.');
      return;
    }

    this.ubicacionService.deleteAddress(this.id_user, this.addressEdit._id).subscribe(
      (response) => {
        console.log('Dirección eliminada exitosamente:', response);
        // Eliminar la dirección del usuario en el almacenamiento local si es necesario
        this.user.shiping_address = this.user.shiping_address.filter((address: any) => address.id_address !== this.addressEdit._id);
        localStorage.setItem('user', JSON.stringify(this.user));
        this.addressDeleted.emit(this.addressEdit._id);
        this.back.emit(true);
      },
      (error) => {
        alert('Error al eliminar la dirección.');
        console.error('Error al eliminar la dirección:', error);
      }
    );
  }

  validateFields(): boolean{
    console.log("Direccion "+this.nuevaDireccion);

    if (this.nuevaDireccion.address=="" || !this.nuevaDireccion.municipality || this.nuevaDireccion.neighborhood=="" || this.nuevaDireccion.name_addressee=="" || this.nuevaDireccion.number_phone=="") {
      alert('Por favor, complete todos los campos antes de guardar.');
      return false;
    }

    if (!this.departamentoSelect) {
      alert('Debe seleccionar un departamento antes de guardar.');
      return false;
    }

    return true;
  }

}
