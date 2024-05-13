import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/api/services/articles/articles.service';
import { CloudinaryService } from 'src/app/api/services/cloudinary/cloudinary.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})

export class AddProductComponent  implements OnInit {

  product: any = {
    images: [],
    code: '',
    name: '',
    category: '',
    gender: '',
    retailPrice: 0,
    middlePrice: 0,
    wholesalePrice: 0,
    color: '',
    units: {
      XS: 0,
      S: 0,
      M: 0,
      L: 0,
      XL: 0,
      XXL: 0
    },
    description: ''
  };

  categorias: any[]  = [];

  constructor(private uploadService: CloudinaryService,
    private categoriaService: ArticlesService) { }

  ngOnInit(): void {
    this.categoriaService.getCategories().subscribe(
      categorias => {
        this.categorias = categorias;
        console.log(this.categorias); // Aquí puedes ver el arreglo con _id y name_category
      },
      error => {
        console.error('Error al obtener las categorías', error);
      }
    );
  }

  onFileChange(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.product.images.push(e.target.result); // Agregar la URL de la imagen al array
      };

      reader.readAsDataURL(file); // Convertir el archivo a una URL base64
    }
  }

  deleteImage(index: number) {
    this.product.images.splice(index, 1); // Eliminar la imagen del array según su índice
  }

  upload() {
    if(this.product.images.length===0) return false;

    const file_data = this.product.images[0];

    const data = new FormData();

    data.append('file', file_data);
    data.append('upload_preset', 'test-data');
    data.append('cloud_name', 'ds9zdlkcc');
    data.append('api_key', '467869935517896')

    this.uploadService.updloadImg(data).subscribe({
        next: (response: any) => {
          console.log(response)
          alert('Subida exitosa Cloudinary..')
        },
        error: (e: any) => {
          console.log(e)
        }
    })
    return true;
  }



}
