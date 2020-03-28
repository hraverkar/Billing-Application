import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar, MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RequestConfigService {
  public host='http://localhost:7272';
  constructor(
    private httpClient: HttpClient,
    public snackBar: MatSnackBar,
    @Inject(MAT_SNACK_BAR_DATA) public dataSnackBar: any,
  ) {
  }

  checkUserLogin(userName: string, pass: string): Observable<any> {
    return this.httpClient.post<any>(this.host + "/unprotected/login", {
      username: userName,
      password: pass
    });
  }
  // add user group combo - assign userGroupCombo
  addCustomerInfo(newEntries:any) {
    return this.httpClient.post(
      this.host + "/protected/customer",
      { newEntries },
      { observe: "response" }
    );
  }

  getCustomerInfo(query?: string) {
    return this.httpClient.get(this.host + '/protected/customer?' + query);
  }

  getGSTIN() {
    return this.httpClient.get(this.host + '/protected/gstIN');
  }

  getPAN() {
    return this.httpClient.get(this.host + '/protected/pan');
  }
}
