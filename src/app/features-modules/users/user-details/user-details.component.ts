import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  public selectedItems: any = { title: '', description: '', price: 0, id: 0, image: '', category: '' };
  constructor(public modal: NgbActiveModal) { 
  }

  ngOnInit(): void {
  }

  
  cancel(){
    this.modal.dismiss();
  }
}
