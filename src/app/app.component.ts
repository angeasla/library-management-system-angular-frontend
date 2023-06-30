import { Component } from '@angular/core';
import { usersMenu, booksMenu } from 'projects/shared/src/public-api';
import { MenuItem } from 'projects/shared/src/public-api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Library Management System';

  usersMenu = usersMenu;
  productsMenu = booksMenu;
}
