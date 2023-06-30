import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { SharedModule } from 'projects/shared/src/public-api';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';





const routes: Routes = [  

  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'book', loadChildren: () => import('./book/book.module').then(m => m.BookModule) },
  { path: 'borrow', loadChildren: () => import('./borrow/borrow.module').then(m => m.BorrowModule) },


  {
    path: '', component: WelcomePageComponent
  },

  {
    path: '**', component: PageNotFoundComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    DropdownComponent,
    PageNotFoundComponent,
    WelcomePageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    SharedModule,
    BrowserAnimationsModule,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
