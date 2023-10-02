import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthorService } from '../author.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Author } from 'projects/shared/src/public-api';
import { MAT_DIALOG_DATA ,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-author-insert',
  templateUrl: './author-insert.component.html',
  styleUrls: ['./author-insert.component.css']
})
export class AuthorInsertComponent {
  authors: Author[] = [];

  constructor(
    private authorService: AuthorService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AuthorInsertComponent>,
    private router: Router) { }

    authorForm = new FormGroup({
      firstname: new FormControl('',),
      lastname: new FormControl('', Validators.required),
    });
  
    onSubmit() {
      if (this.authorForm.valid) {
        this.authorService.createAuthor(this.authorForm.value as Partial<Author>).subscribe(author => {
          this.authors.push(author); 
          this.snackBar.open('Author created successfully!', '', {
            duration: 4000, 
          });
          this.dialogRef.close();
        });
      }
    }

    onCancelClick(): void {
      this.dialogRef.close();
    }
}
