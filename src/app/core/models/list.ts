import { Movie, MovieSearch } from './movie';

export interface List {
    name: string;
    averageRating: string;
    numberOfMovies: number;
    movies?: Movie[];
    poster?: string[];
    editing?: boolean;
    changedName?: string;
}
