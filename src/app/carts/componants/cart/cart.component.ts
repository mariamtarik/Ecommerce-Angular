import { Component, OnInit } from '@angular/core';
import { CartService } from '../../servise/cart.service';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


constructor(private _CartService:CartService) { }
  cartProducts:any[]=[];
  success:boolean=false;
  total:any=0;
  decodedToken:{id:string,role:string,iat:string}={id:"",role:"",iat:""}

  ngOnInit(): void {
    this.getCartProducts();
  }
  getCartProducts(){
    // if("cart" in this.localStorageService){
      this._CartService.getCart().subscribe(cart => {
        // console.log(cart)
        this.cartProducts = cart;
        console.log(this.cartProducts)
        this.getCartTotal();
      });
      
    // }
    // console.log(this.cartProducts);
    
  }
  getCartTotal(){
this.total=0;
for(let i=0;i<this.cartProducts.length;i++){
  this.total+=this.cartProducts[i].item.price * this.cartProducts[i].quantity
}
  }
  minsAmount(index:number){
this.cartProducts[index].quantity--;
this.getCartTotal();
this._CartService.addToCart(this.cartProducts)
// localStorage.setItem("cart",JSON.stringify(this.cartProducts))
  }
  addAmount(index:number){
    this.cartProducts[index].quantity++;
    this.getCartTotal();
    // localStorage.setItem("cart",JSON.stringify(this.cartProducts))
this._CartService.addToCart(this.cartProducts)


  }
  detectChange(){
    this.getCartTotal();
    // localStorage.setItem("cart",JSON.stringify(this.cartProducts))
this._CartService.addToCart(this.cartProducts)


  }
  deleteProduct(index:number){
this.cartProducts.splice(index,1);
this.getCartTotal();
// localStorage.setItem("cart",JSON.stringify(this.cartProducts))
this._CartService.addToCart(this.cartProducts)


  }
  clearCart(){
    this.cartProducts=[];
    this.getCartTotal();
    // localStorage.setItem("cart",JSON.stringify(this.cartProducts))
this._CartService.addToCart(this.cartProducts)


  }
  addCart(){
    let products=this.cartProducts.map(item =>{
      return {productId:item.item.id,quantity:item.quantity}
    })
    let token=localStorage.getItem("userToken");
    // console.log(token?.split(" ")[1]);
    let token1=token?.split(" ")[1]
    this.decodedToken = jwt_decode(token1!);
    // console.log(this.decodedToken["id"])
    let Model={
      userId:this.decodedToken["id"],
      data:new Date(),
      products:products
    }
    this._CartService.createNewCart(Model).subscribe(res=>{
      this.success=true;
    })
  }


}
