import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = 'https://www.datos.gov.co/resource/xdk5-pm3f.json';
  private apiUserUrl = 'https://freya-backend.onrender.com/api/v1/users';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getAllDepartamentos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getMunicipiosByDepartamento(departamento: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?departamento=${departamento}`);
  }

  createAddress(userId: string, addressData: any): Observable<any> {
    const url = `${this.apiUserUrl}/createAddress/${userId}`;
    return this.http.put<any>(url, addressData);
  }

  updateAddress(userId: string, addressData: any): Observable<any> {

    const token = this.cookieService.get('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.apiUserUrl}/updateAddress/${userId}`;

    return this.http.put<any>(url, addressData,  { headers });
  }

  /**
   * Deletes an existing address for a user.
   * @param id_address - The ID of the address to be deleted.
   * @returns An Observable of the delete operation result.
   */
  deleteAddress(id_user: string, idAddress: string): Observable<any> {
    const token = this.cookieService.get('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.apiUserUrl}/deleteAddress/${id_user}`;

    const body = {
      id_address: idAddress
    };

    return this.http.put<any>(url, body, { headers });
  }
}
