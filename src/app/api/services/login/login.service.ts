import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service'; // Importa el servicio CookieService de ngx-cookie-service

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private apiUrl = 'https://freya-backend.onrender.com/api/v1/auth/login'; // Declara la URL de la API

  constructor(private http: HttpClient, private cookieService: CookieService) { } // Inyección de dependencias de HttpClient y CookieService



  login(email: string, password: string): Observable<any> { // Método de inicio de sesión, recibe un nombre de usuario y una contraseña y devuelve un Observable<any>

    const body = { // Crea un objeto con los datos del formulario
      email: email,
      password: password
    };

    const headers = new HttpHeaders({ // Crea las cabeceras de la solicitud HTTP
      'Content-Type': 'application/json' // Establece el tipo de contenido como JSON
    });

    return this.http.post(this.apiUrl, body, { headers, responseType: 'text' }).pipe( // Realiza una solicitud POST a la API con los datos del formulario
      catchError((error: any) => throwError(error)) // Maneja cualquier error que ocurra durante la solicitud
    );
  }

  saveTokenInCookie(token: any) {
    this.cookieService.set('token', token);
  }

}
