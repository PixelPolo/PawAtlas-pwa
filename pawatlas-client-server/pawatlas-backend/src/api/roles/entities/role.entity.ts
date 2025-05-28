import { User } from 'src/api/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Role {
  // roleID : Role ID
  @PrimaryColumn({ type: 'varchar', length: 8 })
  roleID: string;

  // roleName : Role name
  @Column({ type: 'varchar', length: 64, unique: true })
  roleName: string;

  // roleDescription : Role description
  @Column({ type: 'varchar', length: 128 })
  roleDescription: string;

  // ***** CONSTRAINTS *****

  // Many user MUST have one role
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
