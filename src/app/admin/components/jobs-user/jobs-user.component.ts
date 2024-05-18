import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/api/services/jobs/jobs.service';

@Component({
  selector: 'app-jobs-user',
  templateUrl: './jobs-user.component.html',
  styleUrls: ['./jobs-user.component.scss']
})
export class JobsUserComponent implements OnInit{

  jobs: any[] = [];

  constructor(private jobService: JobsService) { }

  ngOnInit(): void {
      this.getJobs();
  }

  getJobs(){
    this.jobService.getJobs().subscribe(
      data => {
        this.jobs = data;
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

}
