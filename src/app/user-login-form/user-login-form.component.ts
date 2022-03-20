import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // Sends request to API for user login
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      //successful login
      (result) => {
        localStorage.setItem('user', result.user.Username);
        localStorage.setItem('token',result.token);
        this.dialogRef.close();
        console.log(result);
        this.snackBar.open('User logged in!', 'OK', {
          duration: 2000,
        });
        this.router.navigate(['movies']);
      },
      // error response
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 4000,
        });
      }
    );
  }
}