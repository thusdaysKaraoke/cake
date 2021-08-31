import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductType } from '../models/productType.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {
  private endpoint: string;

  constructor(private http: HttpClient) {
    this.endpoint = environment.serviceUrl + "types";
  }



  getTypes(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(this.endpoint);
  }

  getType(id: any): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(this.endpoint + "/" + id);

  }


}

/*
var testProduct: Product = {
  id: "test",
  type: "testType",
  creationDate: new Date(),
  price: 5,
  quantity: 2
}

var testType: ProductType = {
  id: "testType",
  label: "Torta al limone",
  description: "Una buonissima torta al limone",
  ingredients: [{ name: "limone", quantity: 2, measure: "qta" }, { name: "farina", quantity: 400, measure: "gr" }, { name: "zucchero a velo", quantity: 20, measure: "gr" }],
}*/