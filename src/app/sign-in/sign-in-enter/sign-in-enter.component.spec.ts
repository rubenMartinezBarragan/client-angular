import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInEnterComponent } from './sign-in-enter.component';

describe('SignInEnterComponent', () => {
  let component: SignInEnterComponent;
  let fixture: ComponentFixture<SignInEnterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignInEnterComponent]
    });
    fixture = TestBed.createComponent(SignInEnterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
