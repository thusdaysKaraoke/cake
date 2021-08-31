import { Component, OnInit } from '@angular/core';
import { ProductType } from '../../../core/models/productType.model';
import { ProductManagerService } from '../../services/product-manager.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../../core/models/product.model';
import { formatDate } from '@angular/common';
import { ProductTypeService } from '../../../core/services/productType.service';

@Component({
  selector: 'app-product-manager-creator',
  templateUrl: './product-manager-creator.component.html',
  styleUrls: ['./product-manager-creator.component.scss']
})
export class ProductManagerCreatorComponent implements OnInit {

  types: ProductType[];

  newProduct: FormGroup;

  constructor(private productTypeService: ProductTypeService, private productManagerService: ProductManagerService, protected router: Router) { }

  ngOnInit(): void {
    this.productTypeService.getTypes().subscribe(types => this.types = types);
    this.newProduct = new FormGroup({
      "type": new FormControl(undefined, [Validators.required]),
      "quantity": new FormControl(undefined, [Validators.required]),
      "creationDate": new FormControl(formatDate(new Date(), "yyyy-MM-dd", "en-EN"), [Validators.required])
    })
  }

  createProduct() {
    let product = new Product();
    product.type = Number.parseInt(this.newProduct.controls["type"].value);
    product.quantity = this.newProduct.controls["quantity"].value;
    product.creationDate = this.newProduct.controls["creationDate"].value;

    this.productManagerService.newProduct(product).subscribe(success => this.router.navigate(['backoffice', 'products']))
  }
}
