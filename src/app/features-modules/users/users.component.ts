import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/shared/services/shared-service/api.service';
import { ListDataFilter } from 'src/app/shared/dataModels/ListDataFilter';
import { Users } from 'src/app/shared/dataModels/user/Users';
import { SortList } from 'src/app/shared/dataModels/SortList';
import * as _ from 'underscore';
import Swal from 'sweetalert2';
import { AddUserComponent } from './add-user/add-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserStatus } from 'src/app/shared/dataModels/user/UserStatus';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/shared/services/storage-service/storage.service';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  dataLoading = false;
  showFilter = false;
  showSearch = false;
  ApprovalLoading = false;

  url: string = '/assets/jsonDummyData/users.json';
  recordsData: Users[] = [];
  allData: Users[] = [];

  // pagination
  filterModel: ListDataFilter = new ListDataFilter();

  // sort 
  sortItems = [
    { name: this.translate.instant('general.asc'), value: SortList.asc },
    { name: this.translate.instant('general.desc'), value: SortList.desc },
  ];
  sortValue = 'all';

  // user status
  userStatus = [
    { name: this.translate.instant('user.active'), value: UserStatus.active },
    { name: this.translate.instant('user.softDeleted'), value: UserStatus.soft_deleted },
  ];

  // role
  role: string = '';
  isLoggedIn: boolean = false;

  constructor(
    private translate: TranslateService,
    private apiService: ApiService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private storageService: StorageService) {
    this.filterModel.pageSize = 5;
  }

  ngOnInit(): void {
    this.getLogedUser();
    this.getAllProduct();
    this.apiService.saved.subscribe(obj => {
      if(obj && obj.user.name){
        if (obj?.inEditMode) {
          // edit
          this.updateUser(obj.user)
        } else {
          // add
          this.addNewUser(obj.user);
        }
      }
     
    });
  }

  getLogedUser() {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.role = this.storageService.getUser().Role;
      const user = this.storageService.getUser();
      this.translate.use(user.PreferredLanguage);
    }
    else {
      window.location.href = '/Login';
    }
  }

  async getAllProduct() {
    this.dataLoading = true;
    let res = await this.apiService.doGetAll(this.url);
    if (res) {
      this.dataLoading = false;
      this.recordsData = res as Users[];
      this.allData = [...this.recordsData];
      this.filterModel.totalItems = (this.recordsData.length) ? this.recordsData.length : 0;
    }
  }



  filterByStatus(status: string) {
    this.recordsData = this.allData;
    if (status !== 'all') {
      this.dataLoading = true;
      if (this.recordsData.length) {
        this.recordsData = this.recordsData.filter((x: any) => x.status == status);
        console.log('after filter', this.recordsData)
        this.dataLoading = false;
      }
    } else {
      this.getAllProduct();
    }
  }

  async sortRecords(selected: any) {
    this.filterModel.sort = selected.target.value;
    // this.recordsData = this.allData;
    if (selected.target.value !== 'all') {
      this.dataLoading = true;
      if (this.filterModel.sort == SortList.asc) {
        this.recordsData = this.recordsData.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        this.dataLoading = false;
      } else {
        this.recordsData = this.recordsData.sort().reverse();
        this.dataLoading = false;
      }
    } else {
      this.getAllProduct();
    }

  }

  resetSearch() {
    this.filterModel.searchText = '';
    this.getAllProduct();
  }

  addUser() {
    const addModalRef = this.modalService.open(AddUserComponent, { size: 'lg', backdrop: 'static' });
  }

  editUser(user: Users) {
    const addModalRef = this.modalService.open(AddUserComponent, { size: 'lg', backdrop: 'static' });
    addModalRef.componentInstance.editedUser = user;
  }

  viewUser(user: Users) {
    const addModalRef = this.modalService.open(UserDetailsComponent, { size: 'lg', backdrop: 'static' });
    addModalRef.componentInstance.selectedItems = user;
  }

  addNewUser(user: Users) {
    user.id = this.recordsData.length;
    this.recordsData.push(user);
    this.toastr.success(this.translate.instant('validationMsg.AddedSuccess'));
    
  }

  updateUser(user: Users){
    let updatedUserIndex = this.recordsData.findIndex((x: any) => x.id == user.id);
    this.recordsData[updatedUserIndex] = user;
    this.toastr.success(this.translate.instant('validationMsg.UpdatedSuccessfully'));
  }

  deleteUser(user: Users) {
    Swal.fire({
      title: this.translate.instant('sweetAlert.AreYouSure'),
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('sweetAlert.yes'),
      cancelButtonText: this.translate.instant('sweetAlert.cancel')
    }).then((result) => {
      if (result.value) {
        this.ApprovalLoading = true;
        this.recordsData = this.recordsData.filter((x: any) => x.id !== user.id);
        if (this.recordsData.length) {
          Swal.fire({
            title: this.translate.instant('sweetAlert.success'),
            text: this.translate.instant('sweetAlert.success'),
            icon: 'success',
            confirmButtonText: this.translate.instant('sweetAlert.ok')
          })
        } else {
          Swal.fire({
            title: this.translate.instant('sweetAlert.Failed'),
            text: this.translate.instant('sweetAlert.Failed'),
            icon: 'error',
            confirmButtonText: this.translate.instant('sweetAlert.ok'),
          });
        }
        this.ApprovalLoading = false;
      }
    });
  }

}
