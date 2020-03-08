import { ProductDefault } from '../defaults/product.default';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { GetProduct } from '../actions/product.action';
import { RouterStateParams } from '../app.module';
import { RouterState } from '@ngxs/router-plugin';
import { map, tap } from 'rxjs/operators';
import { ProductService } from '../services';

@State<ProductDefault>({
  name: 'products',
  defaults: {
    products: [],
  },
})
export class ProductState {
  private categoryId: any;
  constructor(private productService: ProductService, private store: Store) {}

  @Selector() static getProductList(state: ProductDefault) {
    return state.products;
  }

  @Action(GetProduct)
  getProducts({ getState, setState }: StateContext<ProductDefault>) {
    this.store
      .select(state => RouterState.state<RouterStateParams>(state.router))
      .subscribe(val => {
        this.categoryId = val.params.id;
      });
    return this.productService.getProducts(this.categoryId).pipe(
      map(products =>
        products.map(val => ({
          ...val,
          price: val.price * 2,
        })),
      ),
      tap(results => {
        const state = getState();
        setState({
          ...state,
          products: results,
        });
      }),
    );
  }
}
