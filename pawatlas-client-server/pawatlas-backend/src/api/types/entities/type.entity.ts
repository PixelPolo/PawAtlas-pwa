import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Category } from 'src/api/categories/entities/category.entity';

@Entity()
export class Type {
  // typeID : Type ID
  @PrimaryColumn({ type: 'varchar', length: 8 })
  typeID: string;

  // typeName : Type name (e.g. 'interest', 'danger' or 'service')
  @Column({ type: 'varchar', length: 64 })
  typeName: string;

  // ***** CONSTRAINTS *****

  // Many category MUST have one type
  @OneToMany(() => Category, (category) => category.typeID)
  categories: Category[];
}
