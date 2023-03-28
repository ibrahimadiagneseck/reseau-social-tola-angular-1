import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TolaService } from 'src/app/shared/services/tola.service';

@Component({
  selector: 'app-liste-reponse',
  templateUrl: './liste-reponse.component.html',
  styleUrls: ['./liste-reponse.component.css']
})
export class ListeReponseComponent {

  reponses: any[] | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any// recuperer les donnees du bouton popup
  ) { }


  ngOnInit(): void {
    this.reponses = this.data.reponses;
  }

}
