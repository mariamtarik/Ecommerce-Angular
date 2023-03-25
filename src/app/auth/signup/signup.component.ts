import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  error=""
  ngOnInit(): void {
  }
  constructor( private _AuthService:AuthService,private _Router:Router) { }
registerForm:FormGroup=new FormGroup({
  "first_name":new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10),Validators.pattern('^[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{2,10}$')]),
  "last_name":new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10),Validators.pattern('^[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{2,10}$')]),
  "phone":new FormControl(null,[Validators.required,Validators.pattern('^(010|011|012)[0-9]{8}$')]),
  "email":new FormControl(null,[Validators.required,Validators.email]),
  "password":new FormControl(null,[Validators.required,Validators.pattern('^[A-Z][a-z0-9]{3,8}$')])
})

register(){
  console.log(this.registerForm)
  if(this.registerForm.invalid){
    return;
  }
  this._AuthService.signUp(this.registerForm.value).subscribe((data)=>{
    if(data.message=='registerd success'){
  this._Router.navigate(['/signin'])
    }
    else{
  this.error=data.message;
  this.registerForm.reset();
    }
  })

}



  

}
