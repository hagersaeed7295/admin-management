import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  currentLang: string = '';
  defaultLang = 'en';
  constructor(public translate: TranslateService, private titleService: Title) { }

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    user.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXIiOiJtb3JfMjMxNCIsImlhdCI6MTcxNTYyMTc4MX0.fRwfSyQH-llrzcBMwJ5ScD99dhvzVptItKcln_f5rTo';
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public changeUserLanguage(language: any){
    let user = window.sessionStorage.getItem(USER_KEY);
    if(user){
      let currentUser = JSON.parse(user);
      currentUser.PreferredLanguage = language;
      this.saveUser(currentUser)
    }
  }
  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }

}
