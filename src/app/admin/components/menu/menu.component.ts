import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/api/services/login/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  stadeRegisterPopup: boolean=false;
  stadeBackGroundPopup: boolean=false;
  stateLogin: boolean=false;
  stateCard: boolean=false;
  admin:boolean=false;

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    this.validateRol();

    this.loginService.validateToken().then((success) => {
      const userData = localStorage.getItem('user');
      if (userData) {
        this.stateLogin =true;
        this.validateRol();
      }else{
        this.stateLogin =false;
      }
      },
      (error) => {
        this.stateLogin =false;
        this.loginService.logout();
        this.admin = false;
      }
    );

  }

  logout(){
    this.showNoLoginOptions = false;
    this.loginService.logout();
    this.homeRoute();
  }

  validateRol(){
    const userJson = localStorage.getItem('user');

    if (userJson) {
      const user = JSON.parse(userJson);
      this.admin = user.role == 'admin';
   }
  }

  showRegisterPopup() {
    this.showUserOptions = false;
    this.stadeRegisterPopup = true;
    this.stadeBackGroundPopup = true;
    this.stadeLoginPopup = false;
  }

  showUserOptions: boolean = false;
  showNoLoginOptions: boolean = false;

  onUserIconHover(): void {

    if(!this.stateLogin){
      this.showNoLoginOptions = true;
    }else{
      this.showNoLoginOptions = false;
    }

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

  routerNavigate(path:string){
    this.router.navigate([path]);
  }

  productsAdminRoute(){
    this.router.navigate(['/admin/products']);
  }

  reportSellRoute() {
    this.router.navigate(['admin/sales-report']);
  }

}
