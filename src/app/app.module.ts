import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArmoiresComponent } from './components/armoires/armoires.component';
import { CategorieComponent } from './components/categorie/categorie.component';
import { CrudComponent } from './components/crud/crud.component';
import { CommandeComponent } from './components/commande/commande.component';
import { HomeComponent } from './components/home/home.component';

import { LoginComponent } from './components/login/login.component';

import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { RubriquesComponent } from './components/rubriques/rubriques.component';
import { SalleTpComponent } from './components/salle-tp/salle-tp.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { TpComponent } from './components/tp/tp.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';


import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';

import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';

import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { FormGroup, FormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';
import { ChartModule } from 'primeng/chart';
import { FournisseurComponent } from './components/fournisseur/fournisseur.component';
import { InventaireComponent } from './components/inventaire/inventaire.component';
import { LaboComponent } from './components/labo/labo.component';

import { PostsComponent } from './components/posts/posts.component';
import { DatePipe } from '@angular/common';
import { PreparationsComponent } from './components/preparations/preparations.component';
import { InvDComponent } from './components/inv-d/inv-d.component';


 
@NgModule({
  declarations: [
    AppComponent,
    ArmoiresComponent,
    CategorieComponent,
    CrudComponent,
    CommandeComponent,
    HomeComponent,
    
    LoginComponent,
    
    ProductsComponent,
    RegisterComponent,
    RubriquesComponent,
    
    SidebarComponent,
    TopbarComponent,
    TpComponent,
    FournisseurComponent,

     InventaireComponent,
     LaboComponent,
     
     SalleTpComponent,
     PostsComponent,
     PreparationsComponent,
     InvDComponent
   
    

  
     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SidebarModule,
    AvatarGroupModule,
    AvatarModule,
    ButtonModule,
    BrowserAnimationsModule,
    MenubarModule,
    InputTextModule,
    ToolbarModule,
    ToastModule,
    FileUploadModule,
    TableModule,
    DialogModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    FormsModule,
    CalendarModule,
    SkeletonModule,
    ChartModule,
    DatePipe,
    InputTextModule,
    InputNumberModule
   
    
   


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
