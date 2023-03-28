import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IQuestion } from 'src/app/shared/models/question';
import { IReponse } from 'src/app/shared/models/reponse';
import { IUtilisateur } from 'src/app/shared/models/utilisateur';
import { TolaService } from 'src/app/shared/services/tola.service';
import { ListeReponseComponent } from '../liste-reponse/liste-reponse.component';
import { PageReponseComponent } from '../page-reponse/page-reponse.component';

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
    private tolaService: TolaService,
    public dialog: MatDialog // poppup
  ) { }

  openDialogPageReponse(question: IQuestion) {

    const dialogRef = this.dialog.open(PageReponseComponent, {
      width:'65%',
      height:'70%',
        enterAnimationDuration:'1000ms',
        exitAnimationDuration:'2000ms',
        data: {
           question
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openListeReponse(reponses: any[]) {

    const dialogRef = this.dialog.open(ListeReponseComponent, {
      width:'65%',
      height:'70%',
        enterAnimationDuration:'1000ms',
        exitAnimationDuration:'2000ms',
        data: {
           reponses
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

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
