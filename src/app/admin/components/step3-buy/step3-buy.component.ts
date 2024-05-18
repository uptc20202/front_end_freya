import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { SalesService } from 'src/app/api/services/Sales/sales.service';

@Component({
  selector: 'app-step3-buy',
  templateUrl: './step3-buy.component.html',
  styleUrls: ['./step3-buy.component.scss']
})
export class Step3BuyComponent implements OnInit {
  addresses: any[] = [];
  selectedAddressIndex: number = -1;

  @Input() calculateSubtotal: string|number ="";
  @Input() calculateTotal: string|number="";
  @Input() shippingCost: string|number="";
  @Input() articles: any[] = [];

  constructor(private salesService: SalesService, private route: Router) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if(user){
      const userObj = JSON.parse(user);
      if (userObj.shiping_address && Array.isArray(userObj.shiping_address)) {
        this.addresses = userObj.shiping_address
          .map((address: any) => ({
            ...address,
            selected: false
          }));
      } else {
        console.error('Error: shiping_address is not in the expected format.');
      }
    }
  }

  selectAddress(index: number): void {
    // Desmarcar la dirección previamente seleccionada, si existe
    if (this.selectedAddressIndex !== -1) {
      this.addresses[this.selectedAddressIndex].selected = false;
    }

    // Marcar la dirección seleccionada
    this.addresses[index].selected = true;
    this.selectedAddressIndex = index;
  }

  continueToPayment(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);

      const saleData = {
        "user_id": user._id,
        "articles": this.articles.map(article => ({
          "article_id": article.productId,
          "size": article.size,
          "quantity": article.quantity
        })),
        "statusSale": "PENDIENTE"
      };

      this.salesService.addSale(saleData).subscribe(response => {
        console.log('Sale created successfully:', response);
        const saleId = response._id;
        this.redirectToWhatsApp(saleId);
        this.route.navigate(['/profile']);
      }, error => {
        console.error('Error creating sale:', error);
      });
    }

  }

  clearCart() {
    localStorage.removeItem('cart');
  }


  redirectToWhatsApp(saleId: string): void {
    const whatsappLink = `https://api.whatsapp.com/send?phone=573204118057&text=Deseo%20completar%20mi%20compra%20con%20referencia%20${saleId}`;
    window.open(whatsappLink, '_blank');
    this.clearCart();
  }
}
