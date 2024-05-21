import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service'; // Importa el servicio CookieService de ngx-cookie-service

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'https://freya-backend.onrender.com/api/v1/auth/login'; // Declara la URL de la API

  constructor(private http: HttpClient, private cookieService: CookieService) { } // Inyección de dependencias de HttpClient y CookieService

  onLogin(email: string, passwordUser: string): Promise<boolean>{
    // Llama al método login del servicio LoginService y se suscribe al Observable devuelto
    return new Promise<boolean>((resolve, reject) => {
      this.login(email, passwordUser).subscribe(
        (response) => {
          // Convierte la respuesta JSON en un objeto JavaScript
          const responseObject = JSON.parse(response);
          // Extrae el correo electrónico del objeto de respuesta y lo guarda en una variable local
          const user = responseObject.data;
          localStorage.setItem('user', JSON.stringify(user)); // Guarda el correo electrónico en el almacenamiento local del navegador
          const token = responseObject.tokenSession;
          this.saveTokenInCookie(token);
          resolve(true);
        },
        (error) => {
          console.error('Error al iniciar sesión:', error);
          reject(false);
        }
      );
    });

  }


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

  validateToken(): Promise<boolean> {
    const token = this.cookieService.get('token'); // Obtener el token del servicio de cookies

    const headers = new HttpHeaders({
      'Authorization': `${token}` // Incluir el token en los encabezados de la solicitud
    });

    return new Promise<boolean>((resolve, reject) => {
      this.http.get<any>('https://freya-backend.onrender.com/api/v1/auth/verifyToken', { headers,   responseType: 'text' as 'json' }).subscribe(
        (response) => {
          resolve(true);
        },
        (error) => {
          console.error('Error al validar token:', error);
          reject(false);
        }
      );
    });

  }

  logout(): void {
    console.log(this.cookieService.getAll())
    this.cookieService.deleteAll();

    console.log(this.cookieService.getAll())
    localStorage.removeItem('user');
  }

}


