import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherInsertComponent } from './publisher-insert.component';

describe('PublisherInsertComponent', () => {
  let component: PublisherInsertComponent;
  let fixture: ComponentFixture<PublisherInsertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublisherInsertComponent]
    });
    fixture = TestBed.createComponent(PublisherInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
