import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-aleartdialog',
  templateUrl: './aleartdialog.component.html',
  styleUrls: ['./aleartdialog.component.css']
})
export class AleartdialogComponent implements OnInit {
  message:any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.message = data; }
  ngOnInit(): void {
  }

}
