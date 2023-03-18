import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IUtilisateur } from 'src/app/shared/models/utilisateur';
import { QuestionComponent } from '../entete-composants/question/question.component';

@Component({
  selector: 'app-entete',
  templateUrl: './entete.component.html',
  styleUrls: ['./entete.component.css']
})
export class EnteteComponent {

  @Input() utilisateur: IUtilisateur | undefined;

  constructor(
    private router: Router,
    public dialog: MatDialog // poppup
  ) { }

  openDialogQuestion(utilisateur: IUtilisateur) {
    const dialogRef = this.dialog.open(QuestionComponent, {
      width:'65%',
      height:'70%',
        enterAnimationDuration:'1000ms',
        exitAnimationDuration:'2000ms',
        data: {
          utilisateur
        }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  goToRepondre(utilisateur: IUtilisateur) {
    this.router.navigate(['repondre'],
    {
      queryParams: {
        connexion: ""+utilisateur.idutilisateur
      }
    });
  }

}
