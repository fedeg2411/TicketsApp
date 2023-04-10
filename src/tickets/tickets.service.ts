import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { Like, Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { paginationDtos } from './dto/pagination.dto';
import { CategoryDto } from './dto/category.dto';
import { AwsService } from '../common/awsService.service';
import {v4 as uuid} from 'uuid';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class TicketsService {

  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    private readonly awsService: AwsService
  ){

  }

  async create(createTicketDto: CreateTicketDto,user:User): Promise<Ticket> {
    const {detail ,...others} = createTicketDto;
    let csv = ''
    detail.map(data => {
      csv = csv + data.date + ',' + data.invoiceNumber + ',' + data.productCode + ';'
    })
    const newItem = this.ticketRepository.create({...createTicketDto,detail:csv,user});
    newItem.user = user
    return await this.ticketRepository.save(newItem);
  }

  async findAll(paginationDto?: paginationDtos) {
    const {limit=10 , offset= 0} = paginationDto
    const products = await this.ticketRepository.find({
      take:limit,
      skip:offset,
    })

    return products
  }

  async findOne(id: string):Promise<Ticket> {

    const item = await this.ticketRepository.findOneBy({id})


    if (!item) throw new NotFoundException(`Item with id = ${id} not exist in db`)


    const getImage =await this.awsService.getImageFromBucket(item.image,'images')

    return {...item,image:getImage};
  }

  async update(id: string, updateTicketDto: UpdateTicketDto): Promise<Ticket> {

    const {detail ,...others} = updateTicketDto;
    let csv = ''
    detail.map(data => {
      csv = csv + data.date + ',' + data.invoiceNumber + ',' + data.productCode + ';'
    })
    
    const item = await this.ticketRepository.preload( {...updateTicketDto,id:id,detail:csv} )

    if (!item) throw new NotFoundError(`Item with id = ${id} not exist in db`)
    
    return this.ticketRepository.save({...updateTicketDto,detail:csv});
  }

  async remove(id: string) {

    const item = await this.findOne(id)

    await this.ticketRepository.remove(item)

    return {message:'Se borro con exito.'};
  }

  async findCat(cat:string){

    const tickets = await this.ticketRepository.find({where:{category : cat}})

    if(!tickets[0]) throw new NotFoundException('No se encontraron registros') 

    return tickets;
  }

  async getImage(id:string){
    return await this.awsService.getImageFromBucket(id,'images')
  }

  async newImage(file:Express.Multer.File){
    const nombre = uuid()
   return await this.awsService.uploadImage(nombre,'images',file)
  }

  async getOneLike(params:string){

    const ticket = await this.ticketRepository.find({
      where:[
        {title:Like(`%${params}%`)},{problem:Like(`%${params}%`)}]
    })
   
    return ticket
  }

 
}

