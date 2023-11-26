import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBorrowsHistoryComponent } from './user-borrows-history.component';

describe('UserBorrowsHistoryComponent', () => {
  let component: UserBorrowsHistoryComponent;
  let fixture: ComponentFixture<UserBorrowsHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserBorrowsHistoryComponent]
    });
    fixture = TestBed.createComponent(UserBorrowsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
