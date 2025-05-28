import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PromptUpdateService } from './services/pwa/prompt-update.service';
import { PromptInstallService } from './services/pwa/prompt-install.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  faArrowUpFromBracket,
  faSquarePlus,
} from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs';
import { DesignService } from './services/design/design.service';
import { NgStyle } from '@angular/common';
import { MenuFooterComponent } from './components/menu-footer/menu-footer.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgStyle,
    FontAwesomeModule,
    MenuFooterComponent,
    SpinnerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  // ******************
  // ***** FIELDS *****
  // ******************
  title = 'pawatlas-frontend';

  // Design service
  public designService = inject(DesignService);

  // Inject the PromptUpdateService to check for updates
  // We don't need to call any method, the service will automatically check for updates
  private promptUpdateService = inject(PromptUpdateService);

  // Inject the PromptInstallService to prompt the user to install the PWA
  private promptInstallService = inject(PromptInstallService);

  // Boolean to show the install button
  public showInstallButton = false;
  public showInstallInstructionsIOS = this.isIOSandSafari();

  // Install icons for IOS
  public faArrowUpFromBracket = faArrowUpFromBracket;
  public faSquarePlus = faSquarePlus;

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  // ***** ANGULAR LIFECYCLE HOOKS *****

  // Call the method to disable the scroll
  public ngOnInit(): void {
    // Subscribe to the prompt event
    this.promptInstallService.promptEvent$.pipe(take(1)).subscribe(() => {
      this.showInstallButton = true;
    });
  }

  // ***** METHODS *****

  // Method to install the PWA
  public installPwa(): void {
    this.promptInstallService.promptInstall();
    this.showInstallButton = false;
  }

  // Method to not install the PWA
  public cancelInstall(): void {
    this.showInstallButton = false;
    this.showInstallInstructionsIOS = false;
  }

  // Check if the user is on IOS and Safari
  private isIOSandSafari(): boolean {
    // Check if the user is on IOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isOnIOS = /iphone|ipad|ipod/.test(userAgent);
    // Check if the user is on Safari
    const isOnSafari = /safari/.test(userAgent);
    // Check if the user has the PWA installed
    const isStandalone = window.matchMedia(
      '(display-mode: standalone)'
    ).matches;
    // Return the result
    return isOnIOS && isOnSafari && !isStandalone;
  }
}
