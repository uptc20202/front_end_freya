import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/api/services/login/login.service';

@Component({
  selector: 'app-login-pop-up',
  templateUrl: './login-pop-up.component.html',
  styleUrls: ['./login-pop-up.component.scss']
})
export class LoginPopUpComponent {
  email: string = "";
  password: string = "";

  constructor(private loginService: LoginService,private router: Router) {}

  loginBtnClick(): void {
    // Llamar a la función onLogin con los valores de username y password
    console.log("inicio login")
    this.onLogin(this.email, this.password);
  }

  setEmail(email: string){
    this.email = email;
    console.log("Envio email")
  }

  setPassword(pass: string){
    this.password = pass;
  }

  onLogin(email: string, passwordUser: string): void {
    console.log("Inicia Login")
    // Llama al método login del servicio LoginService y se suscribe al Observable devuelto
    this.loginService.login(email, passwordUser).subscribe(
      (response) => { // Callback para manejar la respuesta exitosa del servidor
        // Convierte la respuesta JSON en un objeto JavaScript
        const responseObject = JSON.parse(response);
        // Extrae el correo electrónico del objeto de respuesta y lo guarda en una variable local
        const user = responseObject.userDTO;
        localStorage.setItem('user', JSON.stringify(user)); // Guarda el correo electrónico en el almacenamiento local del navegador
        // Maneja la respuesta del servidor, por ejemplo, guarda el token en una cookie
        const token = responseObject.tokenSession;
        this.loginService.saveTokenInCookie(token); // Llama al método del servicio para guardar el token en una cookie
      },
      (error) => { // Callback para manejar errores en la solicitud
        // Maneja errores, por ejemplo, muestra un mensaje de error en la consola
        console.error('Error al iniciar sesión:', error);
      }
    );
  }


}
