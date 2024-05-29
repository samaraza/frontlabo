import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GestionService } from 'src/app/gestion.service';


import { PreparationRequestDto, PreparationResponseDto, ProduitResDto, ProduitRequestDto, PreparationProduit } from 'src/app/models/model';

@Component({
  selector: 'app-preparations',
  templateUrl: './preparations.component.html',
  styleUrls: ['./preparations.component.css']
})
export class PreparationsComponent {
  productDialog: boolean = false;
  deleteProductDialog: boolean = false;
  deleteProductsDialog: boolean = false;
  preparationPayload: PreparationRequestDto = {
    designation: '',
    date: new Date(),

    preparationReqProduits: [],
    quantiteEau: '',
  };
  submitted: boolean = false;
  cols: any[] = [];
  allPreparations: PreparationResponseDto[] = [];
  rubriqueRes!: PreparationResponseDto;
  allProducts: ProduitResDto[] = [];
  visible: boolean = false;
  selectedProductToAdd: ProduitRequestDto = {
    designation: '',
    reference: '',
    quantiteInitiale: 0,
    idCategorie: '',
    idRubrique: '',
    idFournisseur: '',
    idArmoire: '',
  };
  productQuantityPayload: PreparationProduit = {
    idProduit: '',
    quantite: 0,
  };
  skeletonLoaderDisplay: boolean = true;
  laboType: string[] = [
    'technique',
    'scientifique',
    'informatique',
    'physique',
  ];

  showDialog() {
    this.visible = true;
  }
  constructor(
    private messageService: MessageService,
    private gestionService: GestionService
  ) {}

  ngOnInit() {
    this.getAllPreparation();
    this.getAllProducts();
    this.getAllProducts();
  }

  openNew() {
    this.submitted = false;
    this.productDialog = true;
  }

  /*   editProduct(product: Product) {
    this.productDialog = true;
  }
 */
  deleteProduct(labo: PreparationResponseDto) {
    this.deleteProductDialog = true;
    this.rubriqueRes = { ...labo };
  }
  confirmDelete(rubriqueId: string | undefined) {
    this.deletePreparation(rubriqueId);
    this.deleteProductDialog = false;
    this.allPreparations = this.allPreparations.filter(
      (val) => val.id !== rubriqueId
    );
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Rubrique Deleted',
      life: 3000,
    });
  }
  /**
   * addProductToPreparation
   */
  public addProductToPreparation() {
    console.log(this.productQuantityPayload.idProduit);
    //ensure that the  ququntity added is under the quantity restant :
    let product = this.allProducts.find((product) => {
      return product.id === this.productQuantityPayload.idProduit;
    });
    console.log(product?.quantiteRestante);
    if (product?.quantiteRestante || product?.quantiteRestante == 0) {
      if (product?.quantiteRestante >= this.productQuantityPayload.quantite) {
        this.preparationPayload.preparationReqProduits = [
          this.productQuantityPayload,
          ...this.preparationPayload.preparationReqProduits,
        ];
        console.log(this.preparationPayload);
        this.visible = false;
        this.skeletonLoaderDisplay = false;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `!!la quantite du produit doit etre inferieur a la quantite restante ${product.quantiteInitiale}  ${product.uniteMesure}`,
          life: 3000,
        });
      }
    } else {
      alert('on ne peux pas ajouter  , sorter de la page et retourner');
    }
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  /* services consumming  */
  getAllPreparation() {
    return this.gestionService.getAllPreparation().subscribe(
      (res: PreparationResponseDto[]) => {
        console.log(res);
        this.allPreparations = res;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  /* methode to add labo  , this methode calls the labo methode which calls the service wich work with the back */
  savePreparation() {
    this.addPreparation(this.preparationPayload);
    this.productDialog = false;
    this.preparationPayload.preparationReqProduits = [];
    this.preparationPayload = {
      designation: '',
      date: new Date(),
      quantiteEau: '',
      preparationReqProduits: [],
    };
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'preparation added successfully',
      life: 3000,
    });
    this.preparationPayload = {
      designation: '',
      quantiteEau: '',

      date: new Date(),
      preparationReqProduits: [],
    };
  }
  getRubriiqueById(id: string) {
    return this.gestionService.getCategorieById(id).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  deletePreparation(id: string | undefined) {
    return this.gestionService
      .deletePreparation(id)
      .subscribe((res: void) => {});
  }
  addPreparation(preparationPayload: PreparationRequestDto) {
    return this.gestionService.savePreparation(preparationPayload).subscribe(
      (res: PreparationResponseDto) => {
        console.log(res);
        this.allPreparations = [res, ...this.allPreparations];
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  /**
   * getAllCategories
   */
  public getAllProducts() {
    return this.gestionService.getAllProduit().subscribe(
      (res: ProduitResDto[]) => {
        console.log(res);
        this.allProducts = res;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
  choosePoductToAdd() {
    console.log('jkdhkaljdlja');
  }
}

