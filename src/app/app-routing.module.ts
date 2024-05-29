import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TpComponent } from './components/tp/tp.component';
import { SalleTpComponent } from './components/salle-tp/salle-tp.component';
import { LaboComponent } from './components/labo/labo.component';
import { ProductsComponent } from './components/products/products.component';
import { CategorieComponent } from './components/categorie/categorie.component';
import { RubriquesComponent } from './components/rubriques/rubriques.component';
import { PreparationsComponent } from './components/preparations/preparations.component';
import { ArmoiresComponent } from './components/armoires/armoires.component';
import { CommandeComponent } from './components/commande/commande.component';
import { InventaireComponent } from './components/inventaire/inventaire.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PostsComponent } from './components/posts/posts.component';
import { FournisseurComponent } from './components/fournisseur/fournisseur.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path:'home',
    component: HomeComponent,
    children:[
      {
        path:'',
        component: SalleTpComponent,
      },

      {
        path:'labo',
        component: LaboComponent,
      },

      {
        path:'products',
        component: ProductsComponent,
      },
      
      {
        path:'categorie',
        component: CategorieComponent,
      },

      {
        path:'rubriques',
        component: RubriquesComponent,
      },

      {
        path:'preparations',
        component:PreparationsComponent,
      },

      {
        path:'tp',
        component: TpComponent,
      },

      {
        path:'armoires',
        component:ArmoiresComponent,
      },

      {
        path:'commande',
        component: CommandeComponent,
      },

      {
        path:'inventaire',
        component:InventaireComponent,
      },
    ],
  },
  {
    path:'login',
    component:LoginComponent,
  },
  {
    path:'register',
    component: RegisterComponent,
  },
  {
    path: 'fourn',
    component: FournisseurComponent,
  },
  {
    path: 'posts',
    component:PostsComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
