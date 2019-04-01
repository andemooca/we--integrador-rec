import { TestBed } from '@angular/core/testing';

import { BlockCurrencyService } from './block-currency.service';

describe('BlockCurrencyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlockCurrencyService = TestBed.get(BlockCurrencyService);
    expect(service).toBeTruthy();
  });
});
