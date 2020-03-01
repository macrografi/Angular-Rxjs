import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CategoryService } from '../services/category.service';
import { CategoryDefault } from '../defaults/category.default';
import { GetCategory } from '../actions/category.action';
import { tap } from 'rxjs/operators';

@State<CategoryDefault>({
  name: 'categories',
  defaults: {
    categories: [],
  },
})
export class CategoryState {
  constructor(private categoryService: CategoryService) {}

  @Selector() static getCategoryList(state: CategoryDefault) {
    return state.categories;
  }

  @Action(GetCategory)
  getCategories({ getState, setState }: StateContext<CategoryDefault>) {
    return this.categoryService.getCategories().pipe(
      tap(results => {
        const state = getState();
        setState({
          ...state,
          categories: results,
        });
      }),
    );
  }
}
