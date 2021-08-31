import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../../core/services/customer.service';
import { Product } from '../../../core/models/product.model';
import { BlockUIService } from 'ng-block-ui';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public product: Product;

  constructor(private route: ActivatedRoute, public customerService: CustomerService, public router: Router, public blockUI: BlockUIService) { }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.blockUI.start("app-block");
      this.customerService.getProduct(p["id"]).subscribe(p => {

        this.product = p;
        this.blockUI.stop("app-block");

      })
    })
  }

  addToChart() {
    this.customerService.addToChart(this.product.id).subscribe(s => { })
  }

  removeFromChart() {
    this.customerService.removeFromChart(this.product.id).subscribe(s => { })

  }

}
