import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PromptInstallService {
  private deferredPrompt: any;
  public promptEvent$ = new Subject<any>();

  constructor() {
    window.addEventListener('beforeinstallprompt', (event) => {
      // Avoid Chrome to automatically show the install prompt
      event.preventDefault();
      // Save the event to trigger later
      this.deferredPrompt = event;
      // Notify that the event is available
      this.promptEvent$.next(event);
    });
  }

  public promptInstall(): void {
    if (this.deferredPrompt) {
      // Show the install prompt
      this.deferredPrompt.prompt();
      // Reset deferredPrompt after the user choice
      this.deferredPrompt = null;
    }
  }
}
