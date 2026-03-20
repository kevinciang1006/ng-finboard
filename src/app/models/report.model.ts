export interface Report {
  id: string;
  name: string;
  period: string;
  generatedDate: string; // ISO 8601 string from API
  status: 'ready' | 'processing';
}
