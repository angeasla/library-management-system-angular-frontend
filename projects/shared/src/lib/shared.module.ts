import { NgModule } from '@angular/core';
import { SharedComponent } from './shared.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    SharedComponent,
  ],
  imports: [
    FormsModule
  ],
  exports: [
    SharedComponent,
  ]
})
export class SharedModule { }
