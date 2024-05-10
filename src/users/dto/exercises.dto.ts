// exercise.dto.ts

import { IsNotEmpty, IsString } from 'class-validator';

export class AddExerciseDto {
  @IsString()
  @IsNotEmpty()
  exerciseName: string;
  // Add other exercise properties if needed
}

export class DeleteExerciseDto {
  @IsString()
  @IsNotEmpty()
  exerciseName: string;
}
