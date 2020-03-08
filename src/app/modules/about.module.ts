import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule.forRoot([{ path: 'about', component: AboutComponent }])],
  declarations: [AboutComponent],
})
export class AboutModule {}
