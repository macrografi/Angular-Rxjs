import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../modal/modal.component';
import { tap } from 'rxjs/operators';
import { ProductState } from '../states';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  constructor(private modalService: BsModalService) {}
  private bsModalRef: BsModalRef;
  private productCategory = 'test';
  private selectedProduct: false;

  @Select(ProductState.getProductList) products$;
  /*  @Select(CategoryState.getCategoryList) categories$;*/
  /*  productWithCategory$ = combineLatest([this.products$, this.categories$]).pipe(
    map(([products, categories]) =>
      products.map(val => ({
        ...val,
        price: val.price * 5,
        category: categories.find(c => val.categoryId === c.id).name,
      })),
    ),
  );*/
  productCategory$ = this.products$
    .pipe(
      tap(value => {
        // @ts-ignore
        value.filter(val => {
          this.productCategory = val.productName;
        });
      }),
    )
    .subscribe();

  openModal(item) {
    const initialState = {
      title: item.productName + ' #' + item.id,
      images: item.imageUrl,
      closeBtnName: 'Close',
    };
    this.bsModalRef = this.modalService.show(ModalComponent, { initialState });
  }
  clickFavorite(product) {
    this.selectedProduct = product;
    console.log('clicked!');
  }
}
