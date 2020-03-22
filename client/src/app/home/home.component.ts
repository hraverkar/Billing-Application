import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public customerName:string;
  public customerAdd:string;
  public customerNum:string;
  public itemName:string;
  public itemQuantity:number;
  public itemPrice:number;
  public totalPrice:number;
  constructor() { }

  ngOnInit(): void {
  }

  onCancelClick(){
    this.customerName=null;
    this.customerAdd = null;
    this.customerNum = null;
    this.itemName = null;
    this.itemQuantity = null;
    this.itemPrice = null;
    this.totalPrice = null;
  }

  onPrintClick(){
    console.log("Hello Harhsl Raverkar")
  }

}
