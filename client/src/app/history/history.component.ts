import { Component, OnInit, Inject } from "@angular/core";
import { RequestConfigService } from "../shared/requestConfig.service";
import { MatSnackBar, MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.css"]
})
export class HistoryComponent implements OnInit {
  public customerName: string;
  public customerAddress: string;
  public customerNumber: string;
  public dataSource:any;
  public isShow = false;
  constructor(
    public requestService: RequestConfigService,
    private snackBar: MatSnackBar,
    @Inject(MAT_SNACK_BAR_DATA) public dataSnackBar: any
  ) {}
  displayedColumns = [
    "customername",
    "customeraddress",
    "customernumber",
    "itemname",
    "itemquantity",
    "itemprice",
    "totalprice"
  ];

  //dataSource = ELEMENT_DATA;

  ngOnInit(): void {}

  onCancelClick() {
    this.dataSource=[];
    this.isShow = !this.isShow;
    this.customerName = null;
    this.customerAddress = null;
    this.customerNumber = null;
  }

  onSearchClick(enterPressed: boolean) {
    try {
      this.isShow = true;
      this.customerName = this.customerName.trim();
      if (enterPressed && this.customerName.length === 0) {
        return;
      } else if (/^[\W_]+$/.test(this.customerName)) {
        this.snackBar.open(
          "Search pattern is incorrect.Please input proper pattern.",
          null,
          this.dataSnackBar.duration
        );
        return;
      }

      let queryConditions = [];
      let query = "";
      if (this.customerName.length > 0) {
        queryConditions.push("customername=" + this.customerName);
      }
      if (this.customerAddress != null) {
        queryConditions.push("customeraddress=" + this.customerAddress);
      }
      if (this.customerNumber != null) {
        queryConditions.push("customernumber=" + this.customerNumber);
      }
      if (queryConditions.length === 0) {
        return;
      }
      /** Dynamic query generation loop */
      for (let i = 0; i < queryConditions.length; i++) {
        if (i === 0) {
          query = query + queryConditions[i];
        } else {
          query = query + "&" + queryConditions[i];
        }
      }
      this.requestService
        .getCustomerInfo(query)
        .subscribe(this.searchResult.bind(this));
    } catch (error) {
      console.log(
        error,
        "videoSearch error , searchComponent",
        "video searching using input values"
      );
    }
  }

  searchResult(response: any) {
    this.dataSource = response;
  }
}
