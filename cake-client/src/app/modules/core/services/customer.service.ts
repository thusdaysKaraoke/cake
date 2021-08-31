import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductType } from '../models/productType.model';
import { BlockUIService } from 'ng-block-ui';
import { forkJoin, Observable, concat, of, from } from 'rxjs';
import { tap, concatMap, find, filter, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProductTypeService } from './productType.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  public products: Product[];

  public chart: Array<{ id: any, quantity: number }>;

  private endpoint: string;

  constructor(private productTypeService: ProductTypeService, private uiBlock: BlockUIService, private http: HttpClient) {
    this.chart = [];
    this.endpoint = environment.serviceUrl + "products/customer";
  }

  getProducts(): Observable<Product[]> {

    if (this.products) {
      return of(this.products);
    }

    this.uiBlock.start("app-block")

    return forkJoin(
      this.downloadProducts(),
      this.productTypeService.getTypes()
    ).pipe(map((p: any) => {
      let products = p[0];
      let types = p[1];
      products.map(product => product.typeDefinition = types.find(type => type.id == product.type));
      products.filter(p => !!p.typeDefinition);
      this.products = products;
      this.uiBlock.stop("app-block");
      return products;
    }));


  }

  getProduct(id: any): Observable<Product> {

    return this.getProducts().pipe(map(products => {
      return products.find(p => p.id == id)
    }));

  }



  downloadProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.endpoint);
  }



  addToChart(productId: any, quantity = 1): any {

    return this.getProduct(productId).pipe(map(product => {

      if (!product || product.quantity < quantity) {
        alert("Prodotto non disponibile");
        return this.chart;
      }

      product.quantity -= quantity;

      let chartProduct = this.getFromChart(productId);

      if (!chartProduct) {
        this.chart.push({ id: productId, quantity: quantity })
      } else {
        chartProduct.quantity += quantity;
      }

      return this.chart;

    }))

  }

  removeFromChart(id: any, quantity: number = 1) {
    let chartProduct = this.getFromChart(id);
    chartProduct.quantity -= quantity;

    return this.getProduct(id).pipe(map(product => {
      product.quantity += quantity;

      if (chartProduct.quantity == 0) {
        this.chart = this.chart.filter(p => p.id != id);
      }

      return this.chart
    }))

  }

  getFromChart(id: any): any {
    return this.chart.find(p => p.id == id)
  }
}
