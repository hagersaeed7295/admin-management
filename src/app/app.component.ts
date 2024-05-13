import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from "@ngx-translate/core";
import { StorageService } from './shared/services/storage-service/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Admin-Panel';
  isAdmin = false;
  isUser = false;
  isLoggedIn = false;
  username?: string;

  constructor(private translate: TranslateService, private storageService: StorageService, private modalService: NgbModal) {
    translate.setDefaultLang('en');
  }
  ngOnInit(): void {
    this.checkLoggedUser();
  }

  checkLoggedUser() {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.isAdmin = user.Role === 'admin';
      this.isUser = user.Role === 'user';
      this.username = user.username;
      this.translate.use(user.PreferredLanguage);
      this.changeUILAng(user.PreferredLanguage);

    }
  }

  changeUILAng(selecetedLanguage: string) {

    document.querySelector('html')?.setAttribute('lang', selecetedLanguage);
    let boottstrapLink = document.getElementById('bootstrapLang');

    if (selecetedLanguage === 'ar') {
      if (boottstrapLink) {
        boottstrapLink.setAttribute("href", 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.rtl.min.css');
      }
      document.querySelector('html')?.setAttribute('dir', 'rtl');
    }
    else {
      if (boottstrapLink) {
        boottstrapLink.setAttribute("href", 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css');
      }
      document.querySelector('html')?.setAttribute('dir', 'ltr');
    }
  }

}

