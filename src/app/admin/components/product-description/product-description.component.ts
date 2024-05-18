import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from 'src/app/api/services/articles/articles.service';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss']
})
export class ProductDescriptionComponent {
  //@Input() product: any;
  @Input() productId: string | null;
  product: any;
  selectedSize: string = '';
  quantity: number = 1;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id'); // Obtener el ID del producto de la URL
      this.getProductDetails(this.productId); // Llamar a la función para obtener detalles del producto
    });
  }

  constructor(private articlesService: ArticlesService,
    private route: ActivatedRoute) {
    // Datos de ejemplo para un producto
    this.productId = null;
    this.product = null;
  }

  getProductDetails(id: string | null): void {
    if (id) {
      this.articlesService.getArticleById(id).subscribe(
        (data: any) => {
          this.product = data; // Asignar los detalles del producto recuperados del servicio
        },
        (error) => {
          console.error('Error al obtener detalles del producto:', error);
        }
      );
    }
  }

  addToCart(): void {
    if (!this.selectedSize) {
      alert('Por favor selecciona una talla.');
      return;
    }

    // Buscar el carrito en el localStorage
    let cartItems = JSON.parse(localStorage.getItem('cart') || '[]');

    // Verificar si el producto con la misma talla ya está en el carrito
    const itemIndex = this.productInCartIndex(
      this.productId, this.selectedSize, cartItems);

    if (itemIndex !== -1) {
      // Si el producto con la misma talla ya está en el carrito, actualizar la cantidad
      cartItems[itemIndex].quantity += this.quantity;
    } else {
      // Agregar el nuevo producto al carrito
      const newItem = {

        productId: this.productId,
        size: this.selectedSize,
        quantity: this.quantity
      };
      cartItems.push(newItem);
    }

    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Reiniciar valores
    this.selectedSize = '';
    this.quantity = 1;

    alert('Producto agregado al carrito.');
  }

  private productInCartIndex(productId: string | null, size: string, cartItems: any[]): number {
    return cartItems.findIndex(
      (item: any) => item.productId === productId && item.size === size
    );
  }


}
