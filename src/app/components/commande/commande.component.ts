import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GestionService } from 'src/app/gestion.service';


import { CommandeRequestDto, CommandeResponseDto, ProduitCommande } from 'src/app/models/model';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css'],
  providers: [MessageService],
})
export class CommandeComponent {

  productDialog: boolean = false;
  deleteProductDialog: boolean = false;
  deleteProductsDialog: boolean = false;
  commandePayload: CommandeRequestDto = {
    designation: '',
    date: '',
    observation: '',
    numero: 0,
    produitCommandes: [],
  };
  visible2: boolean = false;
  visible: boolean = false;
  submitted: boolean = false;
  cols: any[] = [];
  allcommandes: CommandeResponseDto[] = [];
  productRes!: CommandeResponseDto;
  productToComande: ProduitCommande = {
    nomProduit: '',
    quantite: '',
  };
  allProduitCommandes: ProduitCommande[] = [];

  constructor(
    private messageService: MessageService,
    private gestionService: GestionService
  ) {}
  ngOnInit() {
    this.getAllCommandes();
  }
  showDialog() {
    this.visible = true;
  }

  openNew() {
    this.submitted = false;
    this.productDialog = true;
  }

  /*   editProduct(product: Product) {
    this.productDialog = true;
  }
 */

  confirmDelete(idCommande: string | undefined) {
    this.deleteCoammande(idCommande);
    this.deleteProductDialog = false;
    this.allcommandes = this.allcommandes.filter(
      (val) => val.id !== idCommande
    );
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
  getAllCommandes() {
    return this.gestionService.getAllCommande().subscribe(
      (res: CommandeResponseDto[]) => {
        console.log(res);
        this.allcommandes = res;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  /* methode to add labo  , this methode calls the labo methode which calls the service wich work with the back */
  saveProduct() {
    console.log(this.commandePayload);
    this.commandePayload.produitCommandes = this.allProduitCommandes;
    this.addCommande();
    this.productDialog = false;
    this.allProduitCommandes = [];
    this.commandePayload = {
      designation: '',
      date: '',
      observation: '',
      numero: 0,
      produitCommandes: [],
    };
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Commande  added successfully',
      life: 3000,
    });
  }

  deleteProduct(labo: CommandeResponseDto) {
    this.deleteProductDialog = true;
    this.productRes = { ...labo };
  }

  deleteCoammande(id: string | undefined) {
    return this.gestionService.deleteCommande(id).subscribe((res: void) => {});
  }
  addCommande() {
    return this.gestionService.saveCommande(this.commandePayload).subscribe(
      (res: CommandeResponseDto) => {
        console.log(res);
        this.allcommandes = [res, ...this.allcommandes];
      },
      (err) => {
        console.log(err);
      }
    );
  }
  addProductToCommande(produitCommande: ProduitCommande) {
    console.log(produitCommande);
    console.log(this.allProduitCommandes);
    const newProduitCommande = { ...produitCommande };
    this.allProduitCommandes = [
      newProduitCommande,
      ...this.allProduitCommandes,
    ];
    this.visible = false;
    console.log(this.allProduitCommandes);
  }
  showDialog2() {
    this.visible2 = true;
  }
}

