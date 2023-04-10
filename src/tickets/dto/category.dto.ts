import { IsIn, IsString } from "class-validator";

export class CategoryDto {
    @IsString()
    @IsIn(['Falla','Consulta','Reclamo'])
    category:string;
}