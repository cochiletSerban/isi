import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import {interval} from 'rxjs/internal/observable/interval';
import {startWith, switchMap} from 'rxjs/operators';
import { Notification } from '../models/notification';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {

  email = null;
  poller: any;
  subscription: any;
  notifications: Notification[] = [];

  constructor(
    private _userService: UserService,
    private _notificationService: NotificationService,
    private _router: Router) {
    this._userService.userSubject.subscribe(email => this.email = email);
  }

  ngOnInit() {
    this.poller = interval(10000).pipe(
      startWith(0),
      switchMap(() => this._notificationService.getNotifications())
    );
    this.subscription = this.poller.subscribe(notifications => {
      this.notifications = notifications;
    });
  }

  logout() {
    localStorage.clear();
    this.email = null;
    this._router.navigate(['login']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getDate(time: number): string {
    return new Date(10000 * time).toISOString().substr(11, 8);
  }

}
