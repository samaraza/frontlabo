import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../salle-tp/salle-tp.component';
import { Table } from 'primeng/table';
import { ArmoireResDto, CategorieResDto, FournisseurResponseDto, ProduitRequestDto, ProduitResDto, RubriqueResDto } from 'src/app/models/model';

import { HttpErrorResponse } from '@angular/common/http';
import { GestionService } from 'src/app/gestion.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [MessageService],
})
export class ProductsComponent {
  
  productDialog: boolean = false;
  deleteProductDialog: boolean = false;
  deleteProductsDialog: boolean = false;
  produitPayLoad: ProduitRequestDto = {
    designation: '',
    reference: '',
    quantiteInitiale: 0,
    idCategorie: '',
    idRubrique: '',
    idFournisseur: '',
    idArmoire: '',
  };
  submitted: boolean = false;
  cols: any[] = [];
  allProduits: ProduitResDto[] = [];
  productRes!: ProduitResDto;
  allFournisseurs: FournisseurResponseDto[] = [];
  allCategories: CategorieResDto[] = [];
  allRubriques: RubriqueResDto[] = [];
  allArmoires: ArmoireResDto[] = [];
  allProduitType: string[] = ['chimique', 'materiel'];
  allUniteMesures: string[] = ['ml', 'l', 'g', 'kg', 'mm', 'm'];

  constructor(
    private messageService: MessageService,
    private gestionService: GestionService
  ) {}
  ngOnInit() {
    this.getAllProduits();
    this.getAllArmoires();
    this.getAllFournisseur();
    this.getAllCategories();
    this.getAllRubriques();
  }

  openNew() {
    this.submitted = false;
    this.productDialog = true;
  }

  /*   editProduct(product: Product) {
    this.productDialog = true;
  }
 */

  confirmDelete(idProduit: string | undefined) {
    this.deleteProduit(idProduit);
    this.deleteProductDialog = false;
    this.allProduits = this.allProduits.filter((val) => val.id !== idProduit);
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'product  Deleted',
      life: 3000,
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  /* services consumming  */
  getAllProduits() {
    return this.gestionService.getAllProduit().subscribe(
      (res: ProduitResDto[]) => {
        console.log(res);
        this.allProduits = res;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  /* methode to add labo  , this methode calls the labo methode which calls the service wich work with the back */
  saveProduct() {
    console.log(this.produitPayLoad);
    this.addProduit();
    this.productDialog = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'product  added successfully',
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
  deleteProduct(labo: ProduitResDto) {
    this.deleteProductDialog = true;
    this.productRes = { ...labo };
  }

  deleteProduit(id: string | undefined) {
    return this.gestionService.deleteProduit(id).subscribe((res: void) => {});
  }
  addProduit() {
    return this.gestionService.saveProduit(this.produitPayLoad).subscribe(
      (res) => {
        console.log(res);
        this.allProduits = [res, ...this.allProduits];
      },
      (err) => {
        console.log(err);
      }
    );
  }
  /**
   * getAllRubriques
   */
  public getAllRubriques() {
    return this.gestionService.getAllRubrique().subscribe(
      (res: RubriqueResDto[]) => {
        console.log(res);
        this.allRubriques = res;
      },
      (err) => {
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
        this.allCategories = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  /**
   * getAllFournisseur  :
   */
  public getAllFournisseur() {
    return this.gestionService.getAllFournisseur().subscribe(
      (res) => {
        console.log(res);
        this.allFournisseurs = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  /**
   * getAllArmoires
   */
  public getAllArmoires() {
    return this.gestionService.getAllArmoires().subscribe(
      (res: ArmoireResDto[]) => {
        console.log(res);
        this.allArmoires = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
