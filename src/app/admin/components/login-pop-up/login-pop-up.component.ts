import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/api/services/login/login.service';
import { RegisterService } from 'src/app/api/services/register/register.service';
import { PopMessageComponent } from '../pop-message/pop-message.component';

@Component({
  selector: 'app-login-pop-up',
  templateUrl: './login-pop-up.component.html',
  styleUrls: ['./login-pop-up.component.scss']
})
export class LoginPopUpComponent {

  @ViewChild(PopMessageComponent) popMessageComponent!: PopMessageComponent;

  email: string = "";
  password: string = "";
  @Input() title: string = 'INICIAR SESIÓN';
  @Input() showLoginBtn: boolean = false;
  @Input() showRegisterBtn: boolean = false;
  showSuccessMessage: boolean = false;
  messagePopAd: string = "error";
  typeOfAlert: string = "error";

  constructor(private registerService: RegisterService
    ,private loginService: LoginService,private router: Router) {}

  loginBtnClick(): void {
    // Llamar a la función onLogin con los valores de username y password
    this.onLogin(this.email, this.password);
  }

  registerBtnClick() {
    this.register(this.email, this.password);
  }

  setEmail(email: string){
    this.email = email;
  }

  setPassword(pass: string){
    this.password = pass;
  }

  onLogin(email: string, passwordUser: string): void {

    this.loginService.onLogin(email, passwordUser).then((success) => {
      // Lógica adicional después de un inicio de sesión exitoso
      const userJson = localStorage.getItem('user');
      if(userJson){
        const user = JSON.parse(userJson);
        this.noShowMessagePopAd("Hola "+user.first_name , "check");
      }
      this.navigateToHome();
    })
    .catch((error) => {
      this.noShowMessagePopAd("Correo o contraseña incorrectos", "error");
    });
  }

  register(email: string, pass: string): void{

    this.registerService.register(email, pass).subscribe(
      (response) =>{
        this.loginService.onLogin(email, pass);
        this.noShowMessagePopAd("Registro exitoso", "check");
        this.navigateToCompleteData();
      },
      (error) => {
        console.error('Error al registrarse');
        this.noShowMessagePopAd("Error al registrarse ", "error");
      }
    )
  }

  navigateToCompleteData() {
    this.router.navigate(['/register']).then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });;
  }

  navigateToHome() {
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    });;
  }

  //Mensajes de exito o error
  noShowMessagePopAd(message_err: string, typeOfAlert: string){
    this.typeOfAlert = typeOfAlert;
    this.popMessageComponent.typeOfAlert = typeOfAlert;
    this.messagePopAd = message_err;
    this.popMessageComponent.update();
    this.showSuccessMessage = true;
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
  }
}
