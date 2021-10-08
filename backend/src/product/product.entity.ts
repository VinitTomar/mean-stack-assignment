import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    unique: true
  })
  name: string;

  @Column()
  price: number;

  @ManyToOne(() => User)
  user: number;

}