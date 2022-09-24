import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedSearchesNewComponent } from './saved-searches-new.component';

describe('SavedSearchesNewComponent', () => {
  let component: SavedSearchesNewComponent;
  let fixture: ComponentFixture<SavedSearchesNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedSearchesNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedSearchesNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
