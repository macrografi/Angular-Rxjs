import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AboutModule, ContactModule, HomeModule, ProductsModule } from './modules';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule, RouterStateSerializer } from '@ngxs/router-plugin';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap';
import { Params, RouterModule, RouterStateSnapshot } from '@angular/router';
import { CategoryService } from './services';
import { ModalComponent } from './modal/modal.component';
import { FooterComponent, HeaderComponent } from './shared';
import { CategoryState, HomeState, ProductState } from './states';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { HttpClientModule } from '@angular/common/http';

export interface RouterStateParams {
  url: string;
  params: Params;
  queryParams: Params;
}
export class CustomRouterStateSerializer implements RouterStateSerializer<RouterStateParams> {
  serialize(routerState: RouterStateSnapshot): RouterStateParams {
    const {
      url,
      root: { queryParams },
    } = routerState;

    let { root: route } = routerState;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const { params } = route;
    return { url, params, queryParams };
  }
}

@NgModule({
  imports: [
    NgxsModule.forRoot([HomeState, ProductState, CategoryState]),
    HomeModule,
    AboutModule,
    ProductsModule,
    ContactModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({
      key: ['auth.token ', 'auth.email ', 'auth.name '],
    }),
    BrowserModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    CollapseModule,
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ]),
    HttpClientModule,
  ],
  declarations: [AppComponent, ModalComponent, HeaderComponent, FooterComponent],
  entryComponents: [ModalComponent],
  providers: [CategoryService, { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }],
  bootstrap: [AppComponent],
})
export class AppModule {}
