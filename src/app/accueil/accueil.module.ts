import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';


import { AccueilRoutingModule } from './accueil-routing.module';
import { AccueilComponent } from './accueil/accueil.component';
import { RouterModule } from '@angular/router';
import { EnteteComponent } from './accueil-composants/entete/entete.component';
import { CorpsAccueilComponent } from './accueil-composants/corps-accueil/corps-accueil.component';
import { MenuAccueilComponent } from './accueil-composants/menu-accueil/menu-accueil.component';
import { QuestionComponent } from './accueil-composants/entete-composants/question/question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AccueilComponent,
    EnteteComponent,
    CorpsAccueilComponent,
    MenuAccueilComponent,
    QuestionComponent
  ],
  imports: [
    CommonModule, // ngif ngfor
    FormsModule,
    ReactiveFormsModule, // pour formGroup
    MatIconModule,
    RouterModule,
    AccueilRoutingModule, // forChild

  ]
})
export class AccueilModule{ }
