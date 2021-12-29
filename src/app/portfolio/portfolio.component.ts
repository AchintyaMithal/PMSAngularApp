import { Component, OnInit } from '@angular/core';
import { UserService } from './../shared/user.service';
import { Router } from '@angular/router';
import  jwt_decode from 'jwt-decode';
import { PortfolioDetails } from '../shared/portfolio-details.model';
import { StockDetails } from '../shared/stock-details.model';
import {MatSnackBar, MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';



@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styles: []
})
export class PortfolioComponent implements OnInit {
netWort: any;
porId: any;

dd : any =[];
UserData :any =[];
Sl:any=[];
  constructor(private router: Router, private service: UserService, private _snackBar :MatSnackBar) {
   
    
   }

  ngOnInit() {
    document.body.className = "selp";
    
    this.service.getNetWorth().subscribe(data=>{
      //debugger;
      this.UserData = data;
      //this.Sl = this.UserData.stockList;
      console.log("Got user data and networth from networth api");
      
     })
    ;
  }
  
    
  
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }
  
  onSellStock(value:any){
   alert("selling stock " + value +" and redirecting to home page")
  //  var message = "Selling stock : "+ value +" and" ;
  //  var action = "Ok"
  //  this._snackBar.open(message, action);
    console.log("selling stock :", value); 
    this.Sl={
      assetType: "Stock",
      assetName:value,
      portFolioId : localStorage.getItem("portfolioId")
    }
    this.service.sellStocks(this.Sl).subscribe(data=>{
      //debugger;
      this.dd = data;
      //this.Sl = this.UserData.stockList;
      console.log(this.dd);
      
     })
     this.router.navigateByUrl('/home')
  }
       
  onSellMutualFund(value : any){
    
    alert("selling mutual fund " + value +" and redirecting to home page")
    console.log("selling mutualfund :", value); 
    this.Sl={
      assetType: "MutualFund",
      assetName:value,
      portFolioId : localStorage.getItem("portfolioId")
    }
   // alert("Do you want to sell "{value})
    this.service.sellMutual(this.Sl).subscribe(data=>{
      //debugger;
      this.dd = data;
      //this.Sl = this.UserData.stockList;
      console.log(this.dd);
      
     });
     this.router.navigateByUrl('/home')
    
  }

}
