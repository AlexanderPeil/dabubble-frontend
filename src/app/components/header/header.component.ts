import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogProfileComponent } from '../dialogs/dialog-profile/dialog-profile.component';
import { MessageContent } from 'src/app/shared/models/message';
import { MessageService } from 'src/app/shared/services/message.service';
import { ThreadService } from 'src/app/shared/services/thread.service';
import { SignupData } from 'src/app/shared/models/user-interface';
import { User } from 'src/app/shared/models/user.class';
import { Channel } from 'src/app/shared/models/channel';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @HostListener('document:click', ['$event'])
  screenWidth!: number;
  currentUser!: SignupData;
  currentUsername: string = '';

  showMenu = false;
  isOnline?: boolean;
  searchTerm: string = '';
  searchList?: boolean;
  searchSub?: Subscription;
  messagesSubscription?: Subscription;
  messages: MessageContent[] = [];
  filteredMessages: MessageContent[] = [];
  searchResults: {
    users?: User[];
    channels?: Channel[];
    directMessages?: MessageContent[];
    channelMessages?: MessageContent[];
  } = {};

  constructor(
    private authService: AuthService,
    private _eref: ElementRef,
    public dialog: MatDialog,
    public messageService: MessageService,
    public threadService: ThreadService
  ) { }

  ngOnInit() {
    this.getuseData();
    this.screenWidth = window.innerWidth;
  }


  async getuseData() {
    try {
      const userProfile = await this.authService.getLoggedUserData();
      this.currentUser = userProfile;
      this.currentUsername = this.currentUser.first_name + '' + this.currentUser.last_name
    } catch (err) {
      console.error(err);
    }
  }


  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogProfileComponent, {
      width: '600px',
      height: '700px',
      panelClass: 'custom-dialog-container',
    });
  }

  @HostListener('document:click', ['$event'])
  clickout(event: { target: any }) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.showMenu = false;
    }
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  onLogout() {
    this.authService.signout();
    this.showMenu = false;
  }


  // navigateToSidenavMobile() {
  //   this.messageService.chatOpen = false;
  //   this.messageService.isSidenavOpen = true;
  //   this.messageService.headerChatMobile = false;
  // }

}
