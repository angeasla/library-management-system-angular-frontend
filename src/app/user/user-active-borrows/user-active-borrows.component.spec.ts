import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActiveBorrowsComponent } from './user-active-borrows.component';

describe('UserActiveBorrowsComponent', () => {
  let component: UserActiveBorrowsComponent;
  let fixture: ComponentFixture<UserActiveBorrowsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserActiveBorrowsComponent]
    });
    fixture = TestBed.createComponent(UserActiveBorrowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
