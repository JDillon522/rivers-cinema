import { Movie, MovieSearch } from './movie';

export interface List {
    name: string;
    movies?: Movie[];
    poster?: string[];
}
