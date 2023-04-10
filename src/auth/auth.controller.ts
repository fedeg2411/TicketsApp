import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Auth } from './decorators/auth.decorator';
import { ValidRoles } from './interfaces/valid-roles';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }
  
  
  @Post('login')
  async login(@Body() loginDto:LoginDto){
    return this.authService.login(loginDto)
  }

  
  @Auth(ValidRoles.user)
  @Post('admin')
  makeAdmin(@Body() body:{id:string}){
    return this.authService.makeAdmin(body.id)
  }


}