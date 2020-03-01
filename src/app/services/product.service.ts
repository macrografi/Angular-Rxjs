import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(postId: string): Observable<Product[]> {
    const endpoint = `${environment.product}/category-`;
    return this.http.get<Product[]>(`${endpoint}${postId}.json`);
  }
}
