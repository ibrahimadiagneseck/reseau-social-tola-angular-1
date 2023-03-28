import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IQuestion } from 'src/app/shared/models/question';
import { IReponse } from 'src/app/shared/models/reponse';
import { TolaService } from 'src/app/shared/services/tola.service';

@Component({
  selector: 'app-page-reponse',
  templateUrl: './page-reponse.component.html',
  styleUrls: ['./page-reponse.component.css']
})
export class PageReponseComponent {

  question: IQuestion | undefined;
  reponse: IReponse | undefined;
  reponseForm: any;

  constructor(
    private tolaService: TolaService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PageReponseComponent>, // pour fermer le popup
    @Inject(MAT_DIALOG_DATA) public data: any// recuperer les donnees du bouton popup
  ) { }

  ngOnInit(): void {
    this.question = this.data.question;

    // ---------------------------------
    this.reponseForm = this.fb.group({
      description: ['',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(255)
        ]
      ]
    });
  }

  ajouterReponse() {
    this.tolaService.postReponse(this.reponseForm.value).subscribe(
      (donnees: IReponse) => {
        this.reponse = donnees;
        console.log(donnees);

        this.tolaService.AjouterQuestionReponseById((this.question)?this.question.idquestion:0, this.reponse.idreponse).subscribe(
          () => {
            console.log((this.question)?this.question.idquestion:0);
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


  fermerPopup(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    console.log(this.reponseForm.value);
    console.log(this.question);

    this.ajouterReponse();

    this.fermerPopup();
  }

}
