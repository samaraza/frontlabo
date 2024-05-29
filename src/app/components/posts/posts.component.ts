import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { PostRequestDto, PostResponseDto } from 'src/app/models/model';
import { GestionService } from 'src/app/gestion.service';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  providers: [MessageService],
})
export class PostsComponent implements OnInit {
  productDialog: boolean = false;
  deleteProductDialog: boolean = false;
  deleteProductsDialog: boolean = false;
  postPayload: PostRequestDto = {
    title: '',
    date: new Date(),
    content: '',
  };
  submitted: boolean = false;
  cols: any[] = [];
  allPosts: PostResponseDto[] = [];
  fournisseurRes!: PostResponseDto;

  constructor(
    private messageService: MessageService,
    private  gestionService: GestionService
  ) {}

  ngOnInit() {
    this.getAllPosts();
  }

  openNew() {
    this.submitted = false;
    this.productDialog = true;
  }

  /*   editProduct(product: Product) {
    this.productDialog = true;
  }
 */
  deleteProduct(labo: PostResponseDto) {
    this.deleteProductDialog = true;
    this.fournisseurRes = { ...labo };
  }
  confirmDelete(rubriqueId: string | undefined) {
    this.deletePost(rubriqueId);
    this.deleteProductDialog = false;
    this.allPosts = this.allPosts.filter((val) => val.id !== rubriqueId);
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Fournisseur Deleted',
      life: 3000,
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  /* services consumming  */
  getAllPosts() {
    return this.gestionService.getAllPosts().subscribe(
      (res: PostResponseDto[]) => {
        console.log(res);
        this.allPosts = res;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  /* methode to add labo  , this methode calls the labo methode which calls the service wich work with the back */
  savePost() {
    console.log(this.postPayload);
    this.addPost(this.postPayload);
    this.productDialog = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'post  added successfully',
      life: 3000,
    });
  }

  deletePost(id: string | undefined) {
    return this.gestionService.deletePost(id).subscribe((res: void) => {});
  }
  addPost(postPayload: PostRequestDto) {
    console.log(postPayload);
    return this.gestionService.savePost(postPayload).subscribe(
      (res: PostResponseDto) => {
        console.log(res);
        this.allPosts = [res, ...this.allPosts];
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
export { PostRequestDto };
