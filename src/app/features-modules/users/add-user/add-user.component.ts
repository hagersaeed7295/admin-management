import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/shared-service/api.service';
import { TranslateService } from '@ngx-translate/core';
import { UserStatus } from 'src/app/shared/dataModels/user/UserStatus';
import { Users } from 'src/app/shared/dataModels/user/Users';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  editedUser: Users = { id: 0, name: '', status: '', email: '', phone: '' };
  addUserForm = this.formBuilder.group({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.email,
      Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'),
      Validators.required
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^((\\+91-?)|0)?[0-9]{11,50}$')
    ]),
  });

  userStatus = [
    { name: this.translate.instant('user.active'), value: UserStatus.active },
    { name: this.translate.instant('user.softDeleted'), value: UserStatus.soft_deleted },
  ];

  public inEditMode: boolean = false;
  loading: boolean = false;




  constructor(public modal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.checkInEditMode();
  }

  checkInEditMode() {
    if (this.editedUser.name) {
      this.inEditMode = true;
      this.addUserForm.patchValue({
        id: this.editedUser.id,
        name: this.editedUser.name,
        status: this.editedUser.status,
        email: this.editedUser.email,
        phone: this.editedUser.phone,
      });
    }
  }

  onSubmit(): void {
    this.loading = true;
    this.saveProduct();
  }


  cancel() {
    this.modal.dismiss();
    this.apiService.modalClosed.next(true);
  }

  async saveProduct() {
    if (this.inEditMode) {
      let res = {
        inEditMode: true,
        user: this.addUserForm.value
      }
      this.apiService.saved.next(res);
      this.cancel();
    }
    else {
      let res = {
        inEditMode: false,
        user: this.addUserForm.value
      }
      this.apiService.saved.next(res);
      this.cancel();
    }

  }


}
