import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AccueilModule } from './accueil/accueil.module';

// date en françcais
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ConnexionComponent } from './connexion/connexion.component';
import { ErreurComponent } from './erreur/erreur.component';
import { InscriptionComponent } from './inscription/inscription/inscription.component';
import { VerificationComponent } from './inscription/verification/verification.component';
import { ThemeComponent } from './inscription/theme/theme.component';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    ErreurComponent,
    InscriptionComponent,
    VerificationComponent,
    ThemeComponent
  ],
  imports: [
    CommonModule, // ngif ngfor
    FormsModule,
    ReactiveFormsModule, // pour formGroup
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule, // pour le backend
    MatDialogModule, // popup

    AccueilModule,
    AppRoutingModule // forRoot
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "fr-FR" } // configurer la langue utilisée dans une application
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
