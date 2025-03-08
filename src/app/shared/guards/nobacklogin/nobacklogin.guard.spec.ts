import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { nobackloginGuard } from './nobacklogin.guard';

describe('nobackloginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => nobackloginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
