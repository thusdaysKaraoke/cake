import { Injectable } from '@angular/core';
import { Product } from '../../core/models/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductManagerService {

  private endpoint: string;

  constructor(private http: HttpClient) {
    this.endpoint = environment.serviceUrl + "products/manager";
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(this.endpoint + "/" + id);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.endpoint);
  }

  newProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.endpoint, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.endpoint + "/" + product.id, product);
  }

  deleteProduct(productId: any): Observable<any> {
    return this.http.delete<any>(this.endpoint + "/" + productId);
  }
}
