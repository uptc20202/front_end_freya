import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CloudinaryService } from 'src/app/api/services/cloudinary/cloudinary.service';
import { StoresService } from 'src/app/api/services/stores/stores.service';

@Component({
  selector: 'app-edit-stores',
  templateUrl: './edit-stores.component.html',
  styleUrls: ['./edit-stores.component.scss']
})
export class EditStoresComponent implements OnInit {
  @Input() storeId: string = '';
  @Input() mode: 'view' | 'edit' | 'create' = 'view'; // Modo del componente: ver, editar, crear
  @Output() storeUpdated: EventEmitter<any> = new EventEmitter<any>();

  @Input() store: any = {
    name_store: '',
    address: '',
    department: '',
    city: '',
    images: []
  };

  uploadedImageUrls: string[] = [];

  isViewMode: boolean = false;
  isEditMode: boolean = false;
  isCreateMode: boolean = false;

  constructor(private storeService: StoresService, private router: Router,
    private uploadService: CloudinaryService
  ) { }

  ngOnInit(): void {
    this.isViewMode = this.mode === 'view';
    this.isEditMode = this.mode === 'edit';
    this.isCreateMode = this.mode === 'create';
    console.log("Esto de editar... ",this.isEditMode)
    console.log("Esto de id... ",this.storeId)
    if (this.storeId && (this.isViewMode || this.isEditMode)) {
      this.getStoreById();
    }
  }

  getStoreById(): void {
    this.storeService.getStoreById(this.storeId).subscribe({
      next: (data) => {this.store = data; console.log(data) },
      error: (err) => console.error('Error retrieving store:', err)
    });
  }

  onFileChange(event: any): void {
    const files = event.target.files;
    /*
    for (let file of files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.store.images.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }*/


    if (files.length > 0) {
      const file = files[0];
      // Verificar si el archivo es una imagen
      if (file.type.startsWith('image')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.uploadedImageUrls.push(e.target.result); // Agregar la URL de la imagen al array
        };
        reader.readAsDataURL(file); // Convertir el archivo a una URL base64
      } else {
        alert('Por favor, selecciona un archivo de imagen válido.');
      }
    }
  }

  saveChanges(): void {

    this.upload().then(() => {

    this.storeService.updateStore(this.store).subscribe({
      next: (data) => {
        console.log('Store updated:', data);
        this.storeUpdated.emit(data);
        this.router.navigate(['/stores']);
      },
      error: (err) => console.error('Error updating store:', err)
    });

    });
  }

  deleteImg(img:string){
    this.store.images = this.store.images.filter((image: string) => image != img);
  }

  saveStore(): void {
    this.store.images = [];

    this.upload().then(() => {

      this.storeService.createStore(this.store).subscribe({
        next: (data) => {
          console.log('Store created:', data);
          this.storeUpdated.emit(data);
        },
        error: (err) => console.error('Error creating store:', err)
      });

    });

  }

  upload(): Promise<boolean> {

    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    return new Promise<boolean>((resolve, reject) => {
      if (this.uploadedImageUrls.length === 0) {
        reject('No hay imágenes para subir.');
        return;
      }

      const uploadPromises: Promise<string>[] = [];

      this.uploadedImageUrls.forEach((file_data: any) => {

        if (typeof file_data === 'string' && urlRegex.test(file_data)) {
          // Es una URL válida, añadir directamente a uploadedImageUrls
          this.store.images.push(file_data);
          return; // Saltar a la siguiente iteración del bucle
        }

        const data = new FormData();
        data.append('file', file_data);
        data.append('upload_preset', 'test-data');
        data.append('cloud_name', 'ds9zdlkcc');
        data.append('api_key', '467869935517896');

        // Agregar la promesa de subida de imagen al array
        const uploadPromise = new Promise<string>((innerResolve, innerReject) => {

          this.uploadService.updloadImg(data).subscribe({
            next: (response: any) => {
              const imageUrl = response.url;
              this.store.images.push(imageUrl);
              innerResolve(imageUrl);
            },
            error: (e: any) => {
              console.log(e);
              innerReject('Error al subir imagen');
            }
          });
        });

        uploadPromises.push(uploadPromise);
      });

      // Esperar a que todas las promesas de subida se resuelvan
      Promise.all(uploadPromises).then(() => {
        resolve(true);
      }).catch(error => {
        reject(error);
      });
    });
  }


}
