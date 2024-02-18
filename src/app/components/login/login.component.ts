import {animate, state, style, transition, trigger} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // Login animation desktop
  animations: [
    trigger('logoAnimationDesktop', [
      state('initial', style({ transform: 'translateX(30vw) scale(1)' })),
      state('middle', style({ transform: 'translateX(0) scale(1)' })),
      state('final', style({ transform: 'translate(calc(-41vw + 25px), calc(-60vh + 25px)) scale(0.5)' })),
      transition('initial => middle', animate('500ms ease-out')),
      transition('middle => final', animate('500ms ease-in-out')),
    ]),
    trigger('nameAnimation', [
      state('hidden', style({ transform: 'translateX(-100%)' })),
      state('visible', style({ transform: 'translateX(0)' })),
      transition('hidden => visible', animate('500ms ease-in')),
    ]),

    // Login animation mobile
    trigger('logoAnimationMobile', [
      state('initial', style({ transform: 'translate(0, 0)' })),
      state('middle', style({ transform: 'translateX(-20vw' })),
      state('final', style({ transform: 'translate(-20vw, -43vh)' })),
      transition('initial => middle', animate('500ms ease-out')),
      transition('middle => final', animate('500ms ease-in-out')),
    ]),
    trigger('nameAnimationMobile', [
      state('hidden', style({ transform: 'translateX(-100%)' })),
      state('visible', style({ transform: 'translateX(0)' })),
      transition('hidden => visible', animate('500ms ease-in')),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  logoState: 'initial' | 'middle' | 'final' = 'initial';
  nameState: 'hidden' | 'visible' = 'hidden';
  background = '#6168ee'; // Start background-color
  logoBackgroundColor = '#6168ee';

  isEmailPasswordInvalid = false;
  loginForm!: FormGroup;
  notVerifiedMessage = false;
  message!: string;
  hasUserInteracted = false;

  isMobile: boolean = window.innerWidth < 900;
  containerVisible = true;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
    ) { }

  ngOnInit() {
    this.loginAnimation();
    this.initFormGroup();
  }


  initFormGroup() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      // rememberMe: [!!savedUsername],
    });
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    await this.performLogin();
  }


  async performLogin() {
    try {
      const formData = this.loginForm.value;
      let resp: any = await this.authService.login(formData);
      localStorage.setItem('token', resp['token']);
      this.router.navigateByUrl('/home');
    } catch (err: any) {
      if (err.status === 401) {
        this.handleSpecificError(err.error?.error);
      }
    }
  }


  handleSpecificError(errorMessage: string) {
    switch (errorMessage) {
      case 'Please verify your email first.':
        this.handleEmailNotVerifiedError();
        this.isEmailPasswordInvalid = false;
        break;
      case 'Invalid login data':
        this.handleInvalidLoginDataError();
        this.notVerifiedMessage = false;
        break;
    }
  }


  handleEmailNotVerifiedError() {
    this.notVerifiedMessage = true;
    setTimeout(() => {
      this.notVerifiedMessage = false;
    }, 3000);
  }


  handleInvalidLoginDataError() {
    this.isEmailPasswordInvalid = true;
    setTimeout(() => {
      this.isEmailPasswordInvalid = false;
    }, 3000);
  }


  markAllAsTouched(control: AbstractControl) {
    this.hasUserInteracted = true;
    if (control instanceof FormGroup) {
      for (const key in control.controls) {
        const innerControl = control.get(key);
        if (innerControl) {
          this.markAllAsTouched(innerControl);
        }
      }
    }
    control.markAsTouched();
  }
  

  async onGuestLogin(event: MouseEvent) {
    event.stopPropagation();
    try {
      const resp: any = await this.authService.guestLogin();
      localStorage.setItem('token', resp['token']);
      this.router.navigateByUrl('/home');
    } catch (err) {
    }
  }


  loginAnimation() {
    setTimeout(() => {
      this.logoState = 'middle';
    }, 500);
    setTimeout(() => {
      this.nameState = 'visible';
    }, 1000);
    setTimeout(() => {
      this.logoState = 'final';
      this.background = 'transparent';
      this.logoBackgroundColor = 'transparent';
    }, 2000);
    setTimeout(() => {
      this.containerVisible = false;
    }, 2500);
  }
}
