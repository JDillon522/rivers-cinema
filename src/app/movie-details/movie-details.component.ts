import { Component, OnInit } from '@angular/core';
import * as fromRoot from '../core/application-state';
import { Store } from '@ngrx/store';
import { Movie } from '../core/models/movie';
import * as _ from 'lodash';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  public movie: Movie;
  public _movieDetails: Movie;

  get movieDetails(): Movie {
    return this._movieDetails;
  }

  get poster(): string {
    return _.get(this.movie, 'Poster') !== 'N/A' ? this.movie.Poster : '../../assets/img/posterTemplate.jpg';
  }

  set movieDetails(movie) {
    if (movie) {
      const newMovie = _.clone(movie);
      delete newMovie.Title;
      delete newMovie.Plot;
      delete newMovie.Director;
      delete newMovie.Poster;
      delete newMovie.Year;
      delete newMovie.Ratings;
      delete newMovie.Response;
      this._movieDetails = newMovie;
    }
  }

  constructor(
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.store.select(fromRoot.getSelectedMovie).subscribe(movie => {
      this.movieDetails = this.movie = movie;
    });
  }

}
