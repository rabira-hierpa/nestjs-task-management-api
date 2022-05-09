import { Get, Injectable } from '@nestjs/common';
import { Task, TaskStatus } from '../model/task.model';
import { v4 as uuid } from 'uuid';
import {
  CreateTaskDTO,
  GetTaskFilterDTO,
  UpdateTaskDTO,
} from '../dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilter(filterDto: GetTaskFilterDTO): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }

    return tasks;
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

  updateTask(updateTaskDto: UpdateTaskDTO): Task {
    let _task = this.findTaskById(updateTaskDto.id);
    _task = updateTaskDto;
    return _task;
  }

  findTaskById(taskId: string): Task {
    return this.tasks.find((task) => taskId === task.id);
  }

  deleteTaskById(taskId: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }
}
