import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUtilisateur } from 'src/app/shared/models/utilisateur';
import { TolaService } from 'src/app/shared/services/tola.service';

@Component({
  selector: 'app-repondre',
  templateUrl: './repondre.component.html',
  styleUrls: ['./repondre.component.css']
})
export class RepondreComponent {

  UtilisateurQuestions: any[] | undefined;

  date_de_publication: Date = new Date();


  constructor(
    private router: Router,
    // private route: ActivatedRoute,
    private tolaService: TolaService
  ) { }

  recupererUtilisateurQuestions() {
    this.tolaService.getUtilisateurQuestions().subscribe(
      (donnees: any) => {

        this.UtilisateurQuestions = donnees;
        console.log('recupererUtilisateurPublications', this.UtilisateurQuestions);
      },
      (erreurs: HttpErrorResponse) => {
        console.log(erreurs);
      }
    );
  }

  ngOnInit(): void {
    this.recupererUtilisateurQuestions();
  }
}
