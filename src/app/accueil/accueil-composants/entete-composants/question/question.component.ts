import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IQuestion } from 'src/app/shared/models/question';
import { IUtilisateur } from 'src/app/shared/models/utilisateur';
import { TolaService } from 'src/app/shared/services/tola.service';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  utilisateur: IUtilisateur | undefined;

  question: IQuestion | undefined;

  public questionForm!: FormGroup;

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
        // Apres ajouter, recuperer l'utilisateur en question
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
  ngOnInit(): void {
    this.utilisateur = this.data.utilisateur;

    this.questionForm = this.fb.group({
      nom: ['',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50)
        ]
      ]
    });
  }

  // click sur le bouton validation formulaire
  onSubmit(): void {
    console.log(this.questionForm.value);
    this.ajouterQuestion((this.utilisateur)?this.utilisateur.idutilisateur:0);
    // this.fermerPopup();
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

}
