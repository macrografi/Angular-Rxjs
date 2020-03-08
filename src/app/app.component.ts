import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { GetCategory } from './actions/category.action';
import { CategoryState } from './states';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  isCollapsed = true;

  constructor(private store: Store) {}
  @Select(CategoryState.getCategoryList) categories$;

  ngOnInit() {
    return this.store.dispatch(new GetCategory());
  }

  ngOnDestroy(): void {}
}
