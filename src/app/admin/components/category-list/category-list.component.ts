import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/api/services/articles/articles.service';
import { CategoryService } from 'src/app/api/services/catergory/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})

export class CategoryListComponent implements OnInit {

  stadeEdit:boolean = false;
  editCategory: string= "";
  categories: any[] = [];

  constructor(private articlesService: ArticlesService, private categoryService: CategoryService) { }

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
    this.stadeEdit = !this.stadeEdit;
  }

  toEditCategory(category: any): void {
    this.editCategory = category._id;
    this.stadeEdit = true;
  }

  deteleCategory(category: any): void{
    this.categoryService.deleteCategory(category._id).subscribe(
      (resolve) => {
        this.categories = this.categories.filter(categoryFilter => categoryFilter._id != category._id)
      },
      (error) => {
        alert("Error al eliminar categoria");
      }
    );
  }

}
