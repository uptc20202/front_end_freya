import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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

  isViewMode: boolean = false;
  isEditMode: boolean = false;

  constructor(private storeService: StoresService, private router: Router) { }

  ngOnInit(): void {
    this.isViewMode = this.mode === 'view';
    this.isEditMode = this.mode === 'edit';
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
    for (let file of files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.store.images.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  saveChanges(): void {
    this.storeService.updateStore(this.storeId, this.store).subscribe({
      next: (data) => {
        console.log('Store updated:', data);
        this.storeUpdated.emit(data);
        this.router.navigate(['/stores']);
      },
      error: (err) => console.error('Error updating store:', err)
    });
  }

  deleteImg(img:string){
    this.store.images = this.store.images.filter((image: string) => image != img);
  }

  saveStore(): void {
    this.storeService.createStore(this.store).subscribe({
      next: (data) => {
        console.log('Store created:', data);
        this.storeUpdated.emit(data);
        this.router.navigate(['/stores']);
      },
      error: (err) => console.error('Error creating store:', err)
    });
  }
}
