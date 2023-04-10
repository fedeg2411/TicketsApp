import { Module } from '@nestjs/common';
import { TodoResolver } from './graph.resolver';
import { TodoService } from './graph.service';
import { TicketsService } from '../tickets/tickets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from 'src/tickets/entities/ticket.entity';

@Module({
  providers: [TodoResolver, TodoService],
  imports:[
    TypeOrmModule.forFeature([ Ticket]),
    ]
})
export class TodoModule {}
