import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private _http:HttpClient) { }

getAllProducts():Observable<any>{
return this._http.get('https://fakestoreapi.com/products')
}

getAllCategories():Observable<any>{
  return this._http.get('https://fakestoreapi.com/products/categories')
  }
  getProductsByCategory(keyword:any):Observable<any>{
    return this._http.get(`https://fakestoreapi.com/products/category/${keyword}`)
    }
    getProductsById(id:any):Observable<any>{
      return this._http.get(`https://fakestoreapi.com/products/${id}`)
      }

}
 