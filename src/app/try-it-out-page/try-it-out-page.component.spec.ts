import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TryItOutPageComponent } from './try-it-out-page.component';

describe('TryItOutPageComponent', () => {
  let component: TryItOutPageComponent;
  let fixture: ComponentFixture<TryItOutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TryItOutPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TryItOutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
