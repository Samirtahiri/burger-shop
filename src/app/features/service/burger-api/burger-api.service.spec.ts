import { TestBed } from '@angular/core/testing';

import { BurgerApiService } from './burger-api.service';

describe('BurgerApiService', () => {
  let service: BurgerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BurgerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
