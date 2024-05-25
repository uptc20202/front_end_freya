import { state } from '@angular/animations';
import { Component } from '@angular/core';
import { StoresService } from 'src/app/api/services/stores/stores.service';

@Component({
  selector: 'app-stores-admin',
  templateUrl: './stores-admin.component.html',
  styleUrls: ['./stores-admin.component.scss']
})
export class StoresAdminComponent {
  stores: any[] = [];
  idSelectStore: string = "";
  viewStateStore:boolean = false;
  selectStore:any;
  modeView: 'view' | 'edit' | 'create' = 'view';

  constructor(private storesService: StoresService) { }

  ngOnInit(): void {
    this.loadStores();
  }

  loadStores() {
    this.storesService.getStores().subscribe((data: any) => {
      this.stores = data;
    });
  }

  createStore() {
    this.selectStore = {};
    this.modeView ='create';
    this.viewStateStore = true;
  }

  viewStore(store:any) {
    this.selectStore = store
    this.modeView ='view';
    this.viewStateStore = true;
  }

  editStore(store: any) {
    this.selectStore = store;
    this.viewStateStore = true;
    this.modeView = "edit";
  }

  refeshDetele(store:any){
    this.stores = this.stores.filter(item => item._id != store.id );
  }

  deleteStore(store:any){
    if(confirm("¿Desea eliminar la tienda "+store.name_store+" ?")){
      this.storesService.deteleStore(store._id).subscribe({
        next: (Response) => {
          console.log(Response);

          this.loadStores();
        },
        error: (err) =>  {console.error(err)}
      });
    }

  }

}
