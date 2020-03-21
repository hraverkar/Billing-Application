import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AleartdialogComponent } from './aleartdialog/aleartdialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MatDialog]
})
export class AppComponent {
  title = 'billing-application';
   message = {
  'title' : "TextError Technologies",
  'address' : "Bengaluru",
  'desingBy': "Design By : Harshal Raverkar"
  }

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<AleartdialogComponent>,
  ){}
  
  onClickfab(){
    let dialogRef = this.dialog.open(AleartdialogComponent, {
      width: '30%',
      height: '30%',
      data: this.message
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
