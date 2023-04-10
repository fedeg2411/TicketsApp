import { Type } from "class-transformer";
import { IsArray, IsIn, IsInt, 
    IsNotEmpty, 
    IsObject, 
    IsOptional, IsPositive, 
    IsString, IsUUID, Min, MinLength, ValidateNested } from "class-validator";


export class CreateTicketDto {


    @IsString()
    @MinLength(3)
    title:string;

    @IsString()
    @IsIn(['Falla','Consulta','Reclamo'])
    category:string;


    @IsString()
    description:string;

    @ValidateNested({ each: true })
    @Type(() => DetailsDto)
    detail: DetailsDto[];

    @IsString()
    problem:string;

    @IsUUID()
    @IsOptional()
    image:string;

}
export class DetailsDto {
  
    @Type(()=> String)
    @IsString()
    @IsNotEmpty()
    date:string;
    
    @Type(()=> Number)
    @Min(0)
    invoiceNumber:number;
  
    @Type(()=> Number)
    @Min(0)
    productCode:number;
  }


