import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  let ngxspinnerservice: NgxSpinnerService = inject(NgxSpinnerService);

  ngxspinnerservice.show();

  return next(req).pipe(finalize(() => {
    ngxspinnerservice.hide();
  }));
};
