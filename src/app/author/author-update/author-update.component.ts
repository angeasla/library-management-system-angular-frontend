import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorService } from '../author.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Author } from 'projects/shared/src/public-api';

@Component({
  selector: 'app-author-update',
  templateUrl: './author-update.component.html',
  styleUrls: ['./author-update.component.css']
})
export class AuthorUpdateComponent {
  authorForm: FormGroup;
  authorId: number | null = null;
  author: Author | null = null;

  constructor( 
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AuthorUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { authorId: number }
  ) {
    this.authorId = data.authorId;
    this.authorForm = this.fb.group({
      'firstname': ['', Validators.required],
      'lastname': ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.authorId) {
      this.authorService.getAuthorById(this.authorId).subscribe(author => {
        this.authorForm.patchValue({
          'firstname': author.firstname,
          'lastname': author.lastname,
        });
      });
    } 
  }

  updateAuthor(): void {
    if (this.authorForm.valid && this.authorId) {
      const authorData = {...this.authorForm.value};

      this.authorService.updateAuthor(this.authorId, authorData).subscribe(() => {
          this.snackBar.open('Author updated successfully!', '', {
              duration: 2000
          });
          this.dialogRef.close();
      });
   }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
