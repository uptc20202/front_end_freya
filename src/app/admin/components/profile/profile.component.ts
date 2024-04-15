import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  // Variables para los valores de los campos
  name: string = 'Brayan';
  idNumber: string = '100987765';
  contact: string = '3173094987';
  birthDate: string = '10/10/2002';

  lastName: string = 'Martines';
  gender: string = 'Mujer';
  email: string = 'example@example.com';

  // Variable para controlar si se está en modo de edición
  isEditing: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  // Alternar entre modo de edición y modo de visualización
  toggleEditMode(): void {
    this.isEditing = !this.isEditing;
  }


}
