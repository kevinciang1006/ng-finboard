export interface Report {
  id: string;
  name: string;
  period: string;
  generated_date: Date;
  status: 'ready' | 'processing';
}
