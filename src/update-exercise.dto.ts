// update-exercise.dto.ts
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateExerciseDto {
  @IsString()
  @IsNotEmpty()
  exerciseName: string;

  @IsNumber()
  @IsNotEmpty()
  reps: number;

  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @IsString()
  @IsNotEmpty()
  intensity: string;
}
