import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IUtilisateur } from 'src/app/shared/models/utilisateur';
import { TolaService } from 'src/app/shared/services/tola.service';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  utilisateur: IUtilisateur | undefined;

  public questionForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tolaService: TolaService,
    public dialogRef: MatDialogRef<QuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any// recuperer les donnees du bouton popup
  ) { }

  ngOnInit(): void {
    this.utilisateur = this.data.utilisateur;

    this.questionForm = this.fb.group({
      question: ['',
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
    // this.recupererUtilisateurEmailMotdepasse();
  }

  fermerPopup(): void {
    this.dialogRef.close();
  }

}
