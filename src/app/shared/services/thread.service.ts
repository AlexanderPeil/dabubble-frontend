import { Injectable } from '@angular/core';
import { User } from '../models/user.class';


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

  constructor() { }


  closeThreadService() {
    this.threadAreClosed = false;
  }
}
