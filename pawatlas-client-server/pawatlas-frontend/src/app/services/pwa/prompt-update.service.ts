import { inject, Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PromptUpdateService {
  // ******************
  // ***** FIELDS *****
  // ******************

  // Services
  private swUpdate = inject(SwUpdate);

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {
    // Subscribe to the versionUpdates observable to prompt the user to update the app
    this.swUpdate.versionUpdates
      .pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY')
      )
      .subscribe((evt) => {
        if (this.promptUser()) {
          document.location.reload();
        }
      });
  }

  // *******************
  // ***** METHODS *****
  // *******************
  private promptUser(): boolean {
    return confirm('Mise à jour disponible, installer ?');
  }
}
