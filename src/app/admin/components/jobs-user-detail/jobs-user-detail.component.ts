import { Component, Input, OnInit } from '@angular/core';
import { JobsService } from 'src/app/api/services/jobs/jobs.service';

@Component({
  selector: 'app-jobs-user-detail',
  templateUrl: './jobs-user-detail.component.html',
  styleUrls: ['./jobs-user-detail.component.scss']
})
export class JobsUserDetailComponent implements OnInit{

  @Input() id_job: string | null= "";
  job: any;

  constructor(private jobService: JobsService){}

  ngOnInit(): void {
      this.getJob();
  }

  getJob(){
    if(this.id_job){
      this.jobService.getJobById(this.id_job).subscribe(
        resolve =>{
          this.job = resolve;
        },
        error =>{
          console.error(error);
        }
      );
    }
  }

  applyToJob() {
    // Lógica para aplicar al trabajo
    alert('Aplicando a la oferta');
  }

}
