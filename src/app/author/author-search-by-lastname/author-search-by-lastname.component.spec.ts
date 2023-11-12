import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorSearchByLastnameComponent } from './author-search-by-lastname.component';

describe('AuthorSearchByLastnameComponent', () => {
  let component: AuthorSearchByLastnameComponent;
  let fixture: ComponentFixture<AuthorSearchByLastnameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorSearchByLastnameComponent]
    });
    fixture = TestBed.createComponent(AuthorSearchByLastnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
