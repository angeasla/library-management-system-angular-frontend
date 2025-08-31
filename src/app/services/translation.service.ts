import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export type Language = 'en' | 'el';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLanguage = new BehaviorSubject<Language>('el');
  private translations: { [key: string]: any } = {};

  constructor(private http: HttpClient) {
    this.loadTranslations();
  }

  get currentLanguage$(): Observable<Language> {
    return this.currentLanguage.asObservable();
  }

  getCurrentLanguage(): Language {
    return this.currentLanguage.value;
  }

  setLanguage(language: Language): void {
    this.currentLanguage.next(language);
    localStorage.setItem('language', language);
    this.loadTranslations();
  }

  private loadTranslations(): void {
    const language = this.getCurrentLanguage();
    this.http.get(`/assets/i18n/${language}.json`).subscribe(
      (translations) => {
        this.translations = translations;
      }
    );
  }

  translate(key: string): string {
    const keys = key.split('.');
    let translation = this.translations;
    
    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof translation === 'string' ? translation : key;
  }

  // Helper method for templates
  t(key: string): string {
    return this.translate(key);
  }
}