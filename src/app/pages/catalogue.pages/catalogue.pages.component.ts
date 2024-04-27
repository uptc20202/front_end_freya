import { Component } from '@angular/core';
import { ArticlesService } from 'src/app/api/services/articles/articles.service';

@Component({
  selector: 'app-catalogue.pages',
  templateUrl: './catalogue.pages.component.html',
  styleUrls: ['./catalogue.pages.component.scss']
})
export class CataloguePagesComponent {
  articles: any[] = [];

  constructor(private articleService: ArticlesService) { }

  ngOnInit(): void {
    // Obtener todos los artículos
    this.articleService.getArticles().subscribe(data => {
      this.articles = data;
      console.log(this.articles)
    });

    // Obtener artículos filtrados por categoría
    // this.articleService.getArticles({ category: 'someCategory' }).subscribe(data => {
    //   this.articles = data;
    // });
  }
}
