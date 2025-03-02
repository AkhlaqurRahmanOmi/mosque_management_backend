import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMosqueDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  contactInfo?: string; // Optional field
}