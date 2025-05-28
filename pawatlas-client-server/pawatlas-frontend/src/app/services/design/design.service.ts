import { Injectable } from '@angular/core';
import {
  getIcon,
  getSvgUrl,
} from '../../../assets/icons/categories/category.icons';

@Injectable({
  providedIn: 'root',
})
export class DesignService {
  // ******************
  // ***** FIELDS *****
  // ******************

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  // Get the icon URL from the marker category
  public getIconURL(markerCategory: string): string {
    // From categories.ts
    return getSvgUrl(markerCategory);
  }

  // Get the leaflet icon URL from the marker category
  public getLeafletIconURL(markerCategory: string): L.Icon {
    // From categories.ts
    return getIcon(markerCategory);
  }
}
