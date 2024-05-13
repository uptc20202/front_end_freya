import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {



  private baseUrl = 'https://freya-backend.onrender.com/api/v1/articles/';
  private apiUrl = 'https://freya-backend.onrender.com/api/v1/categories/';
  private localStorageKey = 'categories';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

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

  getArticleById(id: string){
    const url = `${this.baseUrl}${id}`;
    return this.http.get(url);
  }

  getCategories(): Observable<any> {
    const token = this.cookieService.get('token');

    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });

    const url = 'https://freya-backend.onrender.com/api/v1/categories/';
    return this.http.get(url, { headers});
  }

  addArticle(articleData: any): Observable<any> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    return this.http.post(this.apiUrl, articleData, { headers });
  }

}
