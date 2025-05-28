import { Address } from 'src/api/addresses/entities/address.entity';
import { Animal } from 'src/api/animals/entities/animal.entity';
import { Contact } from 'src/api/contacts/entities/contact.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Veterinarian {
  // veterinarianID : Veterinarian ID
  @PrimaryGeneratedColumn('uuid')
  veterinarianID: string;

  // contactID : Contact ID
  @Column({ type: 'uuid', nullable: true })
  contactID: string;

  // addressID : Address ID
  @Column({ type: 'uuid', nullable: true })
  addressID: string;

  // ***** CONSTRAINTS *****

  // One veterinarian COULD have one contact
  @OneToOne(() => Contact, (contact) => contact.veterinarian, {
    onDelete: 'SET NULL', // If a contact is deleted, the veterinarian is not deleted
    onUpdate: 'CASCADE', // If a contact is updated, the veterinarian is updated
  })
  @JoinColumn({ name: 'contactID' })
  contact: Contact;

  // Many veterinarian COULD have one address
  @ManyToOne(() => Address, (address) => address.veterinarians, {
    onDelete: 'SET NULL', // If an address is deleted, the veterinarian is not deleted
    onUpdate: 'CASCADE', // If an address is updated, the veterinarian is updated
  })
  @JoinColumn({ name: 'addressID' })
  address: Address;

  // One veterinarian COULD have many animals
  @OneToMany(() => Animal, (animal) => animal.veterinarian)
  animals: Animal[];
}
