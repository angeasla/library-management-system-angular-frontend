import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveBorrowListComponent } from './active-borrow-list.component';

describe('ActiveBorrowListComponent', () => {
  let component: ActiveBorrowListComponent;
  let fixture: ComponentFixture<ActiveBorrowListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveBorrowListComponent]
    });
    fixture = TestBed.createComponent(ActiveBorrowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
