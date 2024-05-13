import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { StorageService } from "../../services/storage-service/storage.service";

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {
  isLoggedIn = false;

  constructor(private router: Router, private storageService: StorageService) {
  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (!this.isLoggedIn && next.url[0]) {
      this.router.navigate(["/login"]);
    }

    if (!next.url[0] &&  this.isLoggedIn) {
      this.router.navigate(["/admin/dashboard"]);
    }
    return true;
  }
}
