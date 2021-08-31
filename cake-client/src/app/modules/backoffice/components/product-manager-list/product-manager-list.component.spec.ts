import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductManagerListComponent } from './product-manager-list.component';

describe('ProductManagerListComponent', () => {
  let component: ProductManagerListComponent;
  let fixture: ComponentFixture<ProductManagerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductManagerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductManagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
