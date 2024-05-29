import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GestionService } from 'src/app/gestion.service';

import { LaboResponseDto } from 'src/app/models/Response/LaboResponseDto';
import { CategorieReqDto, SalleTpRequestDto, SalleTpResDto } from 'src/app/models/model';
import { LaboService } from 'src/app/services/labo.service';


interface InventoryStatus {
  label: string;
  value: string;
}
export  interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: InventoryStatus;
  category?: string;
  image?: string;
  rating?: number;
}

@Component({
  selector: 'app-salle-tp',
  templateUrl: './salle-tp.component.html',
  styleUrls: ['./salle-tp.component.css'],
  providers: [MessageService],
})
export class SalleTpComponent implements OnInit {
  productDialog: boolean = false;
  deleteProductDialog: boolean = false;
  deleteProductsDialog: boolean = false;
  salleTpPayload: SalleTpRequestDto = {
    numero: '',
    idLabo: '',
  };
  submitted: boolean = false;
  cols: any[] = [];
  allSalleTp: SalleTpResDto[] = [];
  allLabo: LaboResponseDto[] = [];
  laboRes!: SalleTpResDto;

  constructor(
    private messageService: MessageService,
    private gestionService: GestionService,
    private laboService: LaboService,
  ) {}

  ngOnInit() {
    this.getAllSalleTp();
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

  deleteProduct(labo: SalleTpResDto) {
    this.deleteProductDialog = true;
    this.laboRes = { ...labo };
  }
  confirmDelete(SalleTpId: string | undefined) {
    this.deleteSalleTp(SalleTpId);
    this.deleteProductDialog = false;
    this.allSalleTp = this.allSalleTp.filter((e) => {
      return e.id !== SalleTpId;
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  /* services consumming  */
  getAllSalleTp() {
    return this.gestionService.getAllSalleTp().subscribe(
      (res: SalleTpResDto[]) => {
        console.log(res);
        this.allSalleTp = res;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  /* methode to add labo  , this methode calls the labo methode which calls the service wich work with the back */
  saveSalleTp() {
    console.log(this.salleTpPayload);
    this.addSalleTp(this.salleTpPayload);
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

  deleteSalleTp(id: string | undefined) {
    return this.gestionService.deleteSalleTp(id).subscribe((res: void) => {});
  }
  addSalleTp(salleTpPayload: SalleTpRequestDto) {
    return this.gestionService.saveSalleTp(salleTpPayload).subscribe(
      (res: SalleTpResDto) => {
        console.log(res);
        this.allSalleTp = [res, ...this.allSalleTp];
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  /**
   * getAllLabo
   */
  public getAllLabo() {
    return this.laboService.getAlLabo().subscribe(
      (res: LaboResponseDto[]) => {
        console.log(res);
        this.allLabo = res;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
