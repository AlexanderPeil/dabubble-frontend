import { Injectable } from '@angular/core';
import { User } from '../models/user.class';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  threadAreClosed: boolean = false;
  loggedInUser: User | null = null;
  currentChannelName!: string;
  file: any = {};
  uploadedImages: any = [];
  uploadedDatas: any = [];
  urlContainsPdfEnding: boolean = false;
  filteredUrlToString: string = '';

  constructor(
    private router: Router
  ) { }


  closeThreadService() {
    this.threadAreClosed = false;
  }


  openChannelThread(messageId: number, channelId: number, channelName: string) {
    this.threadAreClosed = true;
    this.setChannelName(channelName);
    this.router.navigate([
      '/content',
      'channel',
      channelId,
      'thread',
      messageId,
      channelId,
    ]);
  }


  setChannelName(name: string): void {
    this.currentChannelName = name;
  }

}
