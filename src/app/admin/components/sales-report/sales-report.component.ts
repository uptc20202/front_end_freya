import { Component, OnInit } from '@angular/core'
import { SalesService } from 'src/app/api/services/Sales/sales.service';
import { ArticlesService } from 'src/app/api/services/articles/articles.service';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss']
})
export class SalesReportComponent implements OnInit {
  sales: any[] = [];
  salesBackUp: any[] = [];
  selectedSale: any;
  userEmail: string = "";
  searchTxt: string = '';

  dropdownVisible: boolean = false;

  statusOptions: string[] = [
    'CANCELADA', 'COMPLETADA', 'CONFIRMADA'
  ];

  test(){
    console.log(this.selectedSale)
  }

  constructor(private salesService: SalesService, private articlesService: ArticlesService) { }

  ngOnInit(): void {
    this.getSales();
  }

  getSales(){
    this.salesService.getSales().subscribe((data: any[]) => {
      this.sales = data;
      this.salesBackUp = data;
    });
  }

  onSelectSale(sale: any): void {
    this.selectedSale = sale;
    const userId = sale.user_id;
    this.salesService.getUserById(userId).subscribe((userData: any) => {
      this.userEmail = userData.email;
      this.loadArticlesDetails();
    });
  }

  loadArticlesDetails(): void {
    this.selectedSale.articles.forEach((article: any) => {

      this.articlesService.getArticleById(article.article_id).subscribe(
        (articleDetails: any) => {
          article.details = articleDetails;
        },
        (error: any) => {
          console.error(`Error fetching details for article ID ${article.article_id}:`, error);
        }
      );
    });
  }

  updateSaleStatus(newStatus: string): void {
    if (!this.selectedSale._id) {
      return;
    }

    const statusData = { statusSale: newStatus };

    if(confirm('¿Confirma que desea actualizar la compra al estado '+newStatus+'?')){
      this.salesService.updateSaleStatus(this.selectedSale._id, statusData).subscribe(
        response => {
          alert('Venta actualizada')
          console.log('Response:', response);
          this.selectedSale.statusSale = newStatus;
        },
        error => {
          console.error('Error:', error);
          alert("Error al actualizar venta")
        }
      );
    }

  }

  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  filterSales(){
    console.log(this.searchTxt)
    this.sales = this.salesBackUp.filter(sale => sale._id.substring(0, 6).includes(this.searchTxt) )
  }
}
