import { Like } from 'src/api/likes/entities/like.entity';
import { User } from 'src/api/users/entities/user.entity';
import { Image } from 'src/api/images/entities/image.entity';
import { Category } from 'src/api/categories/entities/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Contact } from 'src/api/contacts/entities/contact.entity';
import { Address } from 'src/api/addresses/entities/address.entity';

@Entity()
export class Marker {
  // markerID : Marker ID
  @PrimaryGeneratedColumn('uuid')
  markerID: string;

  // markerDate : Date and time of the marker
  @Column({
    nullable: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  markerDate: Date;

  // markerLat : Latitude
  @Column('float')
  markerLat: number;

  // markerLng : Longitude
  @Column('float')
  markerLng: number;

  // markerName : Marker name (e.g. 'SPA Haut Leman')
  @Column({ type: 'varchar', length: 64 })
  markerName: string;

  // markerDescription : Marker description (e.g. 'This is a veterinary clinic')
  @Column({ type: 'varchar', length: 512 })
  markerDescription: string;

  // markerApprovedVotes : Number of approved votes
  @Column({ type: 'int', default: 0 })
  markerApprovedVotes: number;

  // markerDisapprovedVotes : Number of disapproved votes
  @Column({ type: 'int', default: 0 })
  markerDisapprovedVotes: number;

  // categoryID : Category ID
  @Column({ type: 'varchar', length: 8 })
  categoryID: string;

  // userID : User ID
  @Column({ type: 'varchar', length: 128, nullable: true })
  userID: string;

  // imageID : Image ID
  @Column({ type: 'uuid', nullable: true })
  imageID: string;

  // contactID : Contact ID
  @Column({ type: 'uuid', nullable: true })
  contactID: string;

  // addressID : Address ID
  @Column({ type: 'uuid', nullable: true })
  addressID: string;

  // ***** CONSTRAINTS *****

  // Many marker MUST have one category
  @ManyToOne(() => Category, (category) => category.markers, {
    onDelete: 'RESTRICT', // Prevent deletion of a category if it is assigned to a marker
    onUpdate: 'CASCADE', // If a category is updated, all its markers are updated
  })
  @JoinColumn({ name: 'categoryID' })
  category: Category;

  // One marker COULD have one user
  @ManyToOne(() => User, (user) => user.markers, {
    onDelete: 'SET NULL', // If a user is deleted, the marker is not deleted
    onUpdate: 'CASCADE', // If a user is updated, the marker is updated
  })
  @JoinColumn({ name: 'userID' })
  user: User;

  // One marker COULD have one image
  @OneToOne(() => Image, (image) => image.marker, {
    onDelete: 'SET NULL', // If an image is deleted, the marker is not deleted
    onUpdate: 'CASCADE', // If an image is updated, the marker is updated
  })
  @JoinColumn({ name: 'imageID' })
  image: Image;

  // One marker COULD have one contact (ex. for a service)
  @OneToOne(() => Contact, (contact) => contact.marker, {
    onDelete: 'SET NULL', // If a contact is deleted, the category is not deleted
    onUpdate: 'CASCADE', // If a contact is updated, all its categories are updated
  })
  @JoinColumn({ name: 'contactID' })
  contact: Contact;

  // Many marker COULD have one address
  @ManyToOne(() => Address, (address) => address.markers, {
    onDelete: 'SET NULL', // If an address is deleted, the marker is not deleted
    onUpdate: 'CASCADE', // If an address is updated, the marker is updated
  })
  @JoinColumn({ name: 'addressID' })
  address: Address;

  // Many like MUST have one marker
  @OneToMany(() => Like, (like) => like.marker)
  likes: Like[];
}
