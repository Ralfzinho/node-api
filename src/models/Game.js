import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { User } from "./User.js";
import { Review } from "./Review.js";
import { Buysell } from "./buysell.js";

@Entity("games")
class Game {
  @PrimaryGeneratedColumn()
  id;

  @Column({
    type: "varchar",
    nullable: false,
  })
  title;

  @Column({
    type: "varchar",
    nullable: true,
  })
  genre;

  @Column({
    type: "int",
    nullable: true,
  })
  releaseYear;

  @ManyToMany(() => User, (user) => user.games)
  users;

  @OneToMany(() => Review, (review) => review.game)
  reviews;

  @OneToMany(() => Buysell, (buysell) => buysell.game)
  buysells;
}

export { Game };