import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurgerOrderOrderComponent } from './burger-order-order.component';

describe('BurgerComponent', () => {
  let component: BurgerOrderOrderComponent;
  let fixture: ComponentFixture<BurgerOrderOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BurgerOrderOrderComponent]
    });
    fixture = TestBed.createComponent(BurgerOrderOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
