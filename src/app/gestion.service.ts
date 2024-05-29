import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ArmoireResDto, ArmoireRequestDto, CategorieReqDto, CategorieResDto, TpRequestDto, TpResponseDto, RubriqueReqDto, RubriqueResDto, SalleTpRequestDto, SalleTpResDto, ProduitRequestDto, ProduitResDto, FournisseurRequestDto, FournisseurResponseDto, PreparationRequestDto, PreparationResponseDto, PostRequestDto, PostResponseDto, CommandeRequestDto, CommandeResponseDto } from './models/model';

@Injectable({
  providedIn: 'root'
})
export class GestionService {

  constructor(private http: HttpClient) { }
  /* armoire services  ------------------------------------------------------  */
  getAllArmoires(): Observable<ArmoireResDto[]> {
    return this.http.get<ArmoireResDto[]>(`${environment.apiUrl}/Armoire`);
  }
  deleteArmoire(id: string | undefined) {
    return this.http.delete<void>(`${environment.apiUrl}/Armoire/${id}`);
  }
  saveArmoire(payload: ArmoireRequestDto) {
    return this.http.post<ArmoireResDto>(
      `${environment.apiUrl}/Armoire`,
      payload
    );
  }
  getArmoireById(id: string): Observable<ArmoireResDto> {
    return this.http.get<ArmoireResDto>(
      `${environment.apiUrl}/Armoire/one/${id}`
    );
  }
  
  /* categories services  ----------------------------------------------*/
  getAllCategories(): Observable<CategorieResDto[]> {
    return this.http.get<CategorieResDto[]>(`${environment.apiUrl}/Categorie`);
  }
  deleteCategorie(id: string | undefined) {
    return this.http.delete<void>(`${environment.apiUrl}/Categorie/${id}`);
  }
  saveCategorie(payload: CategorieReqDto) {
    console.log(payload);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<CategorieResDto>(
      `${environment.apiUrl}/Categorie`,
      payload,
      { headers: headers }
    );
  }
  getCategorieById(id: string): Observable<CategorieResDto> {
    return this.http.get<CategorieResDto>(
      `${environment.apiUrl}/Categorie/one/${id}`
    );
  }

  /* tp services -------------------------------------------------- */
  getAllTp(): Observable<TpResponseDto[]> {
    return this.http.get<TpResponseDto[]>(`${environment.apiUrl}/tp`);
  }
  deleteTp(id: string | undefined) {
    return this.http.delete<void>(`${environment.apiUrl}/tp/${id}`);
  }
  saveTp(payload: TpRequestDto) {
    return this.http.post<TpResponseDto>(`${environment.apiUrl}/tp`, payload);
  }
  getTpById(id: string): Observable<TpResponseDto> {
    return this.http.get<TpResponseDto>(`${environment.apiUrl}/tp/one/${id}`);
  }

   /* rubrique services  ----------------------------------------- */
   getAllRubrique(): Observable<RubriqueResDto[]> {
    return this.http.get<RubriqueResDto[]>(`${environment.apiUrl}/Rubrique`);
  }
  deleteRubrique(id: string | undefined) {
    return this.http.delete<void>(`${environment.apiUrl}/Rubrique/${id}`);
  }
  saveRubrique(payload: RubriqueReqDto) {
    return this.http.post<RubriqueResDto>(
      `${environment.apiUrl}/Rubrique`,
      payload
    );
  }

  /* ------------------------------------------- Salle tp Services  */
  getAllSalleTp(): Observable<SalleTpResDto[]> {
    return this.http.get<SalleTpResDto[]>(`${environment.apiUrl}/SalleTp`);
  }
  deleteSalleTp(id: string | undefined) {
    return this.http.delete<void>(`${environment.apiUrl}/SalleTp/${id}`);
  }
  saveSalleTp(payload: SalleTpRequestDto) {
    return this.http.post<SalleTpResDto>(
      `${environment.apiUrl}/SalleTp`,
      payload
    );
  }

  /* ---------------------------produit services  */
  getAllProduit(): Observable<ProduitResDto[]> {
    return this.http.get<ProduitResDto[]>(`${environment.apiUrl}/products`);
  }
  deleteProduit(id: string | undefined) {
    return this.http.delete<void>(`${environment.apiUrl}/products/${id}`);
  }
  saveProduit(payload: ProduitRequestDto) {
    return this.http.post<ProduitResDto>(
      `${environment.apiUrl}/products`,
      payload
    );
  }

   /* --------------------------------------- fournissuer services  */
   getAllFournisseur(): Observable<FournisseurResponseDto[]> {
    return this.http.get<FournisseurResponseDto[]>(
      `${environment.apiUrl}/fournisseur`
    );
  }
  deleteFournisseur(id: string | undefined) {
    return this.http.delete<void>(`${environment.apiUrl}/fournisseur/${id}`);
  }
  saveFournisseur(payload: FournisseurRequestDto) {
    return this.http.post<FournisseurResponseDto>(
      `${environment.apiUrl}/fournisseur`,
      payload
    );
  }
  /* --------------------------------------------- preparation services  */
  getAllPreparation(): Observable<PreparationResponseDto[]> {
    return this.http.get<PreparationResponseDto[]>(
      `${environment.apiUrl}/preparation`
    );
  }
  deletePreparation(id: string | undefined) {
    return this.http.delete<void>(`${environment.apiUrl}/preparation/${id}`);
  }
  savePreparation(payload: PreparationRequestDto) {
    return this.http.post<PreparationResponseDto>(
      `${environment.apiUrl}/preparation`,
      payload
    );
  }

   /* Fournisssuer services --------------------------------------------- */

  /* -------------------------------------------posts services  */
  getAllPosts(): Observable<PostResponseDto[]> {
    return this.http.get<PostResponseDto[]>(`${environment.apiUrl}/posts`);
  }
  deletePost(id: string | undefined) {
    return this.http.delete<void>(`${environment.apiUrl}/posts/${id}`);
  }
  savePost(payload: PostRequestDto) {
    return this.http.post<PostResponseDto>(
      `${environment.apiUrl}/posts`,
      payload
    );
  }
  /* commande services ------------------------------- */
  getAllCommande(): Observable<CommandeResponseDto[]> {
    return this.http.get<CommandeResponseDto[]>(
      `${environment.apiUrl}/commande`
    );
  }
  deleteCommande(id: string | undefined) {
    return this.http.delete<void>(`${environment.apiUrl}/commande/${id}`);
  }
  saveCommande(payload: CommandeRequestDto) {
    return this.http.post<CommandeResponseDto>(
      `${environment.apiUrl}/commande`,
      payload
    );
}

 /* ---------------------------- inventaire services  */
 doInvetaire(payload: ProduitResDto) {
  return this.http.put<CommandeResponseDto>(
    `${environment.apiUrl}/products/inventaire`,
    payload
  );
}
}
