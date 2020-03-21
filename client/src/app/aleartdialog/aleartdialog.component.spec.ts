import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AleartdialogComponent } from './aleartdialog.component';

describe('AleartdialogComponent', () => {
  let component: AleartdialogComponent;
  let fixture: ComponentFixture<AleartdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AleartdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AleartdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
