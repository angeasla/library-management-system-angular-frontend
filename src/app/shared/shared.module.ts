import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from './translate.pipe';
import { LanguageSelectorComponent } from './language-selector.component';

@NgModule({
  declarations: [
    TranslatePipe,
    LanguageSelectorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TranslatePipe,
    LanguageSelectorComponent
  ]
})
export class SharedTranslationModule { }