import { TaskStatus } from '../model/task.model';

export class CreateTaskDTO {
  id?: string;
  title: string;
  description: string;
  status?: TaskStatus;
}

export class UpdateTaskDTO {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export class GetTaskFilterDTO extends CreateTaskDTO {
  search?: string;
}
