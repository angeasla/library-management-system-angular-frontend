import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthorService } from '../author.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-author-delete',
  templateUrl: './author-delete.component.html',
  styleUrls: ['./author-delete.component.css']
})
export class AuthorDeleteComponent {
  @Input() authorId!: number;
  @Output() onDeleted = new EventEmitter<void>();

  constructor(private authorService: AuthorService, private snackBar: MatSnackBar) { }

  deleteAuthor() {
    this.authorService.deleteAuthor(this.authorId).subscribe(() => {
      console.log("Delete button clicked");
      this.snackBar.open('Author deleted successfully!', '', {
        duration: 4000,
      });
      this.onDeleted.emit();
    });
  }
}
