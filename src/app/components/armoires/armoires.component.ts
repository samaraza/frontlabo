import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Product } from '../salle-tp/salle-tp.component';
import { ArmoireRequestDto, ArmoireResDto, SalleTpResDto } from 'src/app/models/model';
import { HttpErrorResponse } from '@angular/common/http';
import { GestionService } from 'src/app/gestion.service';



@Component({
  selector: 'app-armoires',
  templateUrl: './armoires.component.html',
  styleUrls: ['./armoires.component.css'],
  providers: [MessageService],
 
})
export class ArmoiresComponent { productDialog: boolean = false;
  deleteProductDialog: boolean = false;
  deleteProductsDialog: boolean = false;
  armoirePayLoad: ArmoireRequestDto = {
    designation: '',
    idSalleTp: '',
  };
  submitted: boolean = false;
  cols: any[] = [];
  allArmoires: ArmoireResDto[] = [];
  laboRes!: ArmoireResDto;
  allSalleTp: SalleTpResDto[] = [];

  constructor(
    private messageService: MessageService,
    private gestionService:GestionService
  ) {}

  ngOnInit() {
    this.getAllArmoire();
    this.getAllSalleTp();
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
  deleteProduct(armoirePayLoad: ArmoireResDto) {
    this.deleteProductDialog = true;
    this.laboRes = { ...armoirePayLoad };
  }
  confirmDelete(laboId: string | undefined) {
    this.deleteLabo(laboId);
    this.deleteProductDialog = false;
    this.allArmoires = this.allArmoires.filter((val) => val.id !== laboId);
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'armoire Deleted',
      life: 3000,
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  /* services consumming  */
  getAllArmoire() {
    return this.gestionService.getAllArmoires().subscribe(
      (res: ArmoireResDto[]) => {
        console.log(res);
        this.allArmoires = res;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  /* methode to add armoirePayLoad  , this methode calls the armoirePayLoad methode which calls the service wich work with the back */
  saveArmoire() {
    this.addArmoire(this.armoirePayLoad);
    this.productDialog = false;
  }
  getArmoireById(id: string) {
    return this.gestionService.getArmoireById(id).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  deleteLabo(id: string | undefined) {
    return this.gestionService.deleteArmoire(id).subscribe((res) => {
      console.log(res);
    });
  }
  addArmoire(armoirePayLoad: ArmoireRequestDto) {
    console.log(armoirePayLoad);
    return this.gestionService.saveArmoire(armoirePayLoad).subscribe(
      (res) => {
        console.log(res);
        this.allArmoires = [res, ...this.allArmoires];
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: ' armoire  addded',
          life: 3000,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  /**
   * getAllSalleTp
   */
  public getAllSalleTp() {
    return this.gestionService.getAllSalleTp().subscribe(
      (res) => {
        this.allSalleTp = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
}
}
 