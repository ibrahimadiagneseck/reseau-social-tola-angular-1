import { Component, Input, OnInit } from '@angular/core';
import { ITheme } from 'src/app/shared/models/theme';
import { IUtilisateur } from 'src/app/shared/models/utilisateur';

@Component({
  selector: 'app-menu-accueil',
  templateUrl: './menu-accueil.component.html',
  styleUrls: ['./menu-accueil.component.css']
})
export class MenuAccueilComponent  {

  @Input() utilisateur: IUtilisateur | undefined;


}
