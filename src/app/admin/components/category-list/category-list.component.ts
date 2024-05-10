import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/api/services/articles/articles.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})

export class CategoryListComponent implements OnInit {

  stadeEdit:boolean = false;

  categories: any[] = [];

  constructor(private articlesService: ArticlesService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.articlesService.getCategories().subscribe(
      (data: any[]) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error al obtener las categorías:', error);
      }
    );
  }

  toEdit() {
    this.stadeEdit = true;
  }

}
