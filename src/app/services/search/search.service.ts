import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Search } from '../../core/models/search';
import { Movie } from '../../core/models/movie';

@Injectable()
export class SearchService {

  constructor(
    private httpClient: HttpClient
  ) { }

  searchForMovie(term: string) {
    return this.httpClient.post('/api/search', JSON.stringify({search: term})).map((response: Search) => response);
  }

  getMovieData(id: string) {
    return this.httpClient.post('/api/movieData', JSON.stringify({id: id})).map((response: Movie) => response);
  }

}
