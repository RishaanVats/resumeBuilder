import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfessionalSummary } from './professional-summary';

describe('ProfessionalSummary', () => {
  let component: ProfessionalSummary;
  let fixture: ComponentFixture<ProfessionalSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalSummary],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfessionalSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
