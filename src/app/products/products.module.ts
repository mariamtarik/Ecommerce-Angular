import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './componants/all-product/all-product.component';
import { ProductsDetailComponent } from './componants/products-detail/products-detail.component';
import { Product1Component } from './componants/product1/product1.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SelectComponent } from '../shared/componants/select/select.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './componants/home/home.component';
import { RatingComponentComponent } from './componants/rating-component/rating-component.component';
import { ProductCateComponent } from './componants/product-cate/product-cate.component';





@NgModule({
  declarations: [
    AllProductsComponent,
    ProductsDetailComponent,
    Product1Component,SpinnerComponent,SelectComponent, HomeComponent, RatingComponentComponent, ProductCateComponent
  ],
  imports: [
    CommonModule,FormsModule,AppRoutingModule
  ]
})
export class ProductsModule { }
