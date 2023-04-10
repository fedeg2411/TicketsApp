import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TicketQl } from './entity/graph.entity';
import { TodoService } from './graph.service';
import { StatusArgs } from './dto/args/status.args';
import { Ticket } from 'src/tickets/entities/ticket.entity';

@Resolver( )
export class TodoResolver {

    constructor(
        private readonly todoService: TodoService
    ){}

    @Query( () => [TicketQl],{name:'tickets'} )
    findAll(
        @Args() statusArgs:StatusArgs
    ){

        return this.todoService.findAll();
    }

    @Query(() => TicketQl ,{name:'todo'})
    findOne(
        @Args('id',{type:()=> Int}) id : string ){

            return this.todoService.findOne(id)
        }

    
}

