import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Producer } from "./Producer";

@Entity("crops")
export class Crop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Producer, (producer) => producer.crops)
  producers: Producer[];
}
