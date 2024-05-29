import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Product } from '../salle-tp/salle-tp.component';
import { LaboResponseDto } from 'src/app/models/Response/LaboResponseDto';
import { HttpErrorResponse } from '@angular/common/http';
import { LaboService } from 'src/app/services/labo.service';

@Component({
  selector: 'app-labo',
  templateUrl: './labo.component.html',
  styleUrls: ['./labo.component.css'],
  providers: [MessageService],
})

export class LaboComponent {
  
  productDialog: boolean = false;
  deleteProductDialog: boolean = false;
  deleteProductsDialog: boolean = false;
  labo!: string;
  submitted: boolean = false;
  cols: any[] = [];
  allLabo: LaboResponseDto[] = [];
  laboRes!: LaboResponseDto;

  constructor(
    private messageService: MessageService,
    private laboService: LaboService,
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

  /*   editProduct(product: Product) {
    this.productDialog = true;
  } */

  deleteProduct(labo: LaboResponseDto) {
    this.deleteProductDialog = true;
    this.laboRes = { ...labo };
  }
  confirmDelete(laboId: string | undefined) {
    console.log(laboId);
    console.log('confirm delete');
    this.deleteLabo(laboId);
    this.deleteProductDialog = false;
    this.allLabo = this.allLabo.filter((val) => val.id !== laboId);
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Product Deleted',
      life: 3000,
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  /* services consumming  */
  getAllLabo() {
    return this.laboService.getAlLabo().subscribe(
      (res: LaboResponseDto[]) => {
        this.allLabo = res;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  /* methode to add labo  , this methode calls the labo methode which calls the service wich work with the back */
  saveLabo() {
    this.addLabo(this.labo);
    this.productDialog = false;
  }
  getLaboById(id: string) {
    return this.laboService.getLaboById(id).subscribe(
      (res:LaboResponseDto) => {
        console.log(res);
      },
      (err:any) => {
        console.log(err);
      }
    );
  }

  deleteLabo(id: string | undefined) {
    return this.laboService.deleteLabo(id).subscribe((res: void) => {});
  }
  addLabo(labo: string) {
    console.log(labo);
    return this.laboService.saveLabo(labo).subscribe(
      (res) => {
        console.log(res);
        this.allLabo = [res, ...this.allLabo];
      },
      (err) => {
        console.log(err);
      }
    );
  }
}