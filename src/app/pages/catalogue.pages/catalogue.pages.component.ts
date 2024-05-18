import { Component, ViewChild } from '@angular/core';
import { PopMessageComponent } from 'src/app/admin/components/pop-message/pop-message.component';
import { ArticlesService } from 'src/app/api/services/articles/articles.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-catalogue.pages',
  templateUrl: './catalogue.pages.component.html',
  styleUrls: ['./catalogue.pages.component.scss']
})
export class CataloguePagesComponent {
  articles: any[] = [];
  @ViewChild(PopMessageComponent) popMessageComponent!: PopMessageComponent;

  showSuccessMessage: boolean = false;
  messagePopAd: string = "error";
  typeOfAlert: string = "error";

  constructor(private articleService: ArticlesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Obtener todos los artículos
    this.route.paramMap.subscribe(params => {
      const gender = params.get('gender'); // Obtener el parámetro 'gender' de la URL

      // Llamar al método correspondiente del servicio dependiendo del valor de 'gender'
      if (gender && gender.toUpperCase() === 'MALE') {
        this.getArticlesByGender('M');
      } else if (gender && gender.toUpperCase() === 'FEMALE') {
        this.getArticlesByGender('F');
      }else{
        this.getAllArticles();
      }
    });

  }

  private getAllArticles(){
    this.articleService.getArticles().subscribe(data => {
      this.articles = data;
    },
    (error) => {
      console.error('Error al registrarse');
      this.noShowMessagePopAd("Error al cargar productos ", "error");
    });
  }

  private getArticlesByGender(gender: string): void {
    this.articleService.getArticlesByGender(gender).subscribe(
      data => {
        this.articles = data;
      },
      error => {
        console.error('Error al cargar productos:', error);
        this.noShowMessagePopAd("Error al cargar productos", "error");
      }
    );
  }

  noShowMessagePopAd(message_err: string, typeOfAlert: string){
    this.typeOfAlert = typeOfAlert;
    this.popMessageComponent.typeOfAlert = typeOfAlert;
    this.messagePopAd = message_err;
    this.popMessageComponent.update();
    this.showSuccessMessage = true;
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
  }
}
