import { MovieSearch } from './movie';

export interface Search {
    Response: string;
    Search?: MovieSearch[];
    totalResults?: string;
    Error?: string;
}
