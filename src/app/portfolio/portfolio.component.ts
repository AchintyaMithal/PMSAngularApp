import { Component, OnInit } from '@angular/core';
import { UserService } from './../shared/user.service';
import { Router } from '@angular/router';
import  jwt_decode from 'jwt-decode';
import { PortfolioDetails } from '../shared/portfolio-details.model';
import { StockDetails } from '../shared/stock-details.model';



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
  constructor(private router: Router, private service: UserService) {
   
    
   }

  ngOnInit() {
    document.body.className = "selp";
    this.service.getNetWorth().subscribe(data=>{
      //debugger;
      this.UserData = data;
      //this.Sl = this.UserData.stockList;
      console.log(this.UserData);
      
     })
    /*this.service.getNetWorth().subscribe(
      netWorth=>{ this.netWort = netWorth;},
      portFolioId=>{this.porId = portFolioId},
     
      
      
    );*/
      
     
    
    //var decoded = jwt_decode(tok);
    //var givenName = decoded['sub'];
  }
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }
  
  onSellStock(value:any){
    //alert(value)

    //var str = (<HTMLInputElement>document.getElementById("sellS")).value; 
   // console.log(str);
    
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
    var str = (<HTMLInputElement>document.getElementById("sellM")).value; 
    console.log(str);
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
