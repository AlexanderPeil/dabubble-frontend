import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  sendMailForm!: FormGroup;
  emailSent = false;
  emailSendFailed = false;
  errorMessage: string = '';
  isButtonDisabled = false;
  inputBlurred: { [key: string]: boolean } = {
    email: false,
    password: false
  };

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }


  ngOnInit() {
    this.initFormGroup();
  }


  initFormGroup() {
    this.sendMailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }


  onSubmit() {
    if (this.sendMailForm.invalid) {
      return;
    }
    this.performSendEmail();
  }


  async performSendEmail() {
    try {
      const email = this.sendMailForm.value.email;
      this.isButtonDisabled = true;
      await this.authService.forgotPassword(email);
      this.emailSent = true;
      setTimeout(() => {
        this.router.navigateByUrl('/login');
      }, 3000);
    } catch (err) {
      console.error('Could not send mail.', err);
      this.handlySignUpError();
    }
  }


  handlySignUpError() {
    this.emailSendFailed = true;
    setTimeout(() => {
      this.emailSendFailed = false;
      this.sendMailForm.reset();
      this.isButtonDisabled = false;
    }, 3000);
  }


  onBlur(controlName: string): void {
    this.inputBlurred[controlName] = true;
  }

  shouldShowError(controlName: string): boolean {
    const control = this.sendMailForm.get(controlName);
    return (control?.touched || this.inputBlurred[controlName] === true) && control?.invalid === true;
  }

}
