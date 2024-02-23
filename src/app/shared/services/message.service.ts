import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { Channel } from 'src/app/shared/models/channel';
import { User } from '../models/user.class';
import { BehaviorSubject } from 'rxjs';
import { MessageContent } from '../models/message';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  selectedUser: User | null = null;
  loggedInUser: User | null = null;
  currentReceiverId: string | null = null;
  usersInChat: { [userId: string]: boolean } = {};
  private selectedMessageIdSubject = new BehaviorSubject<string | null>(null);
  selectedMessageId = this.selectedMessageIdSubject.asObservable();
  public shouldScrollToSpecificMessage: boolean = false;
  chatOpen: boolean = true;
  isSidenavOpen: boolean = true;
  isMobile!: boolean;
  headerChatMobile: boolean = false;
  resizeTimeout: any;
  lastScreenStatus: 'mobile' | 'desktop' =
    window.innerWidth <= 630 ? 'mobile' : 'desktop';
    

  constructor(
    private authService: AuthService,
    public channelService: ChannelService
  ) { 
    window.addEventListener('resize', this.handleResize.bind(this));
    this.handleResize();
  }


  handleResize() {
    this.isMobile = window.innerWidth <= 630;

    if (window.innerWidth <= 630) {
      this.chatOpen = false;
      this.lastScreenStatus = 'mobile';
      this.isSidenavOpen = true;
    } else if (window.innerWidth > 630) {
      this.chatOpen = true;
      this.headerChatMobile = false;
      this.lastScreenStatus = 'desktop';
    }
  }


  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }


  postChannelMessage(formData: MessageContent) {

  }


  showAllChannelMessage() {

  }


  updateChannelMessage() {

  }


  deleteChannelMessage(channelId: number, messageId: number) {

  }

}
