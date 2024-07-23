export interface Task {
  _id?: string;
  title: string;
  description: string;
  schedule: string;
  notes?: string;
  created?: string;
  updated?: string;
  completed: boolean;
}
