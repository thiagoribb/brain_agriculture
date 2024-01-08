import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Crop } from "./Crop";

@Entity("producers")
export class Producer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  identificationNumber: string;

  @Column()
  name: string;

  @Column()
  farmName: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  totalArea: number;

  @Column()
  arableArea: number;

  @Column()
  vegetationArea: number;

  @ManyToMany(() => Crop)
  @JoinTable()
  crops: Crop[];
}
