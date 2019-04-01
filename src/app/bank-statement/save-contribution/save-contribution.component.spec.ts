import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveContributionComponent } from './save-contribution.component';

describe('SaveContributionComponent', () => {
  let component: SaveContributionComponent;
  let fixture: ComponentFixture<SaveContributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveContributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
