import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuFooterComponent } from './components/navigation/menu-footer/menu-footer.component';
import { PromptUpdateService } from './services/pwa/prompt-update.service';
import { PwaInstallService } from './services/pwa/pwa-install.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { take } from 'rxjs';
import {
  faArrowUpFromBracket,
  faSquarePlus,
} from '@fortawesome/free-solid-svg-icons';
import { DesignService } from './services/design/design.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    MenuFooterComponent,
    FontAwesomeModule,
    NgStyle,
  ],
})
export class AppComponent implements OnInit {
  // ******************
  // ***** FIELDS *****
  // ******************

  // Title of the application
  public title = 'pawatlas';

  // Design service
  public designService = inject(DesignService);

  // Inject the PromptUpdateService to check for updates
  // We don't need to call any method, the service will automatically check for updates
  private promptUpdateService = inject(PromptUpdateService);

  // PWA install service
  private pwaInstallService = inject(PwaInstallService);

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
    this.pwaInstallService.promptEvent$.pipe(take(1)).subscribe(() => {
      this.showInstallButton = true;
    });

    // Disable the scroll
    if (this.disableScroll()) {
      document.body.style.overflow = 'hidden'; // Desktop
      document.body.style.touchAction = 'none'; // Mobile
    }
  }

  // Method to install the PWA
  public installPwa(): void {
    this.pwaInstallService.promptInstall();
    this.showInstallButton = false;
  }

  // Method to not install the PWA
  public cancelInstall(): void {
    this.showInstallButton = false;
    this.showInstallInstructionsIOS = false;
  }

  // Disable the scroll according to the path
  private disableScroll(): boolean {
    return window.location.pathname === '/map';
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
