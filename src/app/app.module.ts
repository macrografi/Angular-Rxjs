import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { ProductsComponent } from './products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductState } from './states/product.state';
import { CategoryState } from './states/category.state';
import { HomeState } from './states/home.state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { Params, RouterModule, RouterStateSnapshot } from '@angular/router';
import { ProductResolver } from './resolvers/product.resolver';
import { CategoryService } from './services/category.service';
import { CarouselService } from './services/carousel.service';
import { NgxsRouterPluginModule, RouterStateSerializer } from '@ngxs/router-plugin';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalComponent } from './modal/modal.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

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
  declarations: [AppComponent, ProductsComponent, ContactComponent, AboutComponent, HomeComponent, ModalComponent, HeaderComponent, FooterComponent],
  imports: [
    NgxsModule.forRoot([HomeState, ProductState, CategoryState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    CollapseModule,
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      {
        path: 'products/:id',
        component: ProductsComponent,
        resolve: { product: ProductResolver },
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ]),
  ],
  entryComponents: [ModalComponent],
  providers: [
    CarouselService,
    CategoryService,
    ProductResolver,
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
