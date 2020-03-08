import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { GetCarousel } from '../actions/carousel.action';
import { HomeState } from '../states';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private store: Store) {}

  @Select(HomeState.getBannerList) carousels$;

  ngOnInit() {
    return this.store.dispatch(new GetCarousel());
  }
  ngOnDestroy(): void {}
}
