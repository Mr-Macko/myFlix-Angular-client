import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-synopsis',
  templateUrl: './movie-synopsis.component.html',
  styleUrls: ['./movie-synopsis.component.scss'],
})
export class MovieSynopsisComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public movie: {
      Title: string;
      ImagePath: any;
      Description: string;
      Genre: string;
    }
  ) {}

  ngOnInit(): void {}
}