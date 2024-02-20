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
    ThreadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
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
