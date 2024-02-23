import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './shared/services/auth-interceptor.service';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ChannelComponent } from './components/channel/channel.component';
import { HomeComponent } from './components/home/home.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { DirectMessageComponent } from './components/direct-message/direct-message.component';
import { HeaderComponent } from './components/header/header.component';
import { ImprintComponent } from './components/imprint/imprint.component';
import { NewMessageComponent } from './components/new-message/new-message.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ThreadComponent } from './components/thread/thread.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';

import { DialogProfileComponent } from './components/dialogs/dialog-profile/dialog-profile.component';
import { EmailVerifyComponent } from './components/email-verify/email-verify.component';
import { CreateChannelComponent } from './components/dialogs/create-channel/create-channel.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ChannelComponent,
    HomeComponent,
    PrivacyPolicyComponent,
    DirectMessageComponent,
    HeaderComponent,
    ImprintComponent,
    NewMessageComponent,
    SidenavComponent,
    ThreadComponent,
    DialogProfileComponent,
    EmailVerifyComponent,
    CreateChannelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatRadioModule,
    MatChipsModule
  ],
  providers: [
    {
     provide: HTTP_INTERCEPTORS,
     useClass: AuthInterceptorService,
     multi: true
    }
 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
