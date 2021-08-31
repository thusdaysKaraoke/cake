import { Component, OnInit } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { CustomerService } from '../../../core/services/customer.service';
import { forkJoin, Observable } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { ProductManagerService } from '../../services/product-manager.service';
import { tap, concatMap, map } from 'rxjs/operators';
import { ProductType } from '../../../core/models/productType.model';
import { ProductTypeService } from '../../../core/services/productType.service';

@Component({
  selector: 'app-product-manager-list',
  templateUrl: './product-manager-list.component.html',
  styleUrls: ['./product-manager-list.component.scss']
})
export class ProductManagerListComponent implements OnInit {

  types: ProductType[];
  products: Product[];
  filterTerm: any;
  sort: any;
  page: any = 0;
  pageSize: any = 10;
  selectedFilter: { key: string, value: any, label: string };

  public sortOptions: any = [
    { key: "creationDate", order: -1, label: "Più Freschi" },
    { key: "currentPrice", order: 1, label: "Più Economici" },
    { key: "currentPrice", order: -1, label: "Più Costosi" },
    { key: "creationDate", order: 1, label: "Sconto" },

  ]

  public filterOptions: any = [
    { key: "all", value: undefined, label: "Visualizza Tutti" },
    { key: "currentPrice", value: "_not_null", label: "In Vendita" },
    { key: "currentPrice", value: "_null", label: "Scaduti" },
    { key: "quantity", value: "_not_null", label: "In Magazzino" },

  ]

  constructor(private productManagerService: ProductManagerService, private productTypeService: ProductTypeService, public router: Router) { }

  ngOnInit(): void {
    this.sort = this.sortOptions[0];
    this.selectedFilter = this.filterOptions[0];

    this.productTypeService.getTypes().pipe(concatMap(types => {
      this.types = types;
      return this.loadProducts();
    })).subscribe(success => console.log("loaded"))

  }

  loadProducts(): Observable<Product[]> {

    return this.productManagerService.getProducts().pipe(map(products => {
      products.map(p => p.typeDefinition = this.types.find(productType => productType.id == p.type));
      return products;
    }), tap(products => this.products = products))

  }


  filterBy(filter: any) {
    this.selectedFilter = filter;
  }

  sortBy(sort: any) {
    this.sort = sort;

  }
} 
