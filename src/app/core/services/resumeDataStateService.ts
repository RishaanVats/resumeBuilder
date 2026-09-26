import { signal } from '@angular/core';
import { Injectable } from '@angular/core';

import { resumeData } from '../../shared/types/types';

@Injectable({
  providedIn: 'root', // <-- Add this line
})
export class resumeDataStateService {
  constructor() {
    this.hydrate(); // Load saved sessionStorage data into signal on startup
  }

  private resumeData = signal<resumeData>({});

  patch<K extends keyof resumeData>(key: K, value: Partial<resumeData[K]>): void {
    this.resumeData.update((currentData) => {
      const currentValue = currentData[key];

      // If existing value is an object, deep merge it with the new value
      const updatedValue =
        typeof currentValue === 'object' && currentValue !== null && !Array.isArray(currentValue)
          ? { ...currentValue, ...value }
          : value;

      return {
        ...currentData,
        [key]: updatedValue,
      };
    });
    this.persist();
    console.log("Updated signal state: ", this.resumeData());
  }

  get<K extends keyof resumeData>(key: K): resumeData[K] | undefined {
    return this.resumeData()[key];
  }

  readonly data = this.resumeData.asReadonly();

  private persist() {
    sessionStorage.setItem('resumeDataState', JSON.stringify(this.resumeData()));
  }

  hydrate() {
    const storedData = sessionStorage.getItem('resumeDataState');
    if (storedData) {
      try {
        this.resumeData.set(JSON.parse(storedData));
      } catch (e) {
        console.error('Failed to parse stored resume data:', e);
      }
    }
  }

  clear() {
    sessionStorage.removeItem('resumeDataState');
    this.resumeData.set({});
  }
}
