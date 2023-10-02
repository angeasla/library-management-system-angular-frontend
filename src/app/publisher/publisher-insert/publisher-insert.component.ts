import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Publisher } from 'projects/shared/src/public-api';
import { PublisherService } from '../publisher.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-publisher-insert',
  templateUrl: './publisher-insert.component.html',
  styleUrls: ['./publisher-insert.component.css']
})
export class PublisherInsertComponent {
publishers: Publisher[] = [];

  constructor(
    private publisherService: PublisherService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<PublisherInsertComponent>,
  ) { }

  publisherForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.publisherForm.valid) {
      this.publisherService.createPublisher(this.publisherForm.value as Partial<Publisher>).subscribe(publisher => {
        this.publishers.push(publisher);
        this.snackBar.open('Publisher created successfully!', '', {
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
