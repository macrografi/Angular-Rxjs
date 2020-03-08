import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from '../products/products.component';
import { RouterModule } from '@angular/router';
import { ProductResolver } from '../resolvers/product.resolver';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'products/:id',
        component: ProductsComponent,
        resolve: { product: ProductResolver },
      },
    ]),
  ],
  providers: [ProductResolver],
  declarations: [ProductsComponent],
})
export class ProductsModule {}
