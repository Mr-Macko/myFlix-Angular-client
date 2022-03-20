 import { Component, OnInit } from '@angular/core';
 import { MatDialog } from '@angular/material/dialog';
 import { MatSnackBar } from '@angular/material/snack-bar';
 import { Router } from '@angular/router';
 import { UpdateUserProfileComponent } from '../update-user-profile/update-user-profile.component';
 import { FetchApiDataService } from '../fetch-api-data.service';
 
 @Component({
   selector: 'app-profile-view',
   templateUrl: './user-profile.component.html',
   styleUrls: ['./user-profile.component.scss'],
 })
 export class UserProfileComponent implements OnInit {
   user: any = {};
   favorites: any[] = [];
 
   constructor(
     public fetchApiData: FetchApiDataService,
     public snackBar: MatSnackBar,
     public dialog: MatDialog,
     public router: Router
   ) {}
 
   // Gets user when page is loaded
   ngOnInit(): void {
     this.getUser();
   }
 
   //Retrieves user data from API, loads user's favorites
   getUser(): void {
     let user = localStorage.getItem('Username');
     console.log(user);
     this.fetchApiData.getUser().subscribe((res: any) => {
       this.user = res;
       this.getFavorites();
     });
   }
 
  //  // Open dialog with user form component to update user details
   updateUserDetails(): void {
     this.dialog.open(UpdateUserProfileComponent, { width: '500px' });
   }
 
   // Get list of user favorites
   getFavorites(): void {
     this.fetchApiData.getAllMovies().subscribe((res: any) => {
       this.favorites = res.filter((movie: any) => {
         return this.user.FavoriteMovies.includes(movie._id);
       });
       console.log(this.favorites);
       return this.favorites;
     });
   }
 
    // Deletes selected movie to user favorites.
   deleteFavorite(id: string): void {
     this.fetchApiData.deleteFavorite(id).subscribe((res: any) => {
       this.snackBar.open(`Successfully removed from favorite movies.`, 'OK', {
         duration: 2000,
       });
       this.ngOnInit();
       return this.favorites;
     });
   }
 

  // Open confirmation to delete profile or cancel; if confirmed: deletes account, clears local storage, and reroutes to welcome screen.
   deleteUser(): void {
     if (confirm('Are you sure? This cannot be undone.')) {
       this.fetchApiData.deleteUser().subscribe(
         () => {
           this.snackBar.open('Your account was deleted.', 'OK', {
             duration: 3000,
           });
           localStorage.clear();
         },
         () => {
           this.router.navigate(['welcome']).then(() => {
             window.location.reload();
           });
         }
       );
     }
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
