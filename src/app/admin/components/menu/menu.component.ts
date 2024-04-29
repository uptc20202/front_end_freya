import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  stadeRegisterPopup: boolean=false;
  stadeBackGroundPopup: boolean=false;

  showRegisterPopup() {
    this.showUserOptions = false;
    this.stadeRegisterPopup = true;
    this.stadeBackGroundPopup = true;
    this.stadeLoginPopup = false;
  }

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
    this.showUserOptions = false;
    this.stadeLoginPopup = true;
    this.stadeBackGroundPopup = true;
    this.stadeRegisterPopup = false;
  }

  noStadeLoginPopup(){
    this.stadeBackGroundPopup = false;
    this.stadeLoginPopup = false;
    this.stadeRegisterPopup =false;
  }

  // Método para redirigir al usuario a la ruta \register
  redirectToRegister() {
    this.router.navigate(['/register']);
  }

  homeRoute() {
    this.router.navigate(['/']);
  }

  profileRoute(){
    this.router.navigate(['/profile']);
  }

  productsRoute(gender: string): void {
    this.router.navigate(['/catalogue/'+gender]);
  }

}
