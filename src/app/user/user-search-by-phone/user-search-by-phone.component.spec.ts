import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSearchByPhoneComponent } from './user-search-by-phone.component';

describe('UserSearchByPhoneComponent', () => {
  let component: UserSearchByPhoneComponent;
  let fixture: ComponentFixture<UserSearchByPhoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserSearchByPhoneComponent]
    });
    fixture = TestBed.createComponent(UserSearchByPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
