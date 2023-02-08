import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUtilisateur } from 'src/app/shared/models/utilisateur';
import { TolaService } from 'src/app/shared/services/tola.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  idutilisateur!: number;

  utilisateur: IUtilisateur | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tolaService: TolaService
  ) { }

  recupererUtilisateur() {
    // this.route.paramMap.subscribe(params => {
    //   const id = Number(params.get('identifiant'));
    //   this.idutilisateur = id;
    //   this.tolaService.getUtilisateurByIdutilisateur(this.idutilisateur).subscribe(

    //     (donnees: IUtilisateur) => {
    //       this.utilisateur = donnees;
    //       console.log(this.utilisateur);
    //     },
    //     (erreurs: HttpErrorResponse) => {
    //       this.router.navigate(['connexion']);
    //       console.log(erreurs);
    //     }
    //   );
    // });

    this.route.queryParams.subscribe(
      (params) => {
        this.idutilisateur = params['connexion'];
        console.log(this.idutilisateur);

        this.tolaService.getUtilisateurByIdutilisateur(this.idutilisateur).subscribe(
          (donnees: IUtilisateur) => {
            this.utilisateur = donnees;
            console.log(this.utilisateur);
          },
          (erreurs: HttpErrorResponse) => {
            this.router.navigate(['connexion']);
            console.log(erreurs);
          }
        );

      }
    )
  }

  ngOnInit(): void {
    this.recupererUtilisateur();
  }
}
