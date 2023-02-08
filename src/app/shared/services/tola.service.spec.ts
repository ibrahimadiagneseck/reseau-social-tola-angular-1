import { TestBed } from '@angular/core/testing';

import { TolaService } from './tola.service';

describe('TolaService', () => {
  let service: TolaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TolaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
