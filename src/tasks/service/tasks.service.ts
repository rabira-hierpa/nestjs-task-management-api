import { Get, Injectable } from '@nestjs/common';
import { Task, TaskStatus } from '../model/task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDTO } from '../dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(newTaskDto: CreateTaskDTO): Task {
    const { title, description } = newTaskDto;
    const newTask: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  findTaskById(taskId: string): Task {
    return this.tasks.find((task) => taskId === task.id);
  }
}
