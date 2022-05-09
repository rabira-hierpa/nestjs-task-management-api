import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  CreateTaskDTO,
  GetTaskFilterDTO,
  UpdateTaskDTO,
} from '../dto/create-task.dto';
import { Task } from '../model/task.model';
import { TasksService } from '../service/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get('/getAll')
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDTO): Task[] {
    if (Object.keys(filterDto).length) {
      return this.taskService.getTasksWithFilter(filterDto);
    }
    return this.taskService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param() taskId: string): Task {
    return this.taskService.findTaskById(taskId);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDTO): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Patch('/:id')
  updateTask(@Body() updateTaskDto: UpdateTaskDTO): Task {
    return this.taskService.updateTask(updateTaskDto);
  }

  @Delete(':id')
  deleteTaskById(@Param() taskId: string): void {
    return this.taskService.deleteTaskById(taskId);
  }
}
