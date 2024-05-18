import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private apiUrl = 'https://freya-backend.onrender.com/api/v1/jobs/';

  constructor(private http: HttpClient) { }

  /**
   * Fetches a list of jobs from the backend service.
   *
   * @returns {Observable<any>} An Observable containing the list of jobs.
   */
  getJobs(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  /**
   * Fetches a specific job by its ID from the backend service.
   *
   * @param {string} jobId - The ID of the job to be retrieved.
   * @returns {Observable<any>} An Observable containing the job data.
   */
  getJobById(jobId: string): Observable<any> {
    const url = `${this.apiUrl}${jobId}`;
    return this.http.get<any>(url);
  }
}
