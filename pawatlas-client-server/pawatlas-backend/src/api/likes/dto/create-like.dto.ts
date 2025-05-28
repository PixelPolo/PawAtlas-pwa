import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateLikeDto {
  // userID : User ID
  @IsString()
  @IsNotEmpty()
  userID: string;

  // markerID : Marker ID
  @IsUUID()
  @IsNotEmpty()
  markerID: string;

  // like : Like or dislike
  @IsBoolean()
  @IsNotEmpty()
  isLiking: boolean;
}
