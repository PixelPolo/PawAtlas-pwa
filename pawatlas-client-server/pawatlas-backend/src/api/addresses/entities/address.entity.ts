import { Marker } from 'src/api/markers/entities/marker.entity';
import { User } from 'src/api/users/entities/user.entity';
import { Veterinarian } from 'src/api/veterinarians/entities/veterinarian.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address {
  // addressID : Address ID
  @PrimaryGeneratedColumn('uuid')
  addressID: string;

  // street : Address street
  @Column({ type: 'varchar', length: 128, nullable: true })
  street: string;

  // city : Address city
  @Column({ type: 'varchar', length: 128, nullable: true })
  city: string;

  // postalCode : Address postal code
  @Column({ type: 'varchar', length: 64, nullable: true })
  postalCode: string;

  // state : Address state
  @Column({ type: 'varchar', length: 128, nullable: true })
  state: string;

  // country : Address country
  @Column({ type: 'varchar', length: 128, nullable: true })
  country: string;

  // ***** CONSTRAINTS *****

  // Many user COULD have one address
  @OneToMany(() => User, (user) => user.address)
  users: User[];

  // Many marker COULD have one address
  @OneToMany(() => Marker, (marker) => marker.address)
  markers: Marker[];

  // Many veterinarian COULD have one address
  @OneToMany(() => Veterinarian, (veterinarian) => veterinarian.address)
  veterinarians: Veterinarian[];
}
