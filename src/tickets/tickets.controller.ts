import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { paginationDtos } from './dto/pagination.dto';
import { CategoryDto } from './dto/category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/interfaces/valid-roles';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Auth(ValidRoles.admin)
  @Post()
  create(@Body() createTicketDto: CreateTicketDto,
         @GetUser() user:User) {
    return this.ticketsService.create(createTicketDto,user);
  }

  @Auth(ValidRoles.user)
  @Get('getAll')
  findAll(@Query() paginationDto:paginationDtos) {
    return this.ticketsService.findAll(paginationDto);
  }

  @Auth(ValidRoles.admin)
  @Get('getOne/:id')
  findOne(@Param('id',ParseUUIDPipe) id: string) {
    return this.ticketsService.findOne(id);
  }

  @Auth(ValidRoles.admin)
  @Patch(':id')
  update(@Param('id',ParseUUIDPipe) id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(id, updateTicketDto);
  }

  @Auth(ValidRoles.admin)
  @Delete(':id')
  remove(@Param('id',ParseUUIDPipe) id: string) {
    return this.ticketsService.remove(id);
  }
  @Auth(ValidRoles.user)
  @Get('category/:cat')
  getWithCat(@Param('cat') cat: string){
    return this.ticketsService.findCat(cat)
  }

  @Auth(ValidRoles.user)
  @Get('like/:params')
  async getOneLike(@Param('params') params:string){
    return await this.ticketsService.getOneLike(params);
  }

  @Auth(ValidRoles.user)
  @Get('bucket/image/:id')
  getImage(@Param('id') id :string){
    return this.ticketsService.getImage(id)  
  }

  @Auth(ValidRoles.user)
  @Post('bucket/image/new')
  @UseInterceptors(FileInterceptor('file'))
  async newImage(@UploadedFile() file:Express.Multer.File){
    return await this.ticketsService.newImage(file);

  }

  
}
