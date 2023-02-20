import { IsDate, IsNotEmpty, IsString } from "class-validator";


export class PostActionDto {
    
    @IsString()
    @IsNotEmpty()
    actionId: string;

    @IsDate()
    @IsNotEmpty()
    txDate: Date;
    
}