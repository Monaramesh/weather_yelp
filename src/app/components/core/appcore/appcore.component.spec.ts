import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppcoreComponent } from './appcore.component';

describe('AppcoreComponent', () => {
  let component: AppcoreComponent;
  let fixture: ComponentFixture<AppcoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppcoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppcoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
