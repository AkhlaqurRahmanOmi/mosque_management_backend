import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreatePrayerTimesDto {

  mosqueId: number;

  @IsString()
  @IsNotEmpty()
  fajr: string; // Format: "HH:mm"

  @IsString()
  @IsNotEmpty()
  dhuhr: string;

  @IsString()
  @IsNotEmpty()
  asr: string;

  @IsString()
  @IsNotEmpty()
  maghrib: string;

  @IsString()
  @IsNotEmpty()
  isha: string;

  @IsDateString()
  date: string; // Format: "YYYY-MM-DD"
}