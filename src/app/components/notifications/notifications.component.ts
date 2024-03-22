import { Component, HostBinding } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { NgbModule, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [NgbModule, CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {
  @HostBinding('class') classes = 'toast-container position-fixed top-0 end-0 start-0 ms-auto p-3';

  constructor(public notificationService: NotificationService) {}

  ngOnDestroy(): void {
    this.notificationService.clear();
  }
}
