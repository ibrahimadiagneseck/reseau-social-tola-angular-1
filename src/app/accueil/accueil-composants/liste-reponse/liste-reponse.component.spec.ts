import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeReponseComponent } from './liste-reponse.component';

describe('ListeReponseComponent', () => {
  let component: ListeReponseComponent;
  let fixture: ComponentFixture<ListeReponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeReponseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeReponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
