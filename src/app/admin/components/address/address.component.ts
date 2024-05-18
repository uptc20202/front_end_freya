import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent   implements OnInit {

  @Output() editBtn: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() addressEdit: EventEmitter<any> = new EventEmitter<any>();

  addresses: any[] = [];
  userId: string = '';

  constructor() { }

  ngOnInit(): void {
    // Recuperar las direcciones del localStorage bajo la clave "user"
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        this.addresses = user.shiping_address;
      }
  }

  goBack(): void {
    // Lógica para volver atrás
    // Puedes implementar redirecciones o acciones específicas aquí
    console.log('Volver');
  }

  addAddress(): void {
    // Lógica para agregar una nueva dirección
    this.editBtn.emit(true);
    this.addressEdit.emit();
  }

  editAddress(address: any): void {
    // Lógica para editar una dirección específica
    this.addressEdit.emit(address);
    this.editBtn.emit(true);
  }

  /**
   * Updates the list of addresses when an address is deleted.
   * @param addressId The ID of the deleted address.
   */
  onAddressDeleted(addressId: string): void {
    this.addresses = this.addresses.filter(address => address._id !== addressId);
  }

}
