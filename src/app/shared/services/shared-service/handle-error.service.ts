import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class HandleErrorService {
  constructor(private toastr: ToastrService,) { }
  logError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      this.toastr.error(error.statusText, error.message, {
        progressBar: true,
        progressAnimation: 'decreasing',
        easing: 'ease-out',
      });
      console.log('client Side Error ', error);
    } else
      console.log('Server Side Error', error);
    this.toastr.error(error.statusText, error.message, {
      progressBar: true,
      progressAnimation: 'decreasing',
      easing: 'ease-out',
    });
    return throwError('there is somethimg went wrong');
  }
}
