import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private apiUrl = 'https://freya-backend.onrender.com/api/v1/jobs/';

  constructor(private http: HttpClient) { }

  getJobs(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }


}
