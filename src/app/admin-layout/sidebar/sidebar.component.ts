import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/services/storage-service/storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() toggleSide!: boolean;
  @Output() sidebarTrigger = new EventEmitter();

  username: string = '';

  constructor(
    private router: Router,
    private storageService: StorageService) {
    if (this.storageService.isLoggedIn()) {
      this.username = this.storageService.getUser().UserName;
    }
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.storageService.clean();
    this.router.navigate(['/login']);
    // window.location.reload();
  }

}
