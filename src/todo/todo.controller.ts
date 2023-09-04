import { Controller, Get } from '@nestjs/common';

@Controller('todo')
export class TodoController {
  @Get()
  getAllTodos(): string[] {
    return ['Todo1', 'Todo2'];
  }
}
