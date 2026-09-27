import '@angular/compiler';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { WorkExperience } from './work-experience';

describe('WorkExperience', () => {
  let component: WorkExperience;

  beforeEach(() => {
    component = new WorkExperience(
      {
        get: vi.fn(),
        patch: vi.fn(),
      } as any,
      {
        navigate: vi.fn(),
      } as any,
      {
        snapshot: {},
      } as any,
    );

    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable endDate when currentlyWorking is checked', () => {
    const endDateControl = component.workExperience.get('endDate');
    expect(endDateControl?.disabled).toBe(false);

    component.workExperience.get('currentlyWorking')?.setValue(true);

    expect(endDateControl?.disabled).toBe(true);
  });
});
