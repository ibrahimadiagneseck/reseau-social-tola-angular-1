import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpsAccueilComponent } from './corps-accueil.component';

describe('CorpsAccueilComponent', () => {
  let component: CorpsAccueilComponent;
  let fixture: ComponentFixture<CorpsAccueilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorpsAccueilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorpsAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
