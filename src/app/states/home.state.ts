import { Action, Selector, State, StateContext } from '@ngxs/store';

import { CarouselDefault } from '../defaults/carousel.default';
import { GetCarousel } from '../actions/carousel.action';
import { tap } from 'rxjs/operators';
import { CarouselService } from '../services';

@State<CarouselDefault>({
  name: 'carousels',
  defaults: {
    carousels: [],
  },
})
export class HomeState {
  constructor(private carouselService: CarouselService) {}

  @Selector() static getBannerList(state: CarouselDefault) {
    return state.carousels;
  }

  @Action(GetCarousel)
  getCarousels({ getState, setState }: StateContext<CarouselDefault>) {
    return this.carouselService.getBanners().pipe(
      tap(results => {
        const state = getState();
        setState({
          ...state,
          carousels: results,
        });
      }),
    );
  }
}
