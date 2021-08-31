import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductManagerCreatorComponent } from './product-manager-creator.component';

describe('ProductManagerCreatorComponent', () => {
  let component: ProductManagerCreatorComponent;
  let fixture: ComponentFixture<ProductManagerCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductManagerCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductManagerCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
