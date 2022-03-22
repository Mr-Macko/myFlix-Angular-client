import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

// Get local storage data...
const token = localStorage.getItem('token'); // for token
const username = localStorage.getItem('Username'); // for user

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://max-movie-api.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  constructor(private http: HttpClient, private router: Router) {}

  /**
   * User registration
   * @param userDetails JSON object of user data
   * @returns new JSON user data object
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Logs in registered user
   * @param userDetails JSON object of user data
   * @returns JSON user data object
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Retrieve all movies
   * @returns JSON Movie objects array
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieve single movie by title
   * @param title title of movie
   * @returns JSON Movie object
   */
  getMovie(title: string): Observable<any> {
    return this.http
      .get(apiUrl + `movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieve single genre by name
   * @param name name of genre
   * @returns JSON Movie objects array
   */
  getGenre(name: string): Observable<any> {
    return this.http
      .get(apiUrl + `genres/${name}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieve single director by name
   * @param name name of director
   * @returns JSON director object
   */
  getDirector(name: string): Observable<any> {
    return this.http
      .get(apiUrl + `directors/${name}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieve user by username
   * @returns JSON User data object
   */
  getUser(): Observable<any> {
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieve user's data to extract favorite movies
   * @returns JSON User data object
   */
  getFavorites(): Observable<any> {
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Add movie by id to user favorites.
   * @param id selected movie's id
   * @returns JSON array of favorites
   */
  addFavorite(id: string): Observable<any> {
    return this.http
      .post(apiUrl + `users/${username}/movies/${id}`, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Update user profile.
   * @param username user's username
   * @param userData JSON object of user data
   * @returns updated JSON object of user data
   */
  editUserProfile(username: string, userData: object): Observable<any> {
    return this.http
      .put(apiUrl + `users/${username}`, userData, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Delete user profile.
   */
  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Delete movie from user's favorites.
   * @param id selected movie's id
   * @returns updated JSON array of favorites
   */
  deleteFavorite(id: string): Observable<any> {
    return this.http
      .delete(apiUrl + `users/${username}/movies/${id}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Extract data response
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  // Error handler
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something went wrong; please try again.');
  }
}
