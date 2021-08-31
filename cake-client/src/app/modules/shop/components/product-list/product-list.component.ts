import { Component, OnInit } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { CustomerService } from '../../../core/services/customer.service';
import { Router } from '@angular/router';
import { BlockUIService } from 'ng-block-ui';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public products: Product[];
  public filterTerm: string;
  public sort: SortOption;
  public sortOptions: SortOption[] = [
    { key: "creationDate", order: -1, label: "Più Freschi" },
    { key: "currentPrice", order: 1, label: "Più Economici" },
    { key: "currentPrice", order: -1, label: "Più Costosi" },
    { key: "creationDate", order: 1, label: "Sconto" },

  ]

  constructor(public customerService: CustomerService, public router: Router, private uiBlock: BlockUIService) { }

  ngOnInit(): void {
    this.uiBlock.start("app-block");
    this.customerService.getProducts().subscribe(products => {
      this.products = products;
      this.uiBlock.stop("app-block");
    })
    this.sort = this.sortOptions[0]
  }

  addToChart(id: string) {
    this.customerService.addToChart(id).subscribe(s => { })
  }

  sortBy(sortOption: SortOption) {
    this.sort = sortOption;
  }




}

class SortOption {
  key: string;
  order: number;
  label: string;
}
