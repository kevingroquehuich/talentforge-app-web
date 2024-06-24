import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationalComponent } from './organizational.component';

describe('OrganizationalComponent', () => {
  let component: OrganizationalComponent;
  let fixture: ComponentFixture<OrganizationalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
