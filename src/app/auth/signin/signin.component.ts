import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor( private _AuthService:AuthService,private _Router:Router) { }
error=""

  ngOnInit(): void {
  }
  loginForm:FormGroup =new FormGroup({
    'email':new FormControl(null,[Validators.required,Validators.email]),
    'password':new FormControl(null,[Validators.required,Validators.pattern('^[A-Z][a-z0-9]{3,8}$')]),
  })
  login(){
    if(this.loginForm.invalid){
      return;
    }
    this._AuthService.signIn(this.loginForm.value).subscribe((data)=>{
      if(data.message=='signin success'){
       localStorage.setItem('userToken',`Bearer ${data.token}`)
       this._AuthService.saveCurentUser();
        this._Router.navigate(['/cart'])
      }
      else{
    this.error=data.message;
    this.loginForm.reset();
      }
    })
    
  }

}
