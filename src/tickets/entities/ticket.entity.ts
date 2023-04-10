import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { User } from 'src/auth/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


@Entity({name:'ticket'})
@ObjectType()
export class Ticket {

  @PrimaryGeneratedColumn('uuid')
  id:string;

  @Column()
  title:string;

  @Column()
  category:string;

  @Column()
  detail:string;

  @Column({nullable:false})
  problem:string;

  @Column({nullable:true})
  image:string

  @ManyToOne(
    ()=> User,
    (user) => user.ticket,
    {eager:true}
  )
  user:User;

}

