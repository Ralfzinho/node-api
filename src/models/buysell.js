import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "./User.js";
import { Game } from "./Game.js";

@Entity("buysells")
class Buysell {
  @PrimaryGeneratedColumn()
  id;

  @Column({
    type: "int",
    nullable: false,
  })
  userId;

  @Column({
    type: "int",
    nullable: false,
  })
  gameId;

  @Column({
    type: "varchar",
    nullable: false,
  })
  title;

  @Column({
    type: "text",
    nullable: true,
  })
  description;

  @Column({
    type: "enum",
    enum: ["buy", "sell"],
    nullable: false,
  })
  type;

  @Column({
    type: "int",
    nullable: false,
  })
  price;

  @Column({
    type: "int",
    nullable: false,
  })
  finalPrice;

  @Column({
    type: "int",
    nullable: false,
    default: 1,
  })
  quantity;

  @Column({
    type: "varchar",
    nullable: true,
  })
  image;

  @Column({
    type: "enum",
    enum: ["active", "sold", "closed"],
    default: "active",
    nullable: false,
  })
  status;

  @ManyToOne(() => User, (user) => user.buysells)
  @JoinColumn({ name: "userId" })
  user;

  @ManyToOne(() => Game, (game) => game.buysells)
  @JoinColumn({ name: "gameId" })
  game;

  @CreateDateColumn()
  createdAt;

  @UpdateDateColumn()
  updatedAt;
}

export { Buysell };