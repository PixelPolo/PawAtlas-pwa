import { Animal } from 'src/api/animals/entities/animal.entity';
import { User } from 'src/api/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Gender {
  // genderID : gender ID
  @PrimaryColumn({ type: 'varchar', length: 8 })
  genderID: string;

  // genderName : gender Name (eg. 'male' or 'female')
  @Column({ type: 'varchar', length: 64 })
  genderName: string;

  // ***** CONSTRAINTS *****

  // Many animal MUST have one gender
  @OneToMany(() => Animal, (animal) => animal.gender)
  animals: Animal[];

  // Many user COULD have one gender (if they complete their account)
  @OneToMany(() => User, (user) => user.gender)
  users: User[];
}
