
import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class TicketQl {

  @Field( () => ID )
  id:string;

  @Field( () => String )
  title:string;

  @Field( () => String )
  category:string;

  @Field( () => String )
  detail:string;

  @Field( () => String )
  problem:string;

  @Field( () => String,{nullable:true} )
  image:string
}
