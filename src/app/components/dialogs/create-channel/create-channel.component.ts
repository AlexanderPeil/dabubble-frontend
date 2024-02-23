import {
  Component,
  OnInit,
  ElementRef,
  HostListener,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Channel } from 'src/app/shared/models/channel';
import { MatDialog } from '@angular/material/dialog';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { MatRadioChange } from '@angular/material/radio';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user.class';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.scss']
})
export class CreateChannelComponent implements OnInit, OnDestroy {
  channel: Channel = new Channel();
  chooseMembers: boolean = true;
  radioSelected: boolean = false;
  isInputVisible: boolean = false;
  showUserDropdown: boolean = false;
  selectedUsers: User[] = [];
  inputValue: string = '';
  selectedRadioButtonValue!: string;
  @ViewChild('input', { static: false }) input!: ElementRef | undefined;
  userAlreadyExists: boolean = false;
  users: User[] = []
  filteredUsers: User[] = [];
  userSubscription!: Subscription;
  channelForm!: FormGroup;

  constructor(
    private channelService: ChannelService,
    private authService: AuthService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) { }


  ngOnInit() {
    this.authService.getUserData();
    this.getUsers();
    this.initFormGroup();
  }


  initFormGroup() {
    this.channelForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: [''],
      members: [[]]
    });
  }


  getUsers() {
    this.userSubscription = this.authService.users$.
      subscribe((users) => {
        this.users = users;
        this.filteredUsers = [...this.users];
      });
  }


  toggleForms() {
    this.chooseMembers = !this.chooseMembers;
  }


  onRadioChange(event: MatRadioChange) {
    this.radioSelected = true;
    this.selectedRadioButtonValue = event.value;
    if (event.value === '2') {
      this.isInputVisible = true;
    } else {
      this.isInputVisible = false;
    }
  }


  async addAllMembers() {
    // this.channel.members = this.filteredUsers;
  }


  checkForDropdown(event: any): void {
    const value = event.target.value;
    if (value) {
      this.showUserDropdown = true;
      this.filterUsers(value);
    } else {
      this.showUserDropdown = true;
      this.filterUsers();
    }
  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (
      this.input &&
      this.input.nativeElement &&
      !this.input.nativeElement.contains(event.target)
    ) {
      this.showUserDropdown = false;
    }
  }


  filterUsers(query?: string): void {
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      this.filteredUsers = this.users.filter((user) =>
        user.first_name.toLowerCase().includes(lowerCaseQuery) ||
        user.last_name.toLowerCase().includes(lowerCaseQuery) ||
        user.email.toLowerCase().includes(lowerCaseQuery)
      );
    } else {
      this.filteredUsers = [...this.users];
    }
  }


  selectUser(user: User): void {
    this.showUserDropdown = false;
    if (!this.channel.members.includes(user.id)) {
      this.channel.members.push(user.id);
      this.selectedUsers.push(user);
      this.channelForm.patchValue({ members: this.channel.members });
    }
  }


  removeUserFromSelectedUser(user: User): void {
    if (this.channel.members.includes(user.id)) {
      this.channel.members = this.channel.members.filter(memberId => memberId !== user.id);
      this.channelForm.patchValue({ members: this.channel.members });
    }

    const userIndex = this.selectedUsers.findIndex(selectedUser => selectedUser.id === user.id);
    if (userIndex !== -1) {
      this.selectedUsers.splice(userIndex, 1);
    }
  }


  onSubmit() {
    if (this.channelForm.valid) {
      const channelData = {
        ...this.channelForm.value,
        member_ids: this.channel.members,
      };
      console.log(channelData);

      this.channelService.createChannel(channelData).subscribe({
        next: (response) => {
          console.log("Successfully created channel");
          this.channelService.getAllChannels();
        }
      })
    }
  }


  getValueFromInput($event: any) {
    this.inputValue = $event;
  }


  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }

}
