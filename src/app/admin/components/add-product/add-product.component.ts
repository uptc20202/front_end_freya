import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticlesService } from 'src/app/api/services/articles/articles.service';
import { CloudinaryService } from 'src/app/api/services/cloudinary/cloudinary.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})

export class AddProductComponent  implements OnInit {

  @Output() back: EventEmitter<boolean> = new  EventEmitter<boolean>;
  @Input() product: any = {
    category: '',
    images: [],
    code_article: '',
    name_article: '',
    gender: '',
    retail_price: 0,
    medium_price: 0,
    wholesale_price: 0,
    color: '',
    stock: {
    },
    description: ''
  };

  uploadedImageUrls: string[] = [];

  categories: any[]  = [];

  constructor(private uploadService: CloudinaryService,
    private articleService: ArticlesService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.articleService.getCategories().subscribe(
      (categories: any[]) => {
        this.categories = categories.map(category => ({
          _id: category._id,
          name_category: category.name_category
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
      // Verificar si el archivo es una imagen
      if (file.type.startsWith('image')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.product.images.push(e.target.result); // Agregar la URL de la imagen al array
        };
        reader.readAsDataURL(file); // Convertir el archivo a una URL base64
      } else {
        alert('Por favor, selecciona un archivo de imagen válido.');
      }
    }
  }


  deleteImage(index: number) {
    this.product.images.splice(index, 1); // Eliminar la imagen del array según su índice
  }

  upload(): Promise<boolean> {

    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    return new Promise<boolean>((resolve, reject) => {
      if (this.product.images.length === 0) {
        reject('No hay imágenes para subir.');
        return;
      }

      const uploadPromises: Promise<string>[] = [];

      this.product.images.forEach((file_data: any) => {

        if (typeof file_data === 'string' && urlRegex.test(file_data)) {
          // Es una URL válida, añadir directamente a uploadedImageUrls
          this.uploadedImageUrls.push(file_data);
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
              this.uploadedImageUrls.push(imageUrl);
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

  createArticle(): void {

    if (!this.validateData()) {
      return;
    }

    this.upload().then(() => {

      const articleData = {

        code_article: this.product.code_article,
        name_article: this.product.name_article,
        retail_price: this.product.retail_price,
        wholesale_price: this.product.wholesale_price,
        medium_price: this.product.medium_price,
        description_article: this.product.description,
        images: this.uploadedImageUrls,
        available: true,
        stock: Object.entries(this.product.stock),
        gender: this.product.gender,
        category: this.product.category,
        color: this.product.color
      };

      if(this.product._id){
        this.updateProduct(this.product._id, articleData);
        return;
      }

      // Realizar la solicitud HTTP POST para crear el artículo
      this.articleService.addArticle(articleData).subscribe({
        next: (response: any) => {
          alert('Artículo creado con éxito:');
        },
        error: (error: any) => {
          alert('Error al crear el artículo:')
          console.error('Error al crear el artículo:', error);
        }
      });

      this.toBack();

      }).catch(error => {
        console.error('Error al subir imágenes:', error);
      });


  }

  updateProduct(_id: string,articleData: any){
    this.articleService.updateArticle(_id,articleData).subscribe(
      (response) => {
        alert("Producto Actualizado");
        this.toBack();
      },
      (error) => {
        alert("Error en la edición del producto");
        console.log(error);
      }
    );
  }

    /**
   * Verifica la completitud de la información del producto y procede con la creación del artículo.
   * @returns Un booleano que indica si el todos los campos fueron diligenciados (true) o no (false).
   */
    validateData(): boolean {
    if (!this.product.name_article || this.product.name_article.trim() === '') {
      alert('Debes ingresar el nombre del artículo.');
      return false;
    }

    if (!this.product.category) {
      alert('Debes seleccionar una categoría.');
      return false;
    }

    if (!this.product.gender) {
      alert('Debes seleccionar un género.');
      return false;
    }

    if (this.product.images.length === 0) {
      alert('Debes cargar al menos una imagen.');
      return false;
    }

    const hasQuantity = Object.values(this.product.stock).some((qty: any) => Number(qty) > 0);
    if (!hasQuantity) {
      alert('Debes ingresar al menos una cantidad para una talla.');
      return false;
    }

    if (this.product.retail_price <= 0) {
      alert('Debes ingresar el precio de venta.');
      return false;
    }

    return true;
  }

  toBack(){
    this.back.emit();
  }

}
