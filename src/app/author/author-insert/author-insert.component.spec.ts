import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorInsertComponent } from './author-insert.component';

describe('AuthorInsertComponent', () => {
  let component: AuthorInsertComponent;
  let fixture: ComponentFixture<AuthorInsertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorInsertComponent]
    });
    fixture = TestBed.createComponent(AuthorInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
