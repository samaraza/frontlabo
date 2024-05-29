import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Type } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GestionService } from 'src/app/gestion.service';
import { ProduitResDto, ProduitType } from 'src/app/models/model';

@Component({
  selector: 'app-inventaire',
  templateUrl: './inventaire.component.html',
  styleUrls: ['./inventaire.component.css'],
  providers: [MessageService],
})
export class InventaireComponent implements OnInit{

  productDialog: boolean = false;
  deleteProductDialog: boolean = false;
  deleteProductsDialog: boolean = false;
  submitted: boolean = false;
  cols: any[] = [];
  allProducts: ProduitResDto[] = [];
  laboRes!: ProduitResDto;
  filtredPRoducts: ProduitResDto[] = [];

  constructor(
    private messageService: MessageService,
    private gestionService: GestionService
  ) {}
  handleChange(product: ProduitResDto) {
    this.allProducts.map((p) => {
      if (p.id === product.id) {
        if (p.quanitePerdu <= product.quantiteRestante) {
          p.quantiteRestante =
            p.quantiteInitiale - p.quantiteUtilise - p.quanitePerdu;
          console.log();
          return p;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `!!la quantite Perdu doit etre inferieur a la quantite restante ${product.quantiteInitiale}  ${product.uniteMesure}`,
            life: 3000,
          });
          p.quanitePerdu = 0;
          return p;
        }
      } else {
        return p;
      }
    });
  }

  ngOnInit() {
    this.getAllProducts();
  }

  /*   openNew() {
    this.submitted = false;
    this.productDialog = true;
  } */

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  /* services consumming  */
  getAllProducts() {
    return this.gestionService.getAllProduit().subscribe(
      (res: ProduitResDto[]) => {
        this.allProducts = res;
        this.filtredPRoducts = this.allProducts.filter((e) => {
          return e.type == ProduitType.materiel;
        });

        console.log(this.allProducts);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
  updateQuantiteRestante(product: ProduitResDto) {
    product.quantiteRestante =
      product.quantiteInitiale - product.quantiteUtilise - product.quanitePerdu;
  }
  appliquerChangements() {
    console.log('sjkdfh,jdflkjsdlfjl');
    this.allProducts.map((p) => {
      this.gestionService.doInvetaire(p).subscribe(
        (res: any) => {
          console.log('inventaire regle ');
          p.quanitePerdu = 0;
        },
        (err: any) => {
          console.log(err);
        }
      );
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Inventaire successfully done',
        life: 3000,
      });
    });
  }
}

