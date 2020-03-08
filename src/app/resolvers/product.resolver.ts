import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { GetProduct } from '../actions/product.action';
import { Observable } from 'rxjs';
import { ProductState } from '../states';

@Injectable()
export class ProductResolver implements Resolve<ProductState> {
  constructor(private store: Store) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<ProductState> | Promise<ProductState> | ProductState {
    return this.store.dispatch(new GetProduct());
  }
}
