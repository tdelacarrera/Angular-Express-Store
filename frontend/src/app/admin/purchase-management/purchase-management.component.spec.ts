import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseManagementComponent } from './purchase-management.component';

describe('PurchaseComponent', () => {
  let component: PurchaseManagementComponent;
  let fixture: ComponentFixture<PurchaseManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
