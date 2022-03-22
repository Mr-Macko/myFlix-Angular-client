import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any [] = [];
  favorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

    // Get list of user favorites
    getFavorites(): void {
      this.fetchApiData.getUser().subscribe((resp: any) => {
        this.favorites = resp.FavoriteMovies;
        // console.log(this.favorites);
        return this.favorites;
      });
    }
  
    /**
     * Returns if movie id is in list of user's favorited movies.
     * @param id id of selected movie
     * @returns boolean
     */
    isFavorited(id: string): boolean {
      return this.favorites.includes(id);
    }
  
    /**
     * Adds selected movie to user favorites.
     * @param id id of selected movie
     */
    handleFavorite(id: string): void {
      this.fetchApiData.addFavorite(id).subscribe(() => {
        this.getFavorites();
      });
    }
  
   
    /**
    * Deletes selected movie to user favorites.
    * @param id id of selected movie
    */
    handleUnfavorite(id: string): void {
      this.fetchApiData.deleteFavorite(id).subscribe(() => {
        this.getFavorites();
      });
    }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe(( resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

   /**
   * Opens synopsis dialog.
   * @param title movie's title
   * @param imagePath movie's production poster
   * @param description movie's description
   */
   openSynopsis(title: string, imagePath: any, description: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: {
        Title: title,
        ImagePath: imagePath,
        Description: description,
      },
      width: '500px',
    });
  }

  /**
   * Opens genre dialog.
   * @param name genre's name
   * @param description genres's descripton
   */
  openGenre(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px',
    });
  }

  /**
   * Opens the director dialog.
   * @param name director's name
   * @param bio director's biography
   * @param birth director's birth year
   */
  openDirector(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      },
      width: '500px',
    });
  }

// Router...
  // to movies
  goToMoviesPage(): void {
    this.router.navigate(['movies']);
  }
  // to profile
  goToProfilePage(): void {
    this.router.navigate(['profile']);
  }

  // for logout
  logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']).then(() => {
      // window.location.reload();
    });
  }

}
