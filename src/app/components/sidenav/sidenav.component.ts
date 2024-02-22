import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { DialogCreateChannelComponent } from '../dialog-create-channel/dialog-create-channel.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { Observable, Subscription, take, tap } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/shared/services/message.service';
import { User } from 'src/app/shared/models/user.class';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, OnDestroy {
  @HostListener('window:resize', ['$event'])
  channelsVisible: boolean = true;
  chatsVisible: boolean = true;
  arrowImageRotatedChannel: boolean = false;
  arrowImageRotatedChat: boolean = false;
  users: User[] = [];
  userSubscription!: Subscription;
  isOnline?: boolean;
  user_images = 'assets/img/avatar1.svg';
  screenWidth!: number;

  // loggedInUser: Observable<User | null> =
  //   this.authService.currentUser.asObservable();

  constructor(
    public dialog: MatDialog,
    public authService: AuthService,
    public channelService: ChannelService,
    private router: Router,
    private messageService: MessageService
  ) {}


  ngOnInit() {
    this.channelService.getAllChannels();
    this.authService.getUserData();
    this.getUsers();
    this.screenWidth = window.innerWidth;
  }


  getUsers() {
    this.userSubscription = this.authService.users$.
    subscribe((users) => (this.users = users));
  }


  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
  }


  hideChannels() {
    this.channelsVisible = !this.channelsVisible;
    this.arrowImageRotatedChannel = !this.arrowImageRotatedChannel;
  }


  hideChats() {
    this.chatsVisible = !this.chatsVisible;
    this.arrowImageRotatedChat = !this.arrowImageRotatedChat;
  }


  openDialogToCreateChannel() {
    // this.dialog.open(DialogCreateChannelComponent);
  }


  // onUserClick(clickedUser: User) {
  //   this.loggedInUser
  //     .pipe(
  //       take(1),
  //       tap((loggedInUser) => {
  //         if (loggedInUser && loggedInUser.uid !== clickedUser.uid) {
  //           if (loggedInUser.hasUnreadMessages?.includes(clickedUser.uid)) {
  //             this.messageService.markMessagesAsRead(
  //               clickedUser.uid,
  //               loggedInUser.uid
  //             );
  //           }
  //         }
  //       })
  //     )
  //     .subscribe();
  //   this.router.navigate(['content', 'direct-message', clickedUser.uid]);

  //   this.messageService.openChatMobile();
  // }


  onChannelClick(id: number) {
    // this.messageService.markChannelMessageAsRead(channelId);
    // this.messageService.openChatMobile();
  }


  openNewMessageMobile() {
    // this.messageService.openChatMobile();
  }


  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }
  
}
