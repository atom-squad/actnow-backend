import { IsDate, IsNotEmpty, IsString } from "class-validator";


export class PostActionDto {
    
    @IsString()
    @IsNotEmpty()
    actionId: string;


    txDate: Date;

}