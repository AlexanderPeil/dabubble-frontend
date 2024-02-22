import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { SignupData, LoginData } from '../models/user-interface';
import { User } from '../models/user.class';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersSubject = new BehaviorSubject<User[]>([])
  public users$ = this.usersSubject.asObservable();
  guestuserPhoto: string = '';


  constructor(private http: HttpClient) { }


  user_images: string[] = [
    'assets/img/avatar1.svg',
    'assets/img/avatar2.svg',
    'assets/img/avatar3.svg',
    'assets/img/avatar4.svg',
    'assets/img/avatar5.svg',
    'assets/img/avatar6.svg',
  ];


  signup(formData: SignupData) {
    const url = environment.baseUrl + '/signup/';
    return lastValueFrom(this.http.post(url, formData));
  }


  login(formData: LoginData) {
    const url = environment.baseUrl + '/login/';
    return lastValueFrom(this.http.post(url, formData)).
      catch(err => Promise.reject(err));
  }


  // getRandomPhoto() {
  //   const randomIndex  = Math.floor(Math.random() * this.user_images.length);
  //   return this.user_images[randomIndex ];
  // }


  guestLogin() {
    const url = environment.baseUrl + '/guest-login/';    
    return lastValueFrom(this.http.post(url, {}));
  }


  // guestLogin() {
  //   const url = environment.baseUrl + '/guest-login/';    
  //   const randomPhoto = this.getRandomPhoto();
  //   return lastValueFrom(this.http.post<User>(url, {photo: randomPhoto}))
  //   .then(response => {
  //     this.guestuserPhoto = response.photo;
  //     return this.guestuserPhoto;
  //   })
  // }


  getLoggedUserData() {
    const url = environment.baseUrl + '/edit-user/';
    return lastValueFrom(this.http.get<User>(url));
  }


  updateUserProfile(updateUserProfile: User) {
    console.log('Run method updateUserProfile');
    const url = environment.baseUrl + '/edit-user/';
    return lastValueFrom(this.http.patch<User>(url, updateUserProfile));
  }


  getUserData() {
    const url = environment.baseUrl + `/user/`;
    this.http.get<User[]>(url).subscribe(
      users => {
        this.usersSubject.next(users);
      },
      error => {
        console.error('Fehler beim Laden der Benutzer:', error)
      }
    );
  }


  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }


  signout() {
    const url = environment.baseUrl + '/logout/';
    return lastValueFrom(this.http.post(url, {}));
  }


  deleteUserAccount() {
    const url = environment.baseUrl + '/delete-user/';
    return lastValueFrom(this.http.delete(url));
  }


  forgotPassword(email: string) {
    const url = environment.baseUrl + '/api/password_reset/';
    return lastValueFrom(this.http.post(url, { email: email }));
  }


  resetPassword(token: string, password: string) {
    const url = environment.baseUrl + '/api/password_reset/confirm/';
    return lastValueFrom(this.http.post(url, { token: token, password: password }));
  }


  validateToken(token: string) {
    const url = environment.baseUrl + '/api/password_reset/validate_token/';
    return lastValueFrom(this.http.post(url, { token: token }));
  }

}
