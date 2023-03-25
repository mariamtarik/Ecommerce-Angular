import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './componants/cart/cart.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,FormsModule
  ]
})
export class CartsModule { }
