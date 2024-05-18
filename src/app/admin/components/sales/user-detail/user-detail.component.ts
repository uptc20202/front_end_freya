import { Component, Input } from '@angular/core';
import { SalesService } from 'src/app/api/services/Sales/sales.service';
import { ArticlesService } from 'src/app/api/services/articles/articles.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {

  @Input() id_sale: string = "";
  sale: any = {
    "_id": "6647e5f5e857cdf0c2406ede",
    "user_id": "661216e55fdbd57cce7de074",
    "address_id": "66402dd3e864423d0589ef64",
    "articles": [
        {
            "article_id": "662c6f031bf8b0190775b45c",
            "size": "M",
            "quantity": 4,
            "total": 272000,
            "_id": "6647e5f5e857cdf0c2406edf",
            "details": {
                "name": "Camisa Azul",
                "image": "https://via.placeholder.com/150"
            }
        },
        {
            "article_id": "662c6f031bf8b0190775b45c",
            "size": "S",
            "quantity": 4,
            "total": 272000,
            "_id": "6647e5f5e857cdf0c2406ee0",
            "details": {
                "name": "Camisa Roja",
                "image": "https://via.placeholder.com/150"
            }
        },
        {
            "article_id": "662c6e9b1bf8b0190775b453",
            "size": "XS",
            "quantity": 2,
            "total": 136000,
            "_id": "6647e5f5e857cdf0c2406ee1",
            "details": {
                "name": "Camisa Verde",
                "image": "https://via.placeholder.com/150"
            }
        }
    ],
    "totalSale": 680000,
    "statusSale": "completed",
    "createdAt": "2024-05-17T23:19:17.505Z",
    "updatedAt": "2024-05-17T23:19:17.505Z",
    "address": {
        "department": "Boyacá",
        "municipality": "Siachoque",
        "address": "Cra 2",
        "neighborhood": "Centro",
        "additional_info": "Casa verde",
        "name_addressee": "Paquita",
        "number_phone": "320302",
        "_id": "66402dd3e864423d0589ef64"
    }
  };

  constructor(private salesService: SalesService, private articlesService: ArticlesService) {}

  ngOnInit(): void {
    this.getSaleById();
  }

  getSaleById(){
    if(this.id_sale!=""){
      this.salesService.getSaleById(this.id_sale).subscribe(
        (response) => {
          this.sale = response;
        },
        (error) => {
          console.error('Error al obtener la venta:', error);
        }
      );
    }
  }

  loadArticlesDetails(): void {
      this.sale.articles.forEach((article: any) => {

        this.articlesService.getArticleById(article.article_id).subscribe(
          (articleDetails: any) => {
            article.details = articleDetails;
            console.log(this.sale);
          },
          (error: any) => {
            console.error(`Error fetching details for article ID ${article.article_id}:`, error);
          }
        );
      });
  }


  calculateSubtotal(): number {
    let subtotal = 0;
    this.sale.articles.forEach((article: any) => {
      subtotal += article.total;
    });
    return subtotal;
  }

  calculateShippingCost(): number {
    // You can implement your shipping cost calculation logic here
    return 10000;
  }

  calculateTotal(): number {
    return this.calculateSubtotal() + this.calculateShippingCost();
  }


}
