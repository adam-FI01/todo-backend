// weekly-stats.dto.ts

import { IsString, IsNotEmpty } from 'class-validator';

export class WeeklyStatsDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  exerciseName: string;
}
