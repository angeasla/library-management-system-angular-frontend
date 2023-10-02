import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PublisherService } from '../publisher.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-publisher-delete',
  templateUrl: './publisher-delete.component.html',
  styleUrls: ['./publisher-delete.component.css']
})
export class PublisherDeleteComponent {
  @Input() publisherId!: number;
  @Output() onDeleted = new EventEmitter<void>();

  constructor(private publisherService: PublisherService, private snackBar: MatSnackBar) { }

  deletePublisher() {
    this.publisherService.deletePublisher(this.publisherId).subscribe(() => {
      console.log("Delete button clicked");
      this.snackBar.open('Publisher deleted successfully!', '', {
        duration: 4000,
      });
      this.onDeleted.emit();
    });
  }
}
