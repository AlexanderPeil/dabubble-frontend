import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Channel } from '../models/channel';
import { BehaviorSubject, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  public channelSubject = new BehaviorSubject<Channel[]>([]);
  public channels$ = this.channelSubject.asObservable();


  constructor(private http: HttpClient) { }


  getAllChannels() {
    const url = environment.baseUrl + '/channels/';
    return this.http.get<Channel[]>(url).pipe(take(1)).subscribe(
      channels => {
        this.channelSubject.next(channels);
      },
      error => {
        console.error('Could not load channels', error);
      }
    )
  }


  createChannel() {

  }



}
