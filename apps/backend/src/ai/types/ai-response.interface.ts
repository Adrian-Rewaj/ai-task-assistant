export interface AiTaskResponse {
  mainTask: {
    title: string;
    description: string;
  };
  subtasks: Array<{
    title: string;
    description: string;
    priority: number;
  }>;
} 