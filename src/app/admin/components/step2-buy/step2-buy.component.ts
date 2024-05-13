import { Component } from '@angular/core';

@Component({
  selector: 'app-step2-buy',
  templateUrl: './step2-buy.component.html',
  styleUrls: ['./step2-buy.component.scss']
})
export class Step2BuyComponent {

  cartItems: any[] = []; // Array para almacenar los elementos del carrito
  shippingCost = 10; // Costo de envío fijo

  imageCircleUnchecked = '../../../assets/shop/Ellipse_vacio.png';
  imageCircleChecked = '../../../assets/shop/Ellipse_check.png';

  constructor() { }

  ngOnInit(): void {
    this.retrieveCartItems();
  }

  retrieveCartItems(): void {
    const cartItemsString = localStorage.getItem('cart');
    if (cartItemsString) {
      this.cartItems = JSON.parse(cartItemsString);
    }
  }

  calculateSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.product.retail_price * item.quantity), 0);
  }

  calculateTotal(): number {
    return this.calculateSubtotal() + this.shippingCost;
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  increaseQuantity(item: any): void {
    item.quantity++;
  }

  removeItem(item: any): void {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.saveCartItems();
    }
  }

  saveCartItems(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }


}
