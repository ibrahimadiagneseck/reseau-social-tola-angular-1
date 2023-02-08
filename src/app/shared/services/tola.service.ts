import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITheme } from '../models/theme';
import { IUtilisateur } from '../models/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class TolaService {

  private urlServeur = "http://localhost:8080";

  constructor(
    private httpClient: HttpClient
  ) { }

  //  CRUD THEME
  public getThemes():Observable<ITheme[]> {
    return this.httpClient.get<ITheme[]>(this.urlServeur+"/Themes");
  }




  //  CRUD UTILISATEUR
  public getUtilisateurs():Observable<IUtilisateur[]> {
    return this.httpClient.get<IUtilisateur[]>(this.urlServeur+"/Utilisateurs");
  }

  public postUtilisateur(utilisateur: IUtilisateur): Observable<IUtilisateur> {
    return this.httpClient.post<IUtilisateur>(`${this.urlServeur}/AjouterUtilisateur`, utilisateur);
  }

  public putUtilisateur(utilisateur: IUtilisateur, idUtilisateur: number): Observable<IUtilisateur> {
    return this.httpClient.put<IUtilisateur>(`${this.urlServeur}/ModifierUtilisateur/${idUtilisateur}`, utilisateur);
  }

  public deleteUtilisateur(idUtilisateur: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.urlServeur}/SupprimerUtilisateur/${idUtilisateur}`);
  }

  public getUtilisateurByIdutilisateur(idUtilisateur: number):Observable<IUtilisateur> {
    return this.httpClient.get<IUtilisateur>(`${this.urlServeur}/UtilisateurById/${idUtilisateur}`);
  }




  //  recuperer toutes les publications des utilisateurs
  public getUtilisateurPublications():Observable<any[]> {
    return this.httpClient.get<any>(this.urlServeur+"/UtilisateurPublications");
  }


  // recuperer les identifiants de connexion
  public getUtilisationByEmailPassword(utilisateur: IUtilisateur):Observable<IUtilisateur> {
    return this.httpClient.post<IUtilisateur>(this.urlServeur+"/UtilisateurByEmailAndMotdepasse", utilisateur);
  }


  // affecter un theme à un utilisateur
  public AjouterUtilisateurThemeById(idUtilisateur: number, idTheme: number): Observable<void> {
    return this.httpClient.post<void>(`${this.urlServeur}/AjouterUtilisateurThemeById/${idUtilisateur}/${idTheme}`, null);
  }


  // recuperer les identifiants de connexion par envoie de mail
  public getUtilisateurByEmailVerification(utilisateur: IUtilisateur):Observable<IUtilisateur> {
    return this.httpClient.post<IUtilisateur>(this.urlServeur+"/EnvoyerMailVerification", utilisateur);
  }

}
