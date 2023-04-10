import { Injectable, NotFoundException } from '@nestjs/common';
import { StatusArgs } from './dto/args/status.args';
import { Repository } from 'typeorm';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodoService {

    constructor(
        @InjectRepository(Ticket)
        private readonly ticketRepository: Repository<Ticket>
    ){}

async findAll(){
    return await this.ticketRepository.find()
}
async findOne(id:string){
    const ticket = await this.ticketRepository.findOneBy({id})

    return ticket;
}

}
