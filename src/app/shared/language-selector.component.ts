import { Component } from '@angular/core';
import { TranslationService, Language } from '../services/translation.service';

@Component({
  selector: 'app-language-selector',
  template: `
    <div class="language-selector">
      <select 
        [value]="translationService.getCurrentLanguage()" 
        (change)="onLanguageChange($event)">
        <option value="el">Ελληνικά</option>
        <option value="en">English</option>
      </select>
    </div>
  `,
  styles: [`
    .language-selector {
      display: inline-block;
    }
    
    select {
      padding: 5px 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      background-color: white;
      cursor: pointer;
    }
    
    select:focus {
      outline: none;
      border-color: #007bff;
    }
  `]
})
export class LanguageSelectorComponent {
  constructor(public translationService: TranslationService) {}

  onLanguageChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.translationService.setLanguage(target.value as Language);
  }
}