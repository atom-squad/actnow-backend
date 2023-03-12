import { IsNotEmpty, IsString } from 'class-validator';

export class AddPointsDto {
  @IsNotEmpty()
  points: number;

  @IsString()
  origin: string;
}
