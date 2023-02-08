import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { ErreurComponent } from './erreur/erreur.component';

const routes: Routes = [
  // { path: 'theme', component: ThemeComponent }, // a commenter
  { path: 'connexion', component: ConnexionComponent },
  { path: 'erreur', component: ErreurComponent },
  { path: '', redirectTo: 'connexion', pathMatch: 'full' },
  { path: '**', redirectTo: 'erreur', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
