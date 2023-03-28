import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPublication } from '../models/publication';
import { IQuestion } from '../models/question';
import { IReponse } from '../models/reponse';
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

  //  CRUD QUESTION
  public getQuestions():Observable<IQuestion[]> {
    return this.httpClient.get<IQuestion[]>(this.urlServeur+"/Questions");
  }

  public postQuestion(question: IQuestion): Observable<IQuestion> {
    return this.httpClient.post<IQuestion>(`${this.urlServeur}/AjouterQuestion`, question);
  }

  public putQuestion(question: IQuestion, idquestion: number): Observable<IQuestion> {
    return this.httpClient.put<IQuestion>(`${this.urlServeur}/ModifierQuestion/${idquestion}`, question);
  }

  public deleteQuestion(idquestion: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.urlServeur}/SupprimerQuestion/${idquestion}`);
  }

  public getQuestionByIdquestion(idquestion: number):Observable<IQuestion> {
    return this.httpClient.get<IQuestion>(`${this.urlServeur}/QuestionById/${idquestion}`);
  }


  //  CRUD Publication
  public getPublications():Observable<IPublication[]> {
    return this.httpClient.get<IPublication[]>(this.urlServeur+"/Publications");
  }

  public postPublication(Publication: IPublication): Observable<IPublication> {
    return this.httpClient.post<IPublication>(`${this.urlServeur}/AjouterPublication`, Publication);
  }

  public putPublication(Publication: IPublication, idPublication: number): Observable<IPublication> {
    return this.httpClient.put<IPublication>(`${this.urlServeur}/ModifierPublication/${idPublication}`, Publication);
  }

  public deletePublication(idPublication: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.urlServeur}/SupprimerPublication/${idPublication}`);
  }

  public getPublicationByIdPublication(idPublication: number):Observable<IPublication> {
    return this.httpClient.get<IPublication>(`${this.urlServeur}/PublicationById/${idPublication}`);
  }


  //  recuperer toutes les publications des utilisateurs
  public getUtilisateurPublications():Observable<any[]> {
    return this.httpClient.get<any>(this.urlServeur+"/UtilisateurPublications");
  }

  //  recuperer toutes les questions des utilisateurs
  public getUtilisateurQuestions():Observable<any[]> {
    return this.httpClient.get<any>(this.urlServeur+"/UtilisateurQuestions");
  }


  // recuperer les identifiants de connexion
  public getUtilisationByEmailPassword(utilisateur: IUtilisateur):Observable<IUtilisateur> {
    return this.httpClient.post<IUtilisateur>(this.urlServeur+"/UtilisateurByEmailAndMotdepasse", utilisateur);
  }

  // recuperer un fichier
  public getFichierByIdFichier(idFichier: number):Observable<any> {
    return this.httpClient.get<any>(`${this.urlServeur}/Fichier/${idFichier}`);
  }

  // recuperer les identifiants d'un fichier'
  public getFichier(idFichier: number):Observable<any> {
    return this.httpClient.get<any>(`${this.urlServeur}/FichierById/${idFichier}`);
  }


  // affecter un theme à un utilisateur
  public AjouterUtilisateurThemeById(idUtilisateur: number, idTheme: number): Observable<void> {
    return this.httpClient.post<void>(`${this.urlServeur}/AjouterUtilisateurThemeById/${idUtilisateur}/${idTheme}`, null);
  }

  // affecter une question à un utilisateur
  public AjouterUtilisateurQuestionById(idUtilisateur: number, idQuestion: number): Observable<void> {
    return this.httpClient.post<void>(`${this.urlServeur}/AjouterUtilisateurQuestionById/${idUtilisateur}/${idQuestion}`, null);
  }

  // affecter une publication à un utilisateur
  public AjouterUtilisateurPublicationById(idUtilisateur: number, idPublication: number): Observable<void> {
    return this.httpClient.post<void>(`${this.urlServeur}/AjouterUtilisateurPublicationById/${idUtilisateur}/${idPublication}`, null);
  }

  // affecter une publication à une photo
  public AjouterPublicationFichierdbById(idPublication: number, idfichier: String): Observable<void> {
    return this.httpClient.post<void>(`${this.urlServeur}/AjouterPublicationFichierdbById/${idPublication}/${idfichier}`, null);
  }

  // recuperer les identifiants de connexion par envoie de mail
  public getUtilisateurByEmailVerification(utilisateur: IUtilisateur):Observable<IUtilisateur> {
    return this.httpClient.post<IUtilisateur>(this.urlServeur+"/EnvoyerMailVerification", utilisateur);
  }

  // Ajouter un fichier
  public ajouterFichier(file: File): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('fichier', file);

    console.log(formData);


    const req = new HttpRequest('POST', `${this.urlServeur}/AjouterFichier`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpClient.request(req);
  }

  // Ajouter un fichier en recuperant l'id enregistré
  public AjouterFichierById(file: File): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('fichier', file);

    console.log(formData);


    const req = new HttpRequest('POST', `${this.urlServeur}/AjouterFichierById`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpClient.request(req);
  }


  public postReponse(reponse: IReponse): Observable<IReponse> {
    return this.httpClient.post<IReponse>(`${this.urlServeur}/AjouterReponse`, reponse);
  }

  // affecter une reponse à un question
  public AjouterQuestionReponseById(idQuestion: number, idReponse: number): Observable<void> {
    return this.httpClient.post<void>(`${this.urlServeur}/AjouterQuestionReponseById/${idQuestion}/${idReponse}`, null);
  }

}
