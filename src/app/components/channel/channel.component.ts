import { Component, ElementRef, HostListener, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, Subscription, combineLatest, filter, map } from 'rxjs';
import { Channel } from 'src/app/shared/models/channel';
import { MessageContent } from 'src/app/shared/models/message';
import { User } from 'src/app/shared/models/user.class';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ThreadService } from 'src/app/shared/services/thread.service';
import { EditChannelComponent } from '../dialogs/edit-channel/edit-channel.component';
import { AddMembersToChannelComponent } from '../dialogs/add-members-to-channel/add-members-to-channel.component';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit, OnDestroy {
  channelId: number | null = null;
  channel: Channel = new Channel();

  userSubscription!: Subscription;
  users: User[] = [];
  isOnline?: boolean;

  messageIdSubscription!: Subscription;
  messages: MessageContent[] = [];
  groupedMessages: { date: string; messages: MessageContent[] }[] = [];
  messageContent: string = '';
  emojiPopUpIsOpen: boolean = false;
  popUpToEditMessageIsOpen: boolean = false;
  showEditMessageButton: boolean = false;
  currentlyEditingMessageId: number | null = null;
  isEditing: number | null = null;
  selectedMessageId: number | null = null;
  showEditMenu: boolean = true;
  updatedMessageContent: string = '';
  messageContainerError: boolean = false;

  url: string = '';
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  @ViewChildren('messageElement') messageElements!: QueryList<ElementRef>;

  ngUnsubscribe = new Subject<void>();

  uploadedFiles: { url: string; type: 'image' | 'data' }[] = [];
  subscription!: Subscription;


  constructor(
    public dialog: MatDialog,
    public activatedRoute: ActivatedRoute,
    public channelService: ChannelService,
    public storageService: StorageService,
    public authService: AuthService,
    public messageService: MessageService,
    public threadService: ThreadService,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.getCurrentChannelIdInUrl();
    this.fetchAndDisplayMessages();
    this.handleStorageFiles();
    this.authService.getUserData();
    this.getUsers();
  }


  getUsers() {
    this.userSubscription = this.authService.users$.subscribe((users) => {
      this.users = users;
    })
  }


  ngAfterViewInit(): void {
    this.initMessageScrolling();
    this.checkWindowSize();
    window.addEventListener('resize', this.checkWindowSize.bind(this));
  }

  handleStorageFiles() {
    // this.subscription = this.storageService.uploadedFileURL.subscribe(
    //   (fileData) => {
    //     this.uploadedFiles.push(fileData);
    //   }
    // );
  }

  getCurrentChannelIdInUrl() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.channelId = Number(params.get('id'));
      this.loadCurrentChannel(this.channelId);
    });
  }


  loadCurrentChannel(id: number) {
    this.channelService.getChannelById(id).subscribe(
      channel => {
        this.channel = channel; 
      },
      error => {
        console.error('Could not load channel', error);
      }
    );
  }


  openDialogToEditChannel() {
    this.dialog.open(EditChannelComponent, {
      data: {
        channelId: this.channelId,
        channelTitle: this.channel.title,
        channelDescription: this.channel.description,
        channelCreator: this.channel.created_by_full_name
      },
    });
  }

  openDialogToShowMembersInChannel() {
    // Here maybe a logic to show all member in a modal of bootstrap
  }

  openDialogToAddMembersToChannel() {
    this.dialog.open(AddMembersToChannelComponent, {
      data: {
        channelId: this.channelId,
      },
    });
    this.getCurrentChannelIdInUrl();
  }

  openDetailViewFromUploadedImage(uploadedImageUrl: string) {
    // Here a modal of bootstrap
  }

  openDetailViewForAttachedFile(fileUrl: string) {
    // Here a modal of bootstrap
  }

  sendMessage() {
    // this.messageService.postChannelMessage(messageContent);
  }

  showError() {
    this.messageContainerError = true;
    setTimeout(() => (this.messageContainerError = false), 3000);
  }

  resetMessage() {
    this.messageContent = '';
    this.storageService.clearUploadedFiles();
    this.uploadedFiles = [];
    this.executeScrollToBottom();
  }

  toggleEmojiPicker() {
    const realEmojiButton = document.querySelector(
      '.textarea-emoji-control'
    ) as HTMLElement;
    if (realEmojiButton) {
      realEmojiButton.click();
    }
  }

  selectUser(user: User): void {
    this.messageContent = this.messageContent.replace(
      /@[^@]*$/,
      '@' + user.first_name + ' ' + user.last_name
    );
  }

  executeScrollToBottom() {
    setTimeout(() => {
      if (!this.messageService.shouldScrollToSpecificMessage) {
        this.scrollToBottom();
      }
      this.messageService.shouldScrollToSpecificMessage = false;
    }, 100);
  }

  scrollToBottom(): void {
    this.messagesContainer.nativeElement.scrollTop =
      this.messagesContainer.nativeElement.scrollHeight;
  }

  onEmojiClick(messageId: number, emojiType: string): void {
    // this.messageService.setChannelMessageEmoji(
    //   this.channelId,
    //   messageId,
    //   emojiType
    // );
  }

  openEmojiPopUp(messageId: number) {
    // this.selectedMessageId =
    //   this.selectedMessageId === messageId ? null : messageId;
  }

  openPopUpEditMessage(message: MessageContent) {
    // if (this.loggedInUser?.uid === message.senderId && message.id) {
    //   this.currentlyEditingMessageId =
    //     this.currentlyEditingMessageId === message.id ? null : message.id;
    // }
  }

  @HostListener('document:click', ['$event'])
  onCloseEmojiPopUp($event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains($event.target)) {
      this.emojiPopUpIsOpen = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onCloseEditMessagePopUp($event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains($event.target)) {
      this.popUpToEditMessageIsOpen = false;
    }
  }

  onMessageHover(message: MessageContent) {
    // this.showEditMessageButton = this.loggedInUser?.uid === message.senderId;
  }

  closeEditMenu() {
    this.currentlyEditingMessageId = null;
  }

  handleMouseLeave(messageId: number): void {
    if (this.selectedMessageId === messageId) {
      this.selectedMessageId = null;
    }

    if (this.isEditing) {
      return;
    } else if (!this.isMessageBeingEdited(messageId)) {
      this.showEditMessageButton = false;
      this.closeEditMenu();
    }
  }

  isMessageBeingEdited(messageId: number): boolean {
    return this.isEditing === messageId;
  }

  stopEvent(event: Event) {
    event.stopPropagation();
  }

  fetchAndDisplayMessages(): void {
    this.messageService.showAllChannelMessage();
  }

  markMessagesAsRead(messages: MessageContent[]): void {
    // messages.forEach((message) => {
    //   if (message.senderId !== this.loggedInUser?.uid) {
    //     this.messageService.markChannelMessageAsRead(this.channelId);
    //   }
    // });
  }

  processMessages(messages: MessageContent[]): void {
    // messages.sort((a, b) => a.timestamp - b.timestamp);
    // this.messages = messages;
    // this.groupedMessages = this.messageService.groupMessagesByDate(
    //   this.messages
    // );
  }

  getParamsAndUser() {

  }

  saveEditedMessage(message: MessageContent) {
    this.messageService.updateChannelMessage();
  }

  editMessage(messageId: number, currentContent: string) {
    this.isEditing = messageId;
    this.updatedMessageContent = currentContent;
    this.showEditMenu = false;
  }


  initMessageScrolling() {

  }

  scrollToMessageById(messageId: string): void {

  }


  deleteFile(message: MessageContent, file: any, index: number) {
    const messageId = message.id;
    const channelId = this.channelId;
    this.storageService
      .deleteFileFromStorage(file.url);
  }

  checkWindowSize() {
    // if (window.innerHeight <= 500) {
    //   this.channelQuill.nativeElement.classList.add('new-message-bottom');
    // } else {
    //   this.channelQuill.nativeElement.classList.remove('new-message-bottom');
    // }
  }

  checkUploadedFiles() {
    console.log(this.uploadedFiles);
  }

  runChannelMessage(messageId: number) {
    if (this.channelId) {
      this.messageService
        .deleteChannelMessage(this.channelId, messageId)
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.messageIdSubscription?.unsubscribe();
    this.subscription.unsubscribe();
    window.removeEventListener('resize', this.checkWindowSize.bind(this));
  }
}
