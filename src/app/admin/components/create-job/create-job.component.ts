import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { JobsService } from 'src/app/api/services/jobs/jobs.service';
import { PopMessageComponent } from '../pop-message/pop-message.component';
import { NumberNormalizerService } from 'src/app/api/services/numberNormalizer/number-normalizer.service';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent implements OnInit{

  @Input() job: any= {
    title: '',
    position: '',
    salary: 0,
    requeriments: '',
    min_knowledge: '',
    responsibilities: '',
    ubication: ''
  };
  @Output() newJob: EventEmitter<any> = new EventEmitter<any>;
  @Output() back: EventEmitter<boolean> = new EventEmitter<boolean>

  showSuccessMessage: boolean = false;
  messagePopAd: string = "error";
  typeOfAlert: string = "error";
  @ViewChild(PopMessageComponent) popMessageComponent!: PopMessageComponent;

  constructor(private jobService: JobsService, private numberService: NumberNormalizerService){

  }

  ngOnInit(): void {

  }

  test(){
    console.log(this.job);
  }

  createJob(){
    if(!this.validateFields()){
      return;
    }

    if(!this.job._id){
      this.jobService.addJob(this.job).subscribe(
        resolve => {
          this.newJob.emit(resolve);
          this.back.emit(true);
        },
        error =>{
          alert("Error al crear Oferta");
          console.log(error);

        }
      );
    }else{
      this.editJob();
    }

  }

  editJob(){
    this.jobService.editJob(this.job).subscribe(
      resolve => {
        this.newJob.emit(resolve);
        alert("Oferta actualizada con exito");
        this.back.emit(true);
      },
      error =>{
        alert("Error al actualizar oferta");
        console.error(error);
      }
    );
  }

  goBack() {
    this.back.emit(true);
  }

  validateFields(): boolean {
    //this.job.salario = this.numberService.convertScientificToNormal(this.job.salario);
    if (!this.job.title) {
      this.noShowMessagePopAd('El título es obligatorio.', 'error');
      return false;
    }
    if (!/^(?=.*[a-zA-Z])(?=.*\d?).*$/.test(this.job.title)) {
      this.noShowMessagePopAd('Formato de titulo incorrecto', 'error');
      return false;
    }
    if (!this.job.position) {
      this.noShowMessagePopAd('La posición es obligatoria.', 'error');
      return false;
    }
    if (this.job.salary == null || isNaN(this.job.salary)) {
      this.noShowMessagePopAd('El salario es obligatorio y debe ser un número.', 'error');
      return false;
    }
    if (!this.job.requeriments) {
      this.noShowMessagePopAd('Los requerimientos son obligatorios.', 'error');
      return false;
    }
    if (!this.job.min_knowledge) {
      this.noShowMessagePopAd('El conocimiento mínimo es obligatorio.', 'error');
      return false;
    }
    if (!this.job.responsibilities) {
      this.noShowMessagePopAd('Las responsabilidades son obligatorias.', 'error');
      return false;
    }
    if (!this.job.ubication) {
      this.noShowMessagePopAd('La ubicación es obligatoria.', 'error');
      return false;
    }
    if (this.job.salario<100000) {
      this.noShowMessagePopAd('Digite un valor de salario mayor a $100.000', 'error');
      return false;
    }
    if (this.job.salario>50000000) {
      this.noShowMessagePopAd('Digite un valor de salario superior al permitido', 'error');
      return false;
    }
    console.log(this.job.salario)
    console.log(this.job.salario>50000000)
    return true;
  }

  noShowMessagePopAd(message_err: string, typeOfAlert: 'check' | 'error'){
    this.typeOfAlert = typeOfAlert;
    this.popMessageComponent.typeOfAlert = typeOfAlert;
    this.messagePopAd = message_err;
    this.popMessageComponent.update();
    this.showSuccessMessage = true;
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
 }


}
