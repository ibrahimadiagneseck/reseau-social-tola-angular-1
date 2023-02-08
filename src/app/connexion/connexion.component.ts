import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InscriptionComponent } from '../inscription/inscription/inscription.component';
import { IUtilisateur } from '../shared/models/utilisateur';
import { TolaService } from '../shared/services/tola.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  public connexionForm!: FormGroup;

  utilisateurs: IUtilisateur[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tolaService: TolaService, // les services
    public dialog: MatDialog // poppup
  ) { }

  // recuperer la liste des utilisateurs
  recupererUtilisateurEmailMotdepasse() {
    this.tolaService.getUtilisationByEmailPassword(this.connexionForm.value).subscribe(
      (donnees: IUtilisateur) => {
        this.goToAccueil(donnees);
        // this.router.navigate(['nomDeRoute'], { state: this.utilisateur });
      },
      (erreurs: HttpErrorResponse) => {
        console.log(erreurs);
        if (erreurs.error instanceof ErrorEvent) {
          console.error('An error occurred:', erreurs.error.message);
        } else {
          console.error(`Backend returned code ${erreurs.status}, body was: ${erreurs.error}`);
        }
      }
    );
  }

  ngOnInit(): void {
    this.connexionForm = this.fb.group({
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
      motdepasse: ['',
        [
          Validators.required
        ]
      ],
    });
  }

  openDialogInscription() {
    const dialogRef = this.dialog.open(InscriptionComponent, {
      width:'50%',
        enterAnimationDuration:'1000ms',
        exitAnimationDuration:'2000ms'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // click sur le bouton validation formulaire
  onSubmit(): void {
    console.log(this.connexionForm.value);
    this.recupererUtilisateurEmailMotdepasse();
  }

  goToAccueil(utilisateur: IUtilisateur) {
    this.router.navigate(['accueil'],
    {
      queryParams: {
        connexion: ""+utilisateur.idutilisateur
      }
    });
  }

  // goToAccueil(utilisateur: IUtilisateur) {
  //   this.router.navigate(['accueil', utilisateur.idutilisateur]);
  // }

}
