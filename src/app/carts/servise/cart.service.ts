import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  constructor( private http:HttpClient) { 
   
    let cart:any = JSON.parse(localStorage.getItem('cart')!) ||[]


    this.cartSubject.next(cart);
    console.log(this.cartSubject.value);
  }
  getCart() {
    return this.cartSubject.asObservable();
  }
  addToCart(item: any) {
    // this.localStorageService.set('cart', item);
    localStorage.setItem("cart",JSON.stringify(item))

    this.cartSubject.next(item);
  }
  createNewCart(model:any){
  return this.http.post(`https://fakestoreapi.com/carts`,model)
  }
}
