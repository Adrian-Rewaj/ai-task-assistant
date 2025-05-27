export class Task {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public status: 'pending' | 'in-progress' | 'completed' = 'pending',
  ) {}
}
