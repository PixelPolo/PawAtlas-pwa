import { User } from 'src/api/users/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Marker } from 'src/api/markers/entities/marker.entity';
import { Veterinarian } from 'src/api/veterinarians/entities/veterinarian.entity';

@Entity()
export class Contact {
  // contactID : Contact ID
  @PrimaryGeneratedColumn('uuid')
  contactID: string;

  // firstName : First name
  @Column({ type: 'varchar', length: 64, nullable: true })
  firstName: string;

  // lastName : Last name
  @Column({ type: 'varchar', length: 64, nullable: true })
  lastName: string;

  // phoneNumber : Phone number
  @Column({ type: 'varchar', length: 64, nullable: true })
  phoneNumber: string;

  // email : Email
  @Column({ type: 'varchar', length: 128, nullable: true })
  email: string;

  // website : Category website
  @Column({ type: 'varchar', length: 256, nullable: true })
  website: string;

  // ***** CONSTRAINTS *****

  // One user COULD have one contact
  @OneToOne(() => User, (user) => user.contact)
  user: User;

  // One marker COULD have one contact (ex. for a service)
  @OneToOne(() => Marker, (marker) => marker.contact)
  marker: Marker;

  // One veterinarian COULD have one contact
  @OneToOne(() => Veterinarian, (veterinarian) => veterinarian.contact)
  veterinarian: Veterinarian;
}
