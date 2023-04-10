
import {  IsNotEmpty, IsString, Min } from 'class-validator';

export class DetailDto {
  
  @IsString()
  @IsNotEmpty()
  date:string;
  
  @Min(0)
  invoiceNumber:number;

  @Min(0)
  productCode:number;
}