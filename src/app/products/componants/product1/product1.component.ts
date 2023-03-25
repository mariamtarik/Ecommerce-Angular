import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Product } from '../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product1',
  templateUrl: './product1.component.html',
  styleUrls: ['./product1.component.scss']
})
export class Product1Component implements OnInit {
@Input() data!:Product
@Output() item =new EventEmitter();
addButton:boolean=false;
amount:number=0;
  constructor( private _Router:Router) { }

  ngOnInit(): void {
  }

add(){
  if(!("userToken" in localStorage)){
this._Router.navigate(["/signin"])
  }else{
    this.item.emit({item:this.data,quantity:this.amount})

  }
}


}
