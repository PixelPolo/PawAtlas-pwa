import { Role } from 'src/api/roles/entities/role.entity';
import { Like } from 'src/api/likes/entities/like.entity';
import { Marker } from 'src/api/markers/entities/marker.entity';
import { Contact } from 'src/api/contacts/entities/contact.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Address } from 'src/api/addresses/entities/address.entity';
import { UserAnimalOwnership } from 'src/api/user_animal_ownerships/entities/user_animal_ownership.entity';
import { Gender } from 'src/api/genders/entities/gender.entity';

@Entity()
export class User {
  // userID : User ID - from Firebase Auth
  @PrimaryColumn({ type: 'varchar', length: 128 })
  userID: string;

  // displayName : User's display name
  @Column({ type: 'varchar', length: 64, unique: true })
  displayName: string;

  // roleID : Role ID
  @Column({ type: 'varchar', length: 8 })
  roleID: string;

  // contactID : Contact ID
  @Column({ type: 'uuid', nullable: true })
  contactID: string;

  // addressID : Address ID
  @Column({ type: 'uuid', nullable: true })
  addressID: string;

  // genderID: Gender ID
  @Column({ type: 'varchar', length: 8, nullable: true })
  genderID: string;

  // ***** CONSTRAINTS *****

  // Many user MUST have one role
  @ManyToOne(() => Role, (role) => role.users, {
    onDelete: 'RESTRICT', // Prevent deletion of a role if it is assigned to a user
    onUpdate: 'CASCADE', // If a role is updated, all its users are updated
  })
  @JoinColumn({ name: 'roleID' })
  role: Role;

  // One user COULD have one contact
  @OneToOne(() => Contact, (contact) => contact.user, {
    onDelete: 'SET NULL', // If a contact is deleted, the user is not deleted
    onUpdate: 'CASCADE', // If a contact is updated, all its users are updated
  })
  @JoinColumn({ name: 'contactID' })
  contact: Contact;

  // Many user COULD have one address
  @ManyToOne(() => Address, (address) => address.users, {
    onDelete: 'SET NULL', // If an address is deleted, the user is not deleted
    onUpdate: 'CASCADE', // If an address is updated, all its users are updated
  })
  @JoinColumn({ name: 'addressID' })
  address: Address;

  // Many user COULD have one gender (if they complete their account)
  @ManyToOne(() => Gender, (gender) => gender.users, {
    onDelete: 'SET NULL', // If a gender is deleted, the user is not deleted
    onUpdate: 'CASCADE', // If a gender is updated, the user is updated
  })
  @JoinColumn({ name: 'genderID' })
  gender: Gender;

  // One user COULD have multiple markers
  @OneToMany(() => Marker, (marker) => marker.user)
  markers: Marker[];

  // Many like MUST have one user
  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  // Many userAnimalOwnership MUST have one user
  @OneToMany(
    () => UserAnimalOwnership,
    (userAnimalOwnership) => userAnimalOwnership.user,
  )
  userAnimalOwnerships: any;
}
