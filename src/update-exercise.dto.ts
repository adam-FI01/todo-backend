// update-exercise.dto.ts

import { IsNotEmpty, IsNumber } from 'class-validator';

// update-exercise.dto.ts
export class UpdateExerciseDto {
  exerciseName: string;
  reps: number;
  weight: number;
}
