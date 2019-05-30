import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth/auth.service';
import { Bookmark } from 'src/app/models/bookmark.model';
import { BookmarkService } from 'src/app/services/bookmark/bookmark.service';

@Component({
  selector: 'app-bookmark-content',
  templateUrl: './bookmark-content.component.html',
  styleUrls: ['./bookmark-content.component.css']
})
export class BookmarkContentComponent implements OnInit {
  userProfile;
  bookmarks: Bookmark[];

  constructor(private authService: AuthService,
              private bookmarkService: BookmarkService) { }

  ngOnInit() {
    this.authService.getProfile()
      .subscribe(
        (data: any) => {
          this.userProfile = data.user;
          console.log(this.userProfile);
          this.bookmarkService.getBookmarks(this.userProfile._id)
            .subscribe(
              (data: any) => {
                this.bookmarks = data.bookmarks;
                console.log(this.bookmarks);
              },
              (error: any) => {
                console.log("Error occured : " + error);
              }
            );
        },
        (error: any) => {
          console.log("Error occured : " + error);
        }
      );
  }

}
