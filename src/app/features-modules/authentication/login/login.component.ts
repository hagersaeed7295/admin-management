import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/dataModels/user/User';
import { ApiService } from 'src/app/shared/services/shared-service/api.service';
import { AuthService } from 'src/app/shared/services/shared-service/auth.service';
import { StorageService } from 'src/app/shared/services/storage-service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };
  
  username: string = '';
  user: User = {
    Id: 0,
    UserName: '',
    Password: undefined,
    PreferredLanguage: '',
    token: undefined
  };

  isLoggedIn = false;
  isLoginFailed = false;
  loading:boolean = false;

  constructor( 
    private storageService: StorageService,
    private authService: AuthService) {
  }


  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.username = this.storageService.getUser().UserName;
      window.location.href = '/admin/dashboard';
    }

   }


  onSubmit(): void {
    this.loading = true;
    
    if (this.form.username) {
      this.authService.login(this.form).subscribe({
        next: data => {
          this.loading = false;
         if(data.length){
          this.storageService.saveUser(data[0]);
         
  
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          console.log('user', this.storageService.getUser());
          this.username = this.storageService.getUser().UserName;
          this.reloadPage();
         }
         else{
          this.isLoginFailed = true;
         }
        },
        error: err => {
          this.loading = false;
          this.isLoginFailed = true;
        }
      });
    }

   
  }
  reloadPage(): void {
    window.location.reload();
  }

}
