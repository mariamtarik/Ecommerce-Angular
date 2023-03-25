import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient , private _Router:Router) { 
if(localStorage.getItem("userToken") != null){
this.saveCurentUser();
}

  }

  currentUser= new BehaviorSubject(null);

  saveCurentUser(){
    let token:any= localStorage.getItem("userToken");
    this.currentUser.next(jwtDecode(token));
    // console.log(this.currentUser);
  }

  signUp(registerData:any):Observable<any>{
    return this.http.post("https://backend-auth-2buk.onrender.com/api/auth/signup",registerData);
  }

  signIn(loginData:any):Observable<any>{
    return this.http.post("https://backend-auth-2buk.onrender.com/api/auth/signin",loginData);
  }
  logOut(){
    this.currentUser.next(null);
    localStorage.removeItem("userToken");
    this._Router.navigate(["/signin"])
  }

}
