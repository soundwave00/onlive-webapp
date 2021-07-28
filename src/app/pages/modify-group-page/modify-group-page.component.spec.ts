import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyGroupPageComponent } from './modify-group-page.component';

describe('ModifyGroupPageComponent', () => {
  let component: ModifyGroupPageComponent;
  let fixture: ComponentFixture<ModifyGroupPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyGroupPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyGroupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
