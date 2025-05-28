import { Injectable } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { getIcon, getSvgUrl } from '../../models/categories';

@Injectable({
  providedIn: 'root',
})
export class DesignService {
  // ******************
  // ***** FIELDS *****
  // ******************

  public primaryColor: string = '#087042';
  public primaryColor2: string = '#20D760';
  public secondaryColor: string = '#3DDC84';
  public likeColor: string = '#087042';
  public dislikeColor: string = '#FF0000';
  public mapControlColor: string = '#087042';
  public selectionBorderColor: string = '#007bff';
  public selectionBackgroundColor: string = '#f0f8ff';
  public alertColor: string = '#FFFFCC';

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************

  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  // Get the formatted date from a timestamp
  public getFormattedDate(timestamp: Timestamp | any): string {
    let date = timestamp.toDate();
    // Return date + " - " time with 2 digits
    return (
      date.getDate() +
      '/' +
      (date.getMonth() + 1) +
      '/' +
      date.getFullYear() +
      ' - ' +
      ('0' + date.getHours()).slice(-2) +
      ':' +
      ('0' + date.getMinutes()).slice(-2)
    );
  }

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
