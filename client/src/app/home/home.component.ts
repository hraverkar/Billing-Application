import { Component, OnInit, ChangeDetectionStrategy, Inject } from "@angular/core";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { RequestConfigService } from "../shared/requestConfig.service";
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  public customerName: string;
  public customerAdd: string;
  public customerNum: string;
  public itemName: string;
  public itemQuantity: number;
  public itemPrice: number;
  public totalPrice: number;
  public GSTIN: any;
  public PAN: any;
  public today = new Date();
  

  constructor(public requestService: RequestConfigService, 
    private snackBar: MatSnackBar,
    @Inject(MAT_SNACK_BAR_DATA) public dataSnackBar: any,
    ) {}

  ngOnInit(): void {}

  onCancelClick() {
    this.customerName = null;
    this.customerAdd = null;
    this.customerNum = null;
    this.itemName = null;
    this.itemQuantity = null;
    this.itemPrice = null;
    this.totalPrice = null;
  }

  onPrintClick() {
    let userData = [];
    userData.push({
      customerName: this.customerName,
      customerAdd:this.customerAdd,
      customerNum:this.customerNum,
      itemName:this.itemName,
      itemQuantity:this.itemQuantity,
      itemPrice:this.itemPrice,
      totalPrice : this.itemPrice
    });
    this.requestService.addCustomerInfo(userData).subscribe(this.userStoreResponse.bind(this));
    this.totalPrice = this.itemPrice;
    
    const documentDefinition = this.getDocumentDefinition();
    pdfMake.createPdf(documentDefinition).download(this.today.getTime()+".pdf");
    this.onCancelClick();
  }

  userStoreResponse(response: any) {  
    if(response.status == 201)
      this.snackBar.open(response.body.message, null, this.dataSnackBar.duration);
    else{
      this.snackBar.open(response.body.message, null, this.dataSnackBar.duration);
    }
  }

  setGSTIN() {
    return this.requestService.getGSTIN();
  }

  setPAN() {
    return this.requestService.getPAN();
  }

  getDocumentDefinition() {
    let  tdate = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate();
    return {
      content: [
        {
          text: "Tax Invoice"
        },
        {
          text: "TextError Technologies",
          bold: true,
          fontSize: 20,
          alignment: "center",
          margin: [0, 0, 0, 20]
        },
        {
          text:
            "773,17th B Cross JP Nagar 6th Phase Bangalore, Karnataka - 560078",
          bold: true,
          fontSize: 12,
          alignment: "center",
          margin: [0, 0, 0, 20]
        },
        {
          text:"Bill To",
          bold:true,
          fontSize:12
        },
        {
          margin: [0, 0, 0, 20],
          columns: [
            [
              {
                text: "Customer Name : " + this.customerName
              },

              {
                text: "Customer Address : " + this.customerAdd
              },

              {
                text: "Contant No : " + this.customerNum
              }
            ],
            [
              {
                text: "Date : " + tdate,
                alignment: "right",
              },
              {
                text: "Bill No : " +this.today.getTime(),
                alignment: "right",
              },
              {
                text: "PAN : " + "BVSPR9231E",
                alignment: "right",
              },
              {
                text: "GSTIN : " + "ABCDE12345",
                alignment: "right",
              }
              //this.getProfilePicObject()
            ]
          ]
        },
        {
          margin: [0, 0, 0, 20],
          columns: [[this.iteminformation()]]
        },
        {
          columns: [
            [
              {
                text: "Total Price : " + this.totalPrice,
                style: "header"
              },
              {
                text: "All Values are in INR",
                style: "header"
              }
            ]
          ]
        },
        {
          columns: [
            [
              {
                text: "Signature : ",
                style: "sign"
              },
              {
                text: "Harshal Raverkar",
                style: "sign"
              }
            ]
          ]
        },
        {
          columns: [
            [
              {
                text: "Declaration",
                bold:true
              },
              {
                text:"The goods sold are intended for end user consumption and not for resale."
              }
            ]
          ]
        }
      ],
      styles: {
        header: {
          fontSize: 14,
          bold: true,
          alignment: "right",
          decoration: "underline"
        },
        name: {
          fontSize: 16,
          bold: true
        },
        jobTitle: {
          fontSize: 14,
          bold: true,
          italics: true
        },
        sign: {
          margin: [0, 20, 0, 0],
          alignment: "right",
          italics: true,
          fontSize: 14,
          bold: true,
          decoration: "underline"
        },
        tableHeader: {
          bold: true
        },
        tableSpace: {
          fontSize: 18,
          margin: [20, 0, 0, 20]
        }
      }
    };
  }

  iteminformation() {
    return {
      table: {
        widths: ["*", "*", "*"],
        body: [
          [
            {
              text: "Name & Description",
              style: "tableHeader"
            },
            {
              text: "Quantity",
              style: "tableHeader"
            },
            {
              text: "Price",
              style: "tableHeader"
            }
          ],
          [this.itemName, this.itemQuantity, this.itemPrice]
        ]
      }
    };
  }
}
