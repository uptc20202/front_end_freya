import { Component, OnInit } from '@angular/core'
import { SalesService } from 'src/app/api/services/Sales/sales.service';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss']
})
export class SalesReportComponent implements OnInit {
  token: string = "";
  sales: any[] = [];
  selectedSale: any;
  userEmail: string = "";

  constructor(private salesService: SalesService) { }

  ngOnInit(): void {
    this.token = ''; // Obtén el token aquí usando cookieService.get('token')

    this.salesService.getSales(this.token).subscribe((data: any[]) => {
      this.sales = data;
    });
  }

  onSelectSale(sale: any): void {
    this.selectedSale = sale;
    const userId = sale.user_id;
    this.salesService.getUserById(userId, this.token).subscribe((userData: any) => {
      this.userEmail = userData.email;
    });
  }
}
