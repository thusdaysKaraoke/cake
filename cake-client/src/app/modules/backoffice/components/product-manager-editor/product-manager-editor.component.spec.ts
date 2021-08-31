import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductManagerEditorComponent } from './product-manager-editor.component';

describe('ProductManagerEditorComponent', () => {
  let component: ProductManagerEditorComponent;
  let fixture: ComponentFixture<ProductManagerEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductManagerEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductManagerEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
