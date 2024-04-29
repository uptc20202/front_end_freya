import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {



  private baseUrl = 'https://freya-backend.onrender.com/api/v1/articles/';

  constructor(private http: HttpClient) { }

  getArticles(filters?: any): Observable<any> {
    // Construir la URL con los filtros adicionales si se proporcionan
    let url = this.baseUrl;
    if (filters) {
      url += `?${this.serialize(filters)}`;
    }

    return this.http.get(url);
  }

  private serialize(obj: any): string {
    return Object.keys(obj).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`).join('&');
  }


  getArticlesByGender(gender: string): Observable<any> {
    const url = `${this.baseUrl}searchArticleByGender?gender=${gender.toUpperCase()}`;
    return this.http.get(url);
  }

}
