import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carousel } from '../model/carousel';

@Injectable({
  providedIn: 'root',
})
export class CarouselService {
  private bannerUrl = `${environment.banner}/data.json`;
  constructor(private http: HttpClient) {}

  getBanners(): Observable<Carousel[]> {
    return this.http.get<Carousel[]>(this.bannerUrl);
  }
}
