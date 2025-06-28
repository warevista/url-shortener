export interface Url {
    id: number;
    originalUrl: string;
    slug: string;
    visits: number;
    createdAt: string; // Type as string, as JSON does not have a Date type
  }