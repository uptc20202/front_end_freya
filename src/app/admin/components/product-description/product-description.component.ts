import { Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from 'src/app/api/services/articles/articles.service';
import { PopMessageComponent } from '../pop-message/pop-message.component';
import { CategoryService } from 'src/app/api/services/catergory/category.service';
import { image } from '@cloudinary/url-gen/qualifiers/source';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss']
})
export class ProductDescriptionComponent {
  test(){
    console.log(this.product)
  }

  showSuccessMessage: boolean = false;
  messagePopAd: string = "error";
  typeOfAlert: string = "error";
  guideSizes:string[] =['',''];
  @ViewChild(PopMessageComponent) popMessageComponent!: PopMessageComponent;

  @Input() productId: string | null;
  product: any;
  selectedSize: string = '';
  quantity: number = 1;

  edit: boolean = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id'); // Obtener el ID del producto de la URL
      this.getProductDetails(this.productId); // Llamar a la función para obtener detalles del producto
    });
  }

  constructor(private articlesService: ArticlesService,
    private route: ActivatedRoute, private categoryService:CategoryService) {
    // Datos de ejemplo para un producto
    this.productId = null;
    this.product = null;
  }

  getProductDetails(id: string | null): void {
    if (id) {
      this.articlesService.getArticleById(id).subscribe(
        (data: any) => {
          this.product = data; // Asignar los detalles del producto recuperados del servicio
          this.getGuideSize();
        },
        (error) => {
          console.error('Error al obtener detalles del producto:', error);
        }
      );
    }
  }

  addToCart(): void {
    if (!this.selectedSize) {
      this.noShowMessagePopAd('Por favor selecciona una talla.', 'error');
      return;
    }

    this.articlesService.addProductCard(this.productId,this.selectedSize,this.quantity);

    // Reiniciar valores
    this.selectedSize = '';
    this.quantity = 1;

    this.noShowMessagePopAd('Producto agregado al carrito.', 'check');
  }

/**
  private productInCartIndex(productId: string | null, size: string, cartItems: any[]): number {
    return cartItems.findIndex(
      (item: any) => item.productId === productId && item.size === size
    );
  }
  */


  validateStock(){
    if(this.quantity<0){
      this.quantity = this.quantity * -1;
    }

    const sizeReference = this.product.stock.filter(
      (stockSize: any) => stockSize.size == this.selectedSize
    );

    if(sizeReference && this.quantity > sizeReference[0].quantity){
      this.quantity = sizeReference[0].quantity;
    }
  }

  alert(){
    this.noShowMessagePopAd('Productos agregados al carrito', 'check');
  }

  viewImage(): void {
    if(this.product.gender=='F'){
      if(this.guideSizes[0]){
        window.open(this.guideSizes[0], '_blank');
      }

    }else if(this.product.gender=='M'){
      if(this.guideSizes[1]){
        window.open(this.guideSizes[1], '_blank');
      }
    }else{
      if(this.guideSizes[0]){
        window.open(this.guideSizes[0], '_blank');
      }
      if(this.guideSizes[1]){
        window.open(this.guideSizes[1], '_blank');
      }
    }

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


 getGuideSize(){
  const idcategory = this.product.category;

  this.categoryService.getCategoryById(idcategory)
    .subscribe(resolve =>{
      this.guideSizes[0]= resolve.url_size_guide_fem;
      this.guideSizes[0]= resolve.url_size_guide_male}
    );
 }
}
