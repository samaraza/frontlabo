import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../salle-tp/salle-tp.component';
import { CategorieReqDto, CategorieResDto } from 'src/app/models/model';
import { HttpErrorResponse } from '@angular/common/http';
import { GestionService } from 'src/app/gestion.service';




@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css'],
  providers: [MessageService],
})
export class CategorieComponent {
  productDialog: boolean = false;
  deleteProductDialog: boolean = false;
  deleteProductsDialog: boolean = false;
  categorie!: CategorieReqDto;
  submitted: boolean = false;
  cols: any[] = [];
  allCategories: CategorieResDto[] = [];
  laboRes!: CategorieResDto;

  constructor(
    private messageService: MessageService,
    private gestionService:GestionService
  ) {}

  ngOnInit() {
    this.getAllLabo();
  }
  laboType: string[] = [
    'technique',
    'scientifique',
    'informatique',
    'physique',
  ];

  openNew() {
    this.submitted = false;
    this.productDialog = true;
  }

  editProduct(product: CategorieReqDto) {
    this.productDialog = true;
  }

  deleteProduct(labo: CategorieResDto) {
    this.deleteProductDialog = true;
    this.laboRes = { ...labo };
  }
  confirmDelete(laboId: string | undefined) {
    this.deleteCategorie(laboId);
    this.deleteProductDialog = false;
    this.allCategories = this.allCategories.filter((val) => val.id !== laboId);
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Categorie Deleted',
      life: 3000,
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  /* services consumming  */
  getAllLabo() {
    return this.gestionService.getAllCategories().subscribe(
      (res: CategorieResDto[]) => {
        console.log(res);
        this.allCategories = res;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  /* methode to add labo  , this methode calls the labo methode which calls the service wich work with the back */
  saveCategorie() {
    this.addCategorie(this.categorie);
    this.productDialog = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Categorie added successfully',
      life: 3000,
    });
  }
  getCategorieById(id: string) {
    return this.gestionService.getCategorieById(id).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  deleteCategorie(id: string | undefined) {
    return this.gestionService.deleteCategorie(id).subscribe((res: void) => {});
  }
  addCategorie(categorie: CategorieReqDto) {
    return this.gestionService.saveCategorie(categorie).subscribe(
      (res: CategorieResDto) => {
        console.log(res);
        this.allCategories = [res, ...this.allCategories];
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
