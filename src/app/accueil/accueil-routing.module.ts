import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { QuestionComponent } from './accueil-composants/entete-composants/question/question.component';
import { RepondreComponent } from './accueil-composants/repondre/repondre.component';



const routes: Routes = [
  // { path: 'accueil/:identifiant', component: AccueilComponent },
  { path: 'repondre', component: RepondreComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'question', component: QuestionComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AccueilRoutingModule { }
