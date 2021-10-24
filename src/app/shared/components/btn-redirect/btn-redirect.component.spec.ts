import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnRedirectComponent } from './btn-redirect.component';

describe('BtnRedirectComponent', () => {
  let component: BtnRedirectComponent;
  let fixture: ComponentFixture<BtnRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnRedirectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
