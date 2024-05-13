import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage-service/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  username: string = '';
  constructor(private storageService: StorageService) { 
    this.username = this.storageService.getUser().UserName;
  }

  ngOnInit(): void {
    
  }

}
