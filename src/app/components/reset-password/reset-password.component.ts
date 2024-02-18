import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidationErrors, AbstractControlOptions } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  newPasswordForm!: FormGroup;
  passwordResetSuccess: boolean = false;
  newPassword: string = '';
  repeatedPassword: string = '';
  isButtonDisabled: boolean = false;
  passwortReset: boolean = false;
  inputBlurred: { [key: string]: boolean } = {
    password: false
  };

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }


  ngOnInit() {
    this.initFormGroup();
  }


  initFormGroup() {
    this.newPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['']
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
    if (this.newPasswordForm.invalid) {
      return;
    }
    this.performResetPassword();
  }


  async performResetPassword() {
    try {
      let formData = this.newPasswordForm.value;
      const token = this.route.snapshot.queryParamMap.get('token');
      this.isButtonDisabled = true;

      if (!token) {
        console.error('Password reset token is missing.');
        setTimeout(() => {
          this.isButtonDisabled = false;
          this.newPasswordForm.reset();
        }, 3000);
        return;
      }

      await this.authService.resetPassword(token, formData.password);
      this.passwortReset = true;
      setTimeout(() => {
        this.router.navigateByUrl('/login');
      }, 3000);
    } catch (err) {
      console.error('Could not reset password.', err);
      setTimeout(() => {
        this.isButtonDisabled = false;
        this.newPasswordForm.reset();
      }, 3000);
    }
  }

}
