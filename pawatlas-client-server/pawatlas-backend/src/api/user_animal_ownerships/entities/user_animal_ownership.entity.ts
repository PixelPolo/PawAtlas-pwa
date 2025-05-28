import { Animal } from 'src/api/animals/entities/animal.entity';
import { User } from 'src/api/users/entities/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class UserAnimalOwnership {
  // userID : User ID
  @PrimaryColumn({ type: 'varchar', length: 128 })
  userID: string;

  // animalID : Animal ID
  @PrimaryColumn({ type: 'uuid' })
  animalID: string;

  // ***** CONSTRAINTS *****

  // Many userAnimalOwnership MUST have one user
  @ManyToOne(() => User, (user) => user.userAnimalOwnerships, {
    onDelete: 'CASCADE', // If a user is deleted, the userAnimalOwnership is deleted
    onUpdate: 'CASCADE', // If a user is updated, the userAnimalOwnership is updated
  })
  @JoinColumn({ name: 'userID' })
  user: User;

  // Many userAnimalOwnership MUST have one animal
  @ManyToOne(() => Animal, (animal) => animal.userAnimalOwnerships, {
    onDelete: 'CASCADE', // If an animal is deleted, the userAnimalOwnership is deleted
    onUpdate: 'CASCADE', // If an animal is updated, the userAnimalOwnership is updated
  })
  @JoinColumn({ name: 'animalID' })
  animal: Animal;
}
