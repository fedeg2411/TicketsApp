import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class StatusArgs{

    @Field(()=> Boolean,{nullable:true})
    status?:boolean
}