import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormBuilder,
  AbstractControlOptions,
} from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  userCreated = false;
  userExists = false;
  checked!: FormControl;
  chooseAvatar: boolean = false;
  selectedAvatarURL!: string;
  avatarUrls: string[] = [];
  defaultAvatar: string = 'assets/img/avatar1.svg';
  hasUserInteracted = false;

  userAlreadyExists!: boolean;
  signUpForm!: FormGroup;
  submitted!: boolean;
  signedUpInfo!: boolean;
  isButtonDisabled!: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    public storageService: StorageService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.checkBox();
    this.initFormGroup();
    this.avatarUrls = this.authService.user_images;
  }

  checkBox() {
    this.checked = new FormControl(false, Validators.requiredTrue);
  }


  initFormGroup() {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      photo: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [''],
      checked: this.checked,
    }, { validators: this.checkPasswords } as AbstractControlOptions);
  }


  checkPasswords(group: FormGroup): ValidationErrors | null {
    if (!group) {
      return null;
    }

    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true }
  }


  onSubmit() {
    if (this.signUpForm.invalid) {
      console.error("Form is invalid, can't proceed with registration");
      return;
    }
    this.performSignup();
  }


  async performSignup() {
    try {
      const formData = this.signUpForm.value;
      let resp: any = await this.authService.signup(formData);
      localStorage.setItem('token', resp.token);
      this.signedUpInfo = true;
      this.isButtonDisabled = true;
      setTimeout(() => {
        this.router.navigateByUrl('/login');
      }, 3000);
    } catch (err) {
      console.error('Could not signup.', err);
      this.handlySignUpError();
    }
  }


  userCreatedFn() {
    this.userCreated = true;
    setTimeout(() => {
      this.router.navigate(['/content/channel/DMoH03MTsuxcytK6BpUb']);
    }, 3000);
  }


  signUpFail(error: any) {
    console.log(error);
    this.userExists = true;
    setTimeout(() => {
      this.userExists = false;
      this.signUpForm.controls['email'].reset();
    }, 3000);
  }


  onNextClick(): void {
    this.chooseAvatar = true;
  }


  onbackClick() {
    this.chooseAvatar = false;
  }


  selectAvatar(url: string) {
    this.selectedAvatarURL = url;
  }


  // chooseFiletoUpload($event: any) {
  //   this.storageService
  //     .uploadAvatarService($event)
  //     .then((url: string) => {
  //       this.selectedAvatarURL = url;
  //     })
  //     .catch((error: any) => {
  //       console.error('Error uploading file: ', error);
  //     });
  // }


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

  handlySignUpError() {
    this.userAlreadyExists = true;
    setTimeout(() => {
      this.userAlreadyExists = false;
    }, 3000);
  }

}
