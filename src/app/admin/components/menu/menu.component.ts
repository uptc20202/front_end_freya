import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(private router: Router) {}
  //@Output() showLoginPopup = new EventEmitter<void>();
  showUserOptions: boolean = false;

  /*onUserIconClick() {
    this.showLoginPopup.emit();
  }*/

  onUserIconHover(): void {
    this.showUserOptions = true;
  }

  onUserOptionsHover(): void {
    this.showUserOptions = true;
  }

  onUserOptionsLeave(): void {
    this.showUserOptions = false;
  }



  stadeLoginPopup: boolean = false;

  showLoginPopup() {
    this.stadeLoginPopup = true;
  }

  noStadeLoginPopup(){
    this.stadeLoginPopup = false;
  }

  // Método para redirigir al usuario a la ruta \register
  redirectToRegister() {
    this.router.navigate(['/register']);
  }

  homeRoute() {
    this.router.navigate(['/']);
  }

}
