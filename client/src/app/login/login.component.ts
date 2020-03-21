import { Component, OnInit, Inject, Renderer2 } from "@angular/core";
import { RequestConfigService } from "../shared/requestConfig.service";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public hide = true;
  public userName: string;
  public password: string;
  constructor(
    private requestConfigService: RequestConfigService,
    private router: Router,
    private renderer: Renderer2,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
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
}
