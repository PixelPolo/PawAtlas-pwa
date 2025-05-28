import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateMarkerDto {
  // markerDate : Date and time of the marker
  @Type(() => Date)
  markerDate?: Date;

  // markerLat : Latitude
  @IsNumber()
  @IsNotEmpty()
  markerLat: number;

  // markerLng : Longitude
  @IsNumber()
  @IsNotEmpty()
  markerLng: number;

  // markerName : Marker name (e.g. 'SPA Haut Leman')
  @IsString()
  @IsNotEmpty()
  markerName: string;

  // markerDescription : Marker description (e.g. 'This is a veterinary clinic')
  @IsString()
  @IsNotEmpty()
  markerDescription: string;

  // markerApprovedVotes : Number of approved votes
  @IsNumber()
  @IsOptional()
  markerApprovedVotes?: number;

  // markerDisapprovedVotes : Number of disapproved votes
  @IsNumber()
  @IsOptional()
  markerDisapprovedVotes?: number;

  // categoryID : Category ID
  @IsString()
  @IsNotEmpty()
  categoryID: string;

  // userID : User ID
  @IsString()
  @IsOptional()
  userID?: string;

  // imageID : Image ID
  @IsUUID()
  @IsOptional()
  imageID?: string;

  // contactID : Contact ID
  @IsUUID()
  @IsOptional()
  contactID?: string;

  // addressID : Address ID
  @IsUUID()
  @IsOptional()
  addressID?: string;
}
