import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/shared/services/message.service';
import { ThreadService } from 'src/app/shared/services/thread.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy, OnInit {
  checkUserActivityInterval: any;
  logoutInterval!: number;
  userSubscription!: Subscription;
  lastUpdate: number = 0;
  updateUserActivityTimeout: any;
  inactiveGuestUserSubscription!: Subscription;

  constructor(
    public threadService: ThreadService,
    public messageService: MessageService
  ) {}

  ngOnInit() {
  }

  ngOnDestroy() {
    clearInterval(this.checkUserActivityInterval);
    this.userSubscription?.unsubscribe();
  }
}
