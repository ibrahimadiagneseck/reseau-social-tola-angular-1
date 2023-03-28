import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IPublication } from 'src/app/shared/models/publication';
import { IQuestion } from 'src/app/shared/models/question';
import { IUtilisateur } from 'src/app/shared/models/utilisateur';
import { TolaService } from 'src/app/shared/services/tola.service';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  // FILE
  selectedFiles?: FileList;
  currentFile?: File;
  fileInfos?: Observable<any>;
  message = "";
  idFichierDB: String = "";
  // ---------------------

  showForm1: boolean = true; // ajouter une question ou une publication
  showForm2: boolean = false; // ajouter une question ou une publication

  isClicked1 = true;
  isClicked2 = false;

  utilisateur: IUtilisateur | undefined;

  question: IQuestion | undefined;
  publication: IPublication | undefined;
  fichier: any | undefined;

  public questionForm!: FormGroup;
  public publicationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tolaService: TolaService,
    public dialogRef: MatDialogRef<QuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any// recuperer les donnees du bouton popup
  ) { }

  // ajouter une question via le formulaire
  ajouterQuestion(idutilisateur: number) {
    this.tolaService.postQuestion(this.questionForm.value).subscribe(
      (donnees: IQuestion) => {
        this.question = donnees;
        console.log(donnees);

        this.tolaService.AjouterUtilisateurQuestionById(idutilisateur, this.question.idquestion).subscribe(
          () => {
            console.log(idutilisateur);
          },
          (erreurs: HttpErrorResponse) => {
            console.log(erreurs);
          }
        );
      },
      erreurs => {
        console.log(erreurs);
      }
    );

  }

  // ajouter une publication via le formulaire
  ajouterPublication(idutilisateur: number) {

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
        this.tolaService.AjouterFichierById(this.currentFile).subscribe(
          (event: any) => {
              console.log((event.body) ? event.body.message : null);
              const idfichier = (event.body) ? event.body.message : null;

              this.tolaService.getFichier(idfichier).subscribe(
                (donnee: any) => {
                  this.fichier = donnee;
                  if (this.fichier) {
                    this.idFichierDB = this.fichier.idfichierdb;
                    console.log(this.fichier);
                    console.log(this.fichier.idfichierdb);
                  }

                },
                (err: any) => {
                  console.log(err);
                }
              );
          },
          (err: any) => {
            console.log(err);
            // this.message = 'Could not upload the file!';
            // this.currentFile = undefined;
          }
        );


        setTimeout(() => {
          this.tolaService.postPublication(this.publicationForm.value).subscribe(
            (donnees: IPublication) => {
              this.publication = donnees;
              console.log(donnees);
            },
            erreurs => {
              console.log(erreurs);
            }
          );
        }, 1000);

        setTimeout(() => {
          this.tolaService.AjouterUtilisateurPublicationById(idutilisateur, this.publication ? this.publication.idpublication : 0).subscribe(
            () => {
              console.log(idutilisateur);
            },
            (erreurs: HttpErrorResponse) => {
              console.log(erreurs);
            }
          );
        }, 2000);




        setTimeout(() => {
          this.tolaService.AjouterPublicationFichierdbById((this.publication) ? this.publication.idpublication : 0, this.idFichierDB).subscribe(
            (donnees: any) => {
              console.log('AjouterPublicationFichierdbById', donnees);
            },
            erreurs => {
              console.log(erreurs);
            }
          );
        }, 5000);
      }
    }

  }

  ngOnInit(): void {
    this.utilisateur = this.data.utilisateur;

    // ---------------------------------
    this.questionForm = this.fb.group({
      nom: ['',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(255)
        ]
      ]
    });

    // ---------------------------------
    this.publicationForm = this.fb.group({
      nom: ['',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(255)
        ]
      ],
      description: ['',
        [
          Validators.required,
          Validators.minLength(4)
        ]
      ],
      fichier: [this.fichier,
      [
        Validators.required
      ]
      ]
    });
  }



  // onFileSelected(event) {
  //   this.selectedFile = event.target.files[0];
  // }

  // FILE
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  // ---------------------------



  // click sur le bouton Ajouter une question formulaire 1
  onSubmit1(): void {
    console.log(this.questionForm.value);

    this.ajouterQuestion((this.utilisateur) ? this.utilisateur.idutilisateur : 0);

    this.fermerPopup();

    setTimeout(() => {
      this.actualiserPage((this.utilisateur) ? this.utilisateur.idutilisateur : 0);
    }, 500);
  }

  // click sur le bouton publier formulaire 2
  onSubmit2(): void {
    console.log(this.questionForm.value);

    this.ajouterPublication((this.utilisateur) ? this.utilisateur.idutilisateur : 0);

    this.fermerPopup();

    setTimeout(() => {
      this.actualiserPage((this.utilisateur) ? this.utilisateur.idutilisateur : 0);
    }, 500);
  }


  afficherFormulaire1() {
    this.showForm1 = true;
    this.showForm2 = false;

    this.isClicked1 = true;
    this.isClicked2 = false;
  }

  afficherFormulaire2() {
    this.showForm1 = false;
    this.showForm2 = true;

    this.isClicked2 = true;
    this.isClicked1 = false;
  }

  fermerPopup(): void {
    this.dialogRef.close();
  }

  actualiserPage(idutilisateur: number) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['accueil'], {
      queryParams: {
        connexion: idutilisateur
      }
    });
  }

  // actualiserPage(idutilisateur: number) {
  //   const navigationExtras: NavigationExtras = {
  //     queryParams: { connexion: idutilisateur },
  //     skipLocationChange: false,
  //     replaceUrl: true,
  //     reload: true
  //   };
  //   this.router.navigate(['accueil'], navigationExtras);
  // }

}
