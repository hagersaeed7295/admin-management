import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage-service/storage.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(
    private storageService: StorageService
  ) {
  }

  ngOnInit(): void {
  }

}
