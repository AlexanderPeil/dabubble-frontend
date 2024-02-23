import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Channel } from 'src/app/shared/models/channel';
import { ChannelService } from 'src/app/shared/services/channel.service';

@Component({
  selector: 'app-edit-channel',
  templateUrl: './edit-channel.component.html',
  styleUrls: ['./edit-channel.component.scss']
})
export class EditChannelComponent {
  showInputToEditChannelName: boolean = false;
  showInputToEditChannelDescription: boolean = false;
  channel: Channel = new Channel();
  channelNameHasChanged: boolean = false;
  channelDescriptionHasChanged: boolean = false;
  newChannelTitleValue: string = '';
  newChannelDescriptionValue: string = '';


  constructor(
    public dialog: MatDialog,
    public router: Router,
    public channelService: ChannelService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      channelTitle: string;
      channelId: number;
      channelDescription: string;
      channelCreator: number
    }
  ) { }


  // ngOnInit(): void {
  //   this.channelService.getAllChannels();
  // }

  editChannelName() {
    this.showInputToEditChannelName = true;
  }

  newChannelTitle($event: any) {
    this.channelNameHasChanged = true;
  }


  editDescription() {
    this.showInputToEditChannelDescription = true;
  }

  newDescritpion($event: any) {
    this.channelDescriptionHasChanged = true;
  }


  saveChannelTitle() {
    this.showInputToEditChannelName = false;
    this.channelService.updateChannelTitle(this.newChannelTitleValue, this.data.channelId)
      .subscribe({
        next: (updatedChannel) => {
          this.channelService.getAllChannels();
          console.log('Channel updated', updatedChannel);
        },
        error: (error) => {
          console.error('Error updating channel', error);
        }
      });
  }


  saveChannelDescritpion() {
    this.showInputToEditChannelDescription = false;
    this.channelService.updateChannelDescription(this.newChannelDescriptionValue, this.data.channelId)
      .subscribe({
        next: (updatedChannel) => {
          this.channelService.getAllChannels();
          console.log('Channel updated', updatedChannel);
        },
        error: (error) => {
          console.error('Error updating channel', error);
        }
      });
  }

}
