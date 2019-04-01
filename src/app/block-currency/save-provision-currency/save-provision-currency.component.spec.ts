import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveProvisionCurrencyComponent } from './save-provision-currency.component';

describe('SaveProvisionCurrencyComponent', () => {
  let component: SaveProvisionCurrencyComponent;
  let fixture: ComponentFixture<SaveProvisionCurrencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveProvisionCurrencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveProvisionCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
