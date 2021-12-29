import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import {catchError, map, take} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURI = 'https://authapid.azurewebsites.net/api';
  readonly burl = "https://calculatenetworthapif.azurewebsites.net/api/CalculateNetWorth/netWorth?portFolioId="

  /*formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });*/

 
  

  login(formData: any) {
    console.log("Data being sent to authorisation api");
    return this.http.post(this.BaseURI + '/Authenticate/login', formData);
  }

  getUserProfile() {
    return this.http.get(this.BaseURI + '/UserProfile');
  }
  getNetWorth(){
    console.log("id of the user being sent to getnetworth api..")
     
    var id = localStorage.getItem("portfolioId");
    console.log(id);
    return this.http.get(`${this.burl}${id}`);


  }
  s:any=[];
 sellStocks(s: any){
   
    
    return this.http.post('https://calculatenetworthapif.azurewebsites.net/api/CalculateNetWorth/sellAsset',s);

  }
  sellMutual(s: any){
   
    
    return this.http.post('https://calculatenetworthapif.azurewebsites.net/api/CalculateNetWorth/sellAsset',s);

  }
}

