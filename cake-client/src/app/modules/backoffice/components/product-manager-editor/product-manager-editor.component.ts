import { Component, OnInit } from '@angular/core';
import { ProductTypeService } from '../../../core/services/productType.service';
import { ProductType } from '../../../core/models/productType.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductManagerService } from '../../services/product-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, tap, map } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { Product } from '../../../core/models/product.model';
import { BlockUIService } from 'ng-block-ui';
import { of } from 'rxjs';

@Component({
  selector: 'app-product-manager-editor',
  templateUrl: './product-manager-editor.component.html',
  styleUrls: ['./product-manager-editor.component.scss']
})
export class ProductManagerEditorComponent implements OnInit {

  types: ProductType[];

  editProduct: FormGroup;

  product: Product;

  constructor(private productManagerService: ProductManagerService, private productTypeService: ProductTypeService,
    private route: ActivatedRoute, private router: Router, private blockUI: BlockUIService) { }

  ngOnInit(): void {
    this.route.params.subscribe(qp => {
      this.blockUI.start("app-block")
      console.log(qp, qp["id"])
      this.productManagerService.getProduct(qp["id"])
        .pipe(tap(product => {
          this.editProduct = new FormGroup({
            "id": new FormControl({ value: product.id, disabled: true }, [Validators.required]),
            "quantity": new FormControl(product.quantity, [Validators.required]),
            "creationDate": new FormControl(formatDate(new Date(), "yyyy-MM-dd", "en-EN"), [Validators.required]),
          })
          this.product = product;
        }
        ), concatMap(product => {
          return this.productTypeService.getTypes()
        }), tap((types: any) => {
          this.types = types;
          let type = types.find(t => t.id == this.product.type);
          this.editProduct.addControl("type", new FormControl({ value: type.id, disabled: true }));
          this.product.typeDefinition = type;

        })
        ).subscribe(product => {
          this.blockUI.stop("app-block")
        })
    })
  }

  updateProduct() {
    this.product.creationDate = this.editProduct.get('creationDate').value;
    this.product.quantity = this.editProduct.get('quantity').value;
    this.productManagerService.updateProduct(this.product).subscribe(success => this.router.navigate(['backoffice', 'products']))

  }

  deleteProduct() {
    if (confirm("Sei sicuro di voler eliminare questo documento?")) {
      this.productManagerService.deleteProduct(this.product.id).subscribe(success => this.router.navigate(['backoffice', 'products']))
    }

  }
}
