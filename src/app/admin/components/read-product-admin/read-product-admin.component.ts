import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/api/services/articles/articles.service';

@Component({
  selector: 'app-read-product-admin',
  templateUrl: './read-product-admin.component.html',
  styleUrls: ['./read-product-admin.component.scss']
})
export class ReadProductAdminComponent implements OnInit {

  stadeEdit:boolean = false;
  articles: any[] = [];
  filteredArticles: any[] = []; // Array filtrado a mostrar en la tabla
  filter: any = { code: '', name: '', category: '' };


  constructor(private articleService: ArticlesService) { }

  ngOnInit(): void {
    this.getAllArticles();
  }

  getAllArticles(): void {
    this.articleService.getArticles().subscribe(
      (data: any[]) => {
        this.articles = data;
        this.filteredArticles = [...this.articles]; // Inicializar con todos los artículos
      },
      (error) => {
        console.error('Error al obtener los productos', error);
      }
    );
  }

  getTotalQuantity(stock: any[]): number {
    return stock.reduce((total, item) => total + item.quantity, 0);
  }

  applyFilter(): void {
    // Aplicar el filtro localmente al array de artículos
    this.filteredArticles = this.articles.filter(article =>
      article.code_article.toLowerCase().includes(this.filter.code.toLowerCase()) &&
      article.name_article.toLowerCase().includes(this.filter.name.toLowerCase()) &&
      article.category.toLowerCase().includes(this.filter.category.toLowerCase())
    );
  }

  viewArticle(article: any): void {
    console.log('Ver artículo:', article);
  }

  editArticle(article: any): void {
    console.log('Editar artículo:', article);
  }

  deleteArticle(article: any): void {
    console.log('Eliminar artículo:', article);
  }

  toEdit() {
    this.stadeEdit = true;
  }
}
