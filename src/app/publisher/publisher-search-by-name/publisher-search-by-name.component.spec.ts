import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherSearchByNameComponent } from './publisher-search-by-name.component';

describe('PublisherSearchByNameComponent', () => {
  let component: PublisherSearchByNameComponent;
  let fixture: ComponentFixture<PublisherSearchByNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublisherSearchByNameComponent]
    });
    fixture = TestBed.createComponent(PublisherSearchByNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
