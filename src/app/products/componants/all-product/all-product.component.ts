import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../servise/product.service';
import { CartService } from 'src/app/carts/servise/cart.service';


@Component({
  selector: 'app-all-products',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.scss']
})
export class AllProductsComponent implements OnInit {
products:Product[]=[];
filteredData:Product[]=[];
categoris:string[]=[];
loading:boolean=false;
cartProduct:any[]=[];
checkLocal:boolean=false;
existProduct:boolean=false;
  constructor(private _servise:ProductsService,private _CartService:CartService) { }
 

  getProducts(){
    this.loading=true;
    this._servise.getAllProducts().subscribe((res)=>{
      this.products=res;
      // this.filteredData=res;
      console.log(this.products)
      // console.log(this.filteredData)
      this.loading=false;
    })
    
  }
  search(event:any){
    let searchKey=event.target.value; 
    if(searchKey!==null){
      // this.getProducts()
      this.filteredData = this.products.filter((product)=>product.title.toLocaleLowerCase().includes(searchKey.toLowerCase()))
    }else{
      this.filteredData = [];
    }

  }
 
  getcategories(){
    this.loading=true;
    this._servise.getAllCategories().subscribe((res)=>{
      this.categoris=res;
      this.loading=false;
      console.log(this.categoris)
  },err =>{
    this.loading=false;
    console.log(err);
  })
    
  }
  filterCategory(event:any){
let value=event.target.value;
if(value=="all"){
  this.getProducts();
}else{
  this.getProdustCategory(value);
}
  }
  getProdustCategory(keyword:string){
    this.loading=true;
    this._servise.getProductsByCategory(keyword).subscribe((res)=>{
this.products=res;
this.loading=false;
    })
  }
  ngOnInit(): void {
    this.getProducts();
    this.getcategories();
    
  }
  checklocalStorage(){
    this._CartService.getCart().subscribe(cart =>{
      if(cart.length > 0){
        this.checkLocal=true
      }
    })
  }
  addToCart(event:any){
    this.checklocalStorage()
    if(this.checkLocal){
      this.cartProduct=JSON.parse(localStorage.getItem('cart')!)
      console.log(this.cartProduct)
      let exist=this.cartProduct.find(item=>item.item.id==event.item.id)
if(exist){
 alert("this Product already exists in your cart")
}else{
  this.cartProduct.push(event);
  // localStorage.setItem("cart",JSON.stringify(this.cartProduct))
  this._CartService.addToCart(this.cartProduct);
}  
    }else{
      this.cartProduct.push(event);
      // localStorage.setItem("cart",JSON.stringify(this.cartProduct))
  this._CartService.addToCart(this.cartProduct);
     

    }

// console.log(event)
  }

}

