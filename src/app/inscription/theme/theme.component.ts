import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ITheme } from 'src/app/shared/models/theme';
import { IUtilisateur } from 'src/app/shared/models/utilisateur';
import { TolaService } from 'src/app/shared/services/tola.service';


@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {

  themes: ITheme[] = [];

  utilisateur!: IUtilisateur;

  checkArray!: FormArray;
  public themeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any, // recuperer les donnees du bouton popup
    public dialogRef: MatDialogRef<ThemeComponent>,
    private tolaService: TolaService,
  ) {
    this.themeForm = this.fb.group({
      checkArray: this.fb.array([])
    });
  }

  recupererThemes() {

    this.tolaService.getThemes().subscribe(
      (donnees: ITheme[]) => {
        console.log(donnees);
        this.themes = donnees;
      },
      (erreurs: HttpErrorResponse) => {
        console.log(erreurs);
      }
    );
  }

  ngOnInit(): void {
    this.utilisateur = (this.data) ? this.data.utilisateur : [];

    this.recupererThemes();
  }

  validerTheme(): void {

    if(this.checkArray && this.checkArray.controls) {
      let valeur;
      for (let i = 0; i < this.checkArray.length; i++) {
        if (this.checkArray.controls[i] instanceof FormControl) {
          valeur = this.checkArray.controls[i].value;
          console.log(valeur);
          this.tolaService.AjouterUtilisateurThemeById(this.utilisateur.idutilisateur, valeur).subscribe(
            () => {
              console.log(this.utilisateur.idutilisateur);
            },
            (erreurs: HttpErrorResponse) => {
              console.log(erreurs);
            }
          );
          this.goToConnexion();
        }
      }
    } else {
      this.goToConnexion();
    }
  }


  onCheckboxChange(event: any) {

    this.checkArray = this.themeForm.get('checkArray') as FormArray;

    if (event.target.checked) {
      if (this.checkArray) {
        this.checkArray.push(new FormControl(event.target.value));
        console.log(this.checkArray.value);
      }
    } else {
      const index = this.checkArray.controls
        .findIndex(x => x.value === event.target.value);
      this.checkArray.removeAt(index);
      console.log(this.checkArray.value);
    }
  }

  goToConnexion() {
    this.dialogRef.close();
    this.router.navigate(['connexion']);
  }


}
