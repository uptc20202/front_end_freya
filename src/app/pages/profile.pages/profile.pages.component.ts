import { Component, ViewChild } from '@angular/core';
import { AddressComponent } from 'src/app/admin/components/address/address.component';

@Component({
  selector: 'app-profile.pages',
  templateUrl: './profile.pages.component.html',
  styleUrls: ['./profile.pages.component.scss']
})
export class ProfilePagesComponent {

  @ViewChild(AddressComponent) addressComponent!: AddressComponent;

  address: boolean =false;
  address_edit: boolean = false;
  profile: boolean= true;
  orders: boolean = false;

  addressEdit: any;
  id_user: string = "";

  ngOnInit(): void{
    const userJson = localStorage.getItem('user');

    if (userJson) {
      const user = JSON.parse(userJson);
      this.id_user = user._id;
    }
  }

  show(componentName: string) {
    switch(componentName){
      case "profile":
        this.profile = true;
        this.address = false;
        this.address_edit = false;
        this.orders = false;
        break;
        case "address":
          this.profile = false;
          this.address = true;
          this.address_edit = false;
          this.orders = false;
          break;
        case "editAddress":
          this.profile = false;
          this.address = false;
          this.address_edit = true;
          this.orders = false;
          break;
          case "orders":
            this.profile = false;
            this.address = false;
            this.address_edit = false;
            this.orders = true;
            break;
        default:
          this.profile = true;
          this.address = false;
          break;
    }
  }

  onAddressDeleted(id_address: string) {
    this.show('address');
    // Llama al método del componente hijo

    if (this.addressComponent) {
      console.log(this.addressComponent);
      this.addressComponent.onAddressDeleted(id_address);
    } else {
      console.error('AddressComponent is not initialized');
    }
  }
}
