import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class NotificationService {
    notifications: any[] = [];

    constructor(){}

    showSuccess(text: string): void {
      this.show(text, { classname: 'bg-success text-light', delay: 6000 });
    }

    showDanger(text: string): void {
      this.show(text, { classname: 'bg-danger text-light', delay: 6000 });
    }

    remove(notification: any): void {
      this.notifications = this.notifications.filter(n => n !== notification);
    }

    clear(): void {
      this.notifications.splice(0, this.notifications.length);
    }

    private show(text: string, options: any = {}): void {
      this.notifications.push({ text, ...options });
    }
}
