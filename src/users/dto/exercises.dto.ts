// exercise.dto.ts

import { IsString } from 'class-validator';

export class AddExerciseDto {
  @IsString()
  name: string;
  // Add other exercise properties if needed
}

export class DeleteExerciseDto {
  @IsString()
  readonly exerciseId: string;
}
