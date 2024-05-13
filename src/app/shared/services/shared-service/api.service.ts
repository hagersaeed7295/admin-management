import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleErrorService } from './handle-error.service';
import { environment as env } from 'src/environments/environment';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public modalClosed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public saved: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,

    private handleError: HandleErrorService
  ) { }

  doGetAll(url: string): any {
    let res = lastValueFrom(
      this.http.get(`${url}`)
    )
      .then((res) => {
        return res;
      })
      .catch((error) => {
        this.handleError.logError(error);
      });
    return res;
  }

}
