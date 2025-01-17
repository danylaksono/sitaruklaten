import { WarningSnackbarService } from './../dialog/warning-snackbar.service';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
//import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})


export class AuthService {
  public jwt: string;
  public currentUser: string;
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject(this.hasToken());

  @Output() loggedin = new EventEmitter();

  constructor(
    private warning: WarningSnackbarService,
    private router: Router,
    private http: HttpClient,
    private cookie: CookieService
  ) { }

  private hasToken() : boolean {
    return !!this.cookie.get(this.currentUser);
  }


  createAccount(credentials) {
    this.http.post('api/users', credentials).subscribe((res) => {
      //console.log(res);
    });
  }

  signIn(credentials) {
    const authUrl='http://103.108.187.217/api/penggunas/login';
    //const authUrl='http://localhost:3000/api/penggunas/login';
    this.http.post(authUrl, credentials).subscribe((res: any) => {
    //this.http.post('api/auth', credentials).subscribe((res: any) => {

      //console.log(res);
      //this.jwt = res.token;
      //localStorage.setItem('currentUser', res.token);
      this.cookie.set('currentUser', res.id, 0.25);
      this.isLoggedInSubject.next(true);
      this.router.navigateByUrl('/home');
    },
    
    error => { 
      //console.log(error);
      this.warning.open('Password atau Nama Pengguna Salah!');

    
    
    });
  } //signin

  
  logOut() {
    this.cookie.delete('currentUser');
    this.isLoggedInSubject.next(false);
  } //logout

  isLoggedIn() : Observable<boolean> {
    const isExist = this.cookie.get('currentUser');
    if (isExist) {
      this.isLoggedInSubject.next(true);
    } else {
      this.isLoggedInSubject.next(false);
    }
    //console.log(this.isLoggedInSubject.asObservable());
    return this.isLoggedInSubject.asObservable();
   }


  isSignedIn() {
    //check if expired first
    let cookieExist: boolean = this.cookie.check('currentUser');
    //this.currentUser = localStorage.getItem('currentUser');
    if (cookieExist) {
      //this.loggedin.emit(true);
      //this.isOpen.next(true);
      return true;
      console.log('logged in');
    } else {
      //this.isOpen.next(false);
      //this.loggedin.emit(false);
      return false;
      console.log('not logged in');
    }
  }






}


//based on https://netbasal.com/angular-2-persist-your-login-status-with-behaviorsubject-45da9ec43243