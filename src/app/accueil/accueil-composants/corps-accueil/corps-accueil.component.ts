import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUtilisateur } from 'src/app/shared/models/utilisateur';
import { TolaService } from 'src/app/shared/services/tola.service';

@Component({
  selector: 'app-corps-accueil',
  templateUrl: './corps-accueil.component.html',
  styleUrls: ['./corps-accueil.component.css']
})
export class CorpsAccueilComponent implements OnInit {

  utilisateurpublications: any[] | undefined;

  date_de_publication: Date = new Date();

  @Input() utilisateur: IUtilisateur | undefined;

  constructor(
    // private router: Router,
    // private route: ActivatedRoute,
    private tolaService: TolaService
  ) { }

  recupererUtilisateurPublications() {
    this.tolaService.getUtilisateurPublications().subscribe(
      (donnees: any) => {
        
        this.utilisateurpublications = donnees;
        console.log('recupererUtilisateurPublications', this.utilisateurpublications);
      },
      (erreurs: HttpErrorResponse) => {
        console.log(erreurs);
      }
    );
  }

  ngOnInit(): void {
    this.recupererUtilisateurPublications();
  }

}
