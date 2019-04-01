import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProvisionCurrencyComponent } from './list-provision-currency.component';

describe('ListProvisionCurrencyComponent', () => {
  let component: ListProvisionCurrencyComponent;
  let fixture: ComponentFixture<ListProvisionCurrencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProvisionCurrencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProvisionCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
