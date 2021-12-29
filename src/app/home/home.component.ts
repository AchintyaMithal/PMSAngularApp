import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  userDetails: any;

  constructor(private router: Router, private service: UserService) { }

  ngOnInit() {
    console.log("User verified by authorization api")
    document.body.className = "sel";
  }
  userId= localStorage.getItem("portfolioId")
  customerName= localStorage.getItem("customerName")

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  onGetNetWorth(){
    this.router.navigateByUrl('/portfolio')
  }
}
