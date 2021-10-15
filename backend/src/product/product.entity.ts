import { IsNotEmpty, Min } from 'class-validator';
import { User } from '../users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  @Min(0)
  price: number;

  @Column()
  @IsNotEmpty()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User)
  user: number;

}