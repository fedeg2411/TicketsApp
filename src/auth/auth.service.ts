import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from "bcrypt";
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './interfaces/jwt.strategy.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>,
    private jwtService:JwtService
  ){}

  async create(createUserDto: CreateUserDto) {

    const { password, ...userData} = createUserDto;

    try {

      const user = await this.userRepository.create({
        ...userData,
        password:bcrypt.hashSync(password,10)
      })
      await this.userRepository.save(user)
      delete user.password;
      return user;

    } catch (error) {
      throw new BadRequestException(error.detail)
    }
    
  }

  async login(loginDto:LoginDto){
    try {
      const { password, email} = loginDto;
      let user = await this.userRepository.findOne({
        where:{email},
        select:{email:true,password:true,id:true}
      })
      if (!user){
        throw new UnauthorizedException('email')
      }
      if(!bcrypt.compareSync(password,user.password)){
        throw new UnauthorizedException('passw')
      }
      return {
      token:this.getJwt({id:user.id})
      };


    } catch (error) {
      throw new BadRequestException(error.response)
    }
  }


  getJwt(Payload:JwtPayload){

    const token = this.jwtService.sign(Payload)
    
    return token;
  }

  async makeAdmin(userId:string){
    const userBd =await this.userRepository.preload({id:userId})

    return await this.userRepository.save({...userBd,roles:['user','admin']})

  }
  
}
