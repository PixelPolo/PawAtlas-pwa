import { User } from 'src/api/users/entities/user.entity';
import { Marker } from 'src/api/markers/entities/marker.entity';
import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';

@Entity()
export class Like {
  // userID : User ID
  @PrimaryColumn({ type: 'varchar', length: 128 })
  userID: string;

  // markerID : Marker ID
  @PrimaryColumn({ type: 'uuid' })
  markerID: string;

  // isLiking : Like or dislike
  @Column('boolean')
  isLiking: boolean;

  // ***** CONSTRAINTS *****

  // Many like MUST have one user
  @ManyToOne(() => User, (user) => user.likes, {
    onDelete: 'CASCADE', // If a user is deleted, the like is deleted
    onUpdate: 'CASCADE', // If a user is updated, the like is updated
  })
  @JoinColumn({ name: 'userID' })
  user: User;

  // Many like MUST have one marker
  @ManyToOne(() => Marker, (marker) => marker.likes, {
    onDelete: 'CASCADE', // If a marker is deleted, the like is deleted
    onUpdate: 'CASCADE', // If a marker is updated, the like is updated
  })
  @JoinColumn({ name: 'markerID' })
  marker: Marker;
}
