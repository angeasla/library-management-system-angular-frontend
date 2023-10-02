import { Component, Inject, OnInit } from '@angular/core';
import { PublisherService } from '../publisher.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Publisher } from 'projects/shared/src/public-api';

@Component({
  selector: 'app-publisher-update',
  templateUrl: './publisher-update.component.html',
  styleUrls: ['./publisher-update.component.css']
})
export class PublisherUpdateComponent {
  publisherForm: FormGroup;
  publisherId: number | null = null;
  publisher: Publisher | null = null;

  constructor(
    private publisherService: PublisherService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PublisherUpdateComponent>,
    @Inject (MAT_DIALOG_DATA) public data: { publisherId: number }
  ) {
    this.publisherId = data.publisherId;
    this.publisherForm = this.fb.group({
      'name': ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.publisherId) {
      this.publisherService.getPublisherById(this.publisherId).subscribe(publisher => {
        this.publisherForm.patchValue({
          'name': publisher.name,
        });
      });
    } 
  }

  updatePublisher(): void {
    if (this.publisherForm.valid && this.publisherId) {
      const publisherData = {...this.publisherForm.value};

      this.publisherService.updatePublisher(this.publisherId, publisherData).subscribe(() => {
          this.snackBar.open('Publisher updated successfully!', '', {
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
