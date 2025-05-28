export interface Marker {
  markerID?: string;
  markerDate?: Date;
  markerLat: number;
  markerLng: number;
  markerName: string;
  markerDescription: string;
  markerApprovedVotes?: number;
  markerDisapprovedVotes?: number;
  categoryID: string;
  userID?: string;
  imageID?: string;
  contactID?: string;
  addressID?: string;
}
