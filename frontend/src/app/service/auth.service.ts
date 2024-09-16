
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  logout(): void {
    localStorage.removeItem('idUser');
    localStorage.removeItem('token');
    this.router.navigateByUrl('/user/login');
  }

}