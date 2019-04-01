import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContributionComponent } from './list-contribution.component';

describe('ListContributionComponent', () => {
  let component: ListContributionComponent;
  let fixture: ComponentFixture<ListContributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListContributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
