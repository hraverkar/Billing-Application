import { Component, OnInit, Inject, Renderer2, ViewEncapsulation } from "@angular/core";
import { RequestConfigService } from "../shared/requestConfig.service";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AleartdialogComponent } from '../aleartdialog/aleartdialog.component';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  encapsulation: ViewEncapsulation.None,
  providers: [MatDialog]
})
export class LoginComponent implements OnInit {
  public hide = true;
  public userName: string;
  public password: string;
  message = {
    'title' : "TextError Technologies",
    'address' : "Bengaluru",
    'desingBy': "Design By : Harshal Raverkar"
    }
    
  constructor(
    private requestConfigService: RequestConfigService,
    private router: Router,
    private renderer: Renderer2,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<AleartdialogComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public dataSnackBar: any
  ) {}

  ngOnInit(): void {}

  onLoginClick() {
    try {
      this.requestConfigService
        .checkUserLogin(this.userName.toLowerCase(), this.password)
        .subscribe(this.handleUser.bind(this));
    } catch (error) {
      console.log(error);
    }
  }
  redirectUrl = "home";
  queryParameters = {};
  handleUser(res: any) {
    if (res.message === "OK") {
      // authorized user response:
      this.router.navigate([this.redirectUrl], {
        queryParams: this.queryParameters
      });
    } else {
      // unauthorized user response:
      this.snackBar.open(res.message, null, this.dataSnackBar.duration);
    }
  }

  onCancelClick() {
    this.userName = null;
    this.password = null;
  }

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
