import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  urlApi = "https://freya-backend.onrender.com/api/v1/stores/"

  constructor(private http: HttpClient, private cookieService: CookieService) { }


  deteleStore(id:string){
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)

      return this.http.delete(`${this.urlApi}/sales/${id}`, { headers });
  }

  createStore(store:any){
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)

      return this.http.post(this.urlApi, store,{ headers });
  }

  updateStore(store:any, id:string){
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)

      return this.http.put(`${this.urlApi}/${id}`, store, { headers });
  }

  getStores(){
    const headers = new HttpHeaders();
    return this.http.get<any>(this.urlApi, { headers });
  }

  getStoreById(id:string){
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)

      return this.http.put(`${this.urlApi}/${id}`, { headers });
  }
}
