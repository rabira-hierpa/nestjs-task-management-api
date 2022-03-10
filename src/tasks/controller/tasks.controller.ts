import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDTO } from '../dto/create-task.dto';
import { Task } from '../model/task.model';
import { TasksService } from '../service/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get('/getAll')
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param() taskId: string): Task {
    return this.taskService.findTaskById(taskId);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDTO): Task {
    return this.taskService.createTask(createTaskDto);
  }
}
