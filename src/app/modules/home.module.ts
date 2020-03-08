import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FormsModule } from '@angular/forms';
import { CarouselService } from '../services';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    CarouselModule.forRoot(),
    RouterModule.forRoot([{ path: 'home', component: HomeComponent }]),
  ],
  providers: [CarouselService],
  declarations: [HomeComponent],
})
export class HomeModule {}
