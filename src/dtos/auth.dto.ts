import { IsString, 
    IsNotEmpty, 
    IsEmail, 
    MinLength,
    IsNumber } from 'class-validator'


export class SignupDto {
@IsString()
@IsNotEmpty()
@MinLength(2)
name: string;

@IsNumber()
@IsNotEmpty()
department: number;

@IsEmail()
email: string;

@IsString()
@IsNotEmpty()
@MinLength(4)
username: string;

@IsString()
@MinLength(8)
@IsNotEmpty()
password: string;


}