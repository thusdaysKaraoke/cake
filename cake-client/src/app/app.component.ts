import { Component } from '@angular/core';
import { CustomerService } from './modules/core/services/customer.service';
import { forkJoin } from 'rxjs';
import { BlockUIService, BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cake';
  @BlockUI() blockUI: NgBlockUI;

  constructor(protected uiBlock: BlockUIService) {

  }
}
