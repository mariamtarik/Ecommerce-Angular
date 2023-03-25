import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { CartService } from 'src/app/carts/servise/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartCount: number = 0;



isLogin:boolean=false;
  constructor( private _AuthService:AuthService ,private CartService:CartService) { 
    _AuthService.currentUser.subscribe(()=>{
if(_AuthService.currentUser.getValue() != null){
  this.isLogin=true
}else{
  this.isLogin=false

}
    })
  }
  isLogout(){
    this._AuthService.logOut();
  }
   


  ngOnInit(): void {
    this.CartService.getCart().subscribe(cart =>{
      this.cartCount=cart.length;
    })
  
  }

}
