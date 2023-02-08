import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IUtilisateur } from 'src/app/shared/models/utilisateur';
import { TolaService } from 'src/app/shared/services/tola.service';
import { VerificationComponent } from '../verification/verification.component';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  public inscriptionForm!: FormGroup;

  utilisateurs: IUtilisateur[] = [];
  utilisateur!: IUtilisateur;

  constructor(
    private fb: FormBuilder,
    private tolaService: TolaService,
    public dialogRef: MatDialogRef<InscriptionComponent>,
    public dialog: MatDialog // poppup
  ) { }

  // ajouter un utilisateur via le formulaire
  ajouterUtilisateur() {
    this.tolaService.postUtilisateur(this.inscriptionForm.value).subscribe(
      (donnees: IUtilisateur) => {
        // Apres ajouter, recuperer l'utilisateur en question
        this.utilisateur = donnees;
        console.log(donnees);
        // this.inscriptionForm.reset({})
      },
      erreurs => {
        console.log(erreurs);
      }
    );
  }

  ngOnInit(): void {
    this.inscriptionForm = this.fb.group({
      nom: ['',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50)
        ]
      ],
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ]
    });
  }

  envoyerMailVerification(utilisateur: IUtilisateur) {
    this.tolaService.getUtilisateurByEmailVerification(utilisateur).subscribe(
      (donnees: IUtilisateur) => {
        // Apres defini le mot de passe, mettre à jour l'utilisateur en question
        this.utilisateur = donnees;
        console.log('envoyerMailVerification', donnees);
      },
      erreurs => {
        console.log(erreurs);
      }
    );
  }

  // click sur le bouton validation formulaire
  onSubmit(): void {
    console.log(this.inscriptionForm.value);
    this.ajouterUtilisateur();

    setTimeout(() => {
      this.envoyerMailVerification(this.utilisateur);
    }, 2000);


    setTimeout(() => {
      this.dialogRef.close();
      this.openDialogVerification(this.utilisateur);
    }, 22000);
  }

  fermerPopup(): void {
    this.dialogRef.close();
  }

  openDialogVerification(utilisateur: IUtilisateur) {
    const dialogRef = this.dialog.open(VerificationComponent, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '2000ms',
      data: {
        utilisateur
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
