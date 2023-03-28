import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUtilisateur } from 'src/app/shared/models/utilisateur';
import { TolaService } from 'src/app/shared/services/tola.service';
import { ThemeComponent } from '../theme/theme.component';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  public verificationForm!: FormGroup;

  utilisateurs: IUtilisateur[] = [];
  utilisateur!: IUtilisateur;

  constructor(
    private fb: FormBuilder,
    private tolaService: TolaService,
    public dialogRef: MatDialogRef<VerificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // recuperer les donnees du bouton popup
    public dialog: MatDialog // poppup
  ) { }



  ngOnInit(): void {

    this.utilisateur = this.data.utilisateur;
    console.log('ngOnInit', this.data);

    this.verificationForm = this.fb.group({
      motdepasse: ['',
        [
          Validators.required
        ]
      ]
    });
  }

  // click sur le bouton validation formulaire
  onSubmit(): void {
    console.log('onSubmit', this.verificationForm.value.motdepasse);
    console.log('onSubmit', this.utilisateur.motdepasse);
    if (this.verificationForm.value.motdepasse === this.utilisateur.motdepasse) {
      this.dialogRef.close();
      this.openDialogTheme(this.utilisateur);
    }
  }

  fermerPopup(): void {
    this.dialogRef.close();
  }

  openDialogTheme(utilisateur: IUtilisateur) {
    const dialogRef = this.dialog.open(ThemeComponent, {
      height:'95%',
      width:'90%',
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
}
