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
    },
    description: ''
  };

  uploadedImageUrls: string[] = [];

  test(){
    console.log(this.product)
  }

  categories: any[]  = [];

  constructor(private uploadService: CloudinaryService,
    private categoriaService: ArticlesService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoriaService.getCategories().subscribe(
      (categories: any[]) => {
        this.categories = categories.map(category => ({
          _id: category._id,
          name: category.name_category
        }));
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
    if (this.product.images.length === 0) {
      return false;
    }

    // Recorrer cada imagen en this.product.images
    this.product.images.forEach((file_data: any) => {
      const data = new FormData();

      data.append('file', file_data);
      data.append('upload_preset', 'test-data');
      data.append('cloud_name', 'ds9zdlkcc');
      data.append('api_key', '467869935517896');

      // Realizar la carga de la imagen en Cloudinary
      this.uploadService.updloadImg(data).subscribe({
        next: (response: any) => {
          console.log(response);

          // Obtener la URL de la imagen subida desde la respuesta
          const imageUrl = response.url;

          // Almacenar la URL en el array de URLs de imágenes subidas
          this.uploadedImageUrls.push(imageUrl);

          // Mostrar mensaje de éxito para cada imagen subida
          console.log('Subida exitosa Cloudinary para ' + imageUrl);
        },
        error: (e: any) => {
          console.log(e);

          // Mostrar mensaje de error si la carga falla
          alert('Error al subir imagen a Cloudinary');
        }
      });
    });

    return true;
  }

  createArticle(): void {

    const articleData = {
      retail_price: this.product.retailPrice,
      wholesale_price: this.product.wholesalePrice,
      medium_price: this.product.middlePrice,
      description_article: this.product.description,
      images: this.uploadedImageUrls,
      available: true,
      stock: Object.entries(this.product.units),
      gender: this.product.gender
    };

    // Realizar la solicitud HTTP POST para crear el artículo
    this.categoriaService.addArticle(articleData).subscribe({
      next: (response: any) => {
        console.log('Artículo creado con éxito:', response);
        // Reiniciar el formulario o realizar otras acciones después de crear el artículo
      },
      error: (error: any) => {
        console.error('Error al crear el artículo:', error);
      }
    });
  }

}
