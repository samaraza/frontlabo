import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GestionService } from 'src/app/gestion.service';

import { CategorieResDto, RubriqueReqDto, RubriqueResDto } from 'src/app/models/model';


@Component({
  selector: 'app-rubriques',
  templateUrl: './rubriques.component.html',
  styleUrls: ['./rubriques.component.css'],
  providers: [MessageService],
})
export class RubriquesComponent {

  productDialog: boolean = false;
  deleteProductDialog: boolean = false;
  deleteProductsDialog: boolean = false;
  rubriquePayLoad: RubriqueReqDto = {
    designation: '',
    idCategorie: '',
  };
  submitted: boolean = false;
  cols: any[] = [];
  allRubrique: RubriqueResDto[] = [];
  rubriqueRes!: RubriqueResDto;
  allCategorie: CategorieResDto[] = [];

  constructor(
    private messageService: MessageService,
    private gestionService: GestionService
  ) {}

  ngOnInit() {
    this.getAllRubrique();
    this.getAllCategories();
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

  /*   editProduct(product: Product) {
    this.productDialog = true;
  }
 */
  deleteProduct(labo: RubriqueResDto) {
    this.deleteProductDialog = true;
    this.rubriqueRes = { ...labo };
  }
  confirmDelete(rubriqueId: string | undefined) {
    this.deleteRubrique(rubriqueId);
    this.deleteProductDialog = false;
    this.allRubrique = this.allRubrique.filter((val) => val.id !== rubriqueId);
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Rubrique Deleted',
      life: 3000,
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  /* services consumming  */
  getAllRubrique() {
    return this.gestionService.getAllRubrique().subscribe(
      (res: RubriqueResDto[]) => {
        console.log(res);
        this.allRubrique = res;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  /* methode to add labo  , this methode calls the labo methode which calls the service wich work with the back */
  saveRubrique() {
    console.log(this.rubriquePayLoad);
    this.addRubrique(this.rubriquePayLoad);
    this.productDialog = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Rubrique added successfully',
      life: 3000,
    });
  }
  getRubriiqueById(id: string) {
    return this.gestionService.getCategorieById(id).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteRubrique(id: string | undefined) {
    return this.gestionService.deleteRubrique(id).subscribe((res: void) => {});
  }
  addRubrique(rubriquePayLoad: RubriqueReqDto) {
    return this.gestionService.saveRubrique(rubriquePayLoad).subscribe(
      (res: RubriqueResDto) => {
        console.log(res);
        this.allRubrique = [res, ...this.allRubrique];
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  /**
   * getAllCategories
   */
  public getAllCategories() {
    return this.gestionService.getAllCategories().subscribe(
      (res: CategorieResDto[]) => {
        console.log(res);
        this.allCategorie = res;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
}
