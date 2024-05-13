import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/shared/services/storage-service/storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() sidebarTrigger = new EventEmitter();

  language = 'en';
  username: string = '';
  userMenu = false;

  constructor(private router: Router,
    public translate: TranslateService,
    private storageService: StorageService) {
    if (this.storageService.isLoggedIn()) {
      this.username = this.storageService.getUser().UserName;
      this.language = this.storageService.getUser().PreferredLanguage;
    }
  }

  ngOnInit(): void {
  }

  changeLanguage() {
    if (this.language === 'en') {
      this.storageService.changeUserLanguage('ar');
      this.translate.use('ar');
      this.changeUILAng('ar');
    } else {
      this.storageService.changeUserLanguage('en');
      this.translate.use('en');
      this.changeUILAng('en');
    }
    window.location.reload();
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

  logout(): void {
    this.storageService.clean();
    this.router.navigate(['/login']);
    // window.location.reload();
  }
  
  @HostListener('window:keydown', ['$event']) handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeOpenedDrop();
    }
  }
  @HostListener('document:click', ['$event']) onDocumentClick(event: MouseEvent) {
    if (event.target === document.getElementById('popOverlay')) {
      this.closeOpenedDrop();
    }
  }
  closeOpenedDrop() {
    this.userMenu = false;
  }

  

}
