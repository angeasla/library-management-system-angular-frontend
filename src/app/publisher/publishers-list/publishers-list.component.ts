import { Component } from '@angular/core';
import { Publisher } from 'projects/shared/src/public-api';
import { PublisherService } from '../publisher.service';
import { PublisherUpdateComponent } from '../publisher-update/publisher-update.component';
import { MatDialog } from '@angular/material/dialog';
import { PublisherInsertComponent } from '../publisher-insert/publisher-insert.component';

@Component({
  selector: 'app-publishers-list',
  templateUrl: './publishers-list.component.html',
  styleUrls: ['./publishers-list.component.css']
})
export class PublishersListComponent {
  publishers: Publisher[] = [];
  totalPublishers = 0;
  pageSize = 10;
  currentPage = 0;
  pageNumbers: number[] = [];
  searchedPublisher: Publisher | null = null;

  constructor(
    private publisherService: PublisherService,
    private dialog: MatDialog
    ) {}

  ngOnInit(): void {
    console.log("PublishersListComponent Initiated");
    this.getAllPublishersWithPagination(this.currentPage);
  }

  getAllPublishers(): void {
    this.publisherService.getAllPublishers().subscribe(publishers => {
      this.publishers = publishers;
    });
  }

  getAllPublishersWithPagination(page: number): void {
    this.publisherService.getAllPublishersWithPagination(page, this.pageSize).subscribe({
      next: response => {
          this.publishers = response.content;
          this.totalPublishers = response.totalElements; 
          this.pageNumbers = Array.from({length: response.totalPages}, (_, i) => i);
      },
      error: error => {
          console.error("Error fetching publishers:", error);
      }
    });  
  }

  openUpdateDialog(publisherId: number): void {
    const dialogRef = this.dialog.open(PublisherUpdateComponent, {
      minWidth: '50%',
      autoFocus: false,
      data: { publisherId: publisherId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllPublishersWithPagination(0);
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(PublisherInsertComponent, {
      minWidth: '50%',
      autoFocus: false,
      data: { publisherId: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllPublishersWithPagination(0);
    });
  }

  onPageChange(newPage: number): void {
    if(newPage >= 0 && newPage < this.pageNumbers.length) {
      this.currentPage = newPage;
      // Fetch the publishers for the new page by calling an API with pagination.
      this.getAllPublishersWithPagination(newPage);
    }
  }

  displaySearchedPublisher(publisher: Publisher): void {
    this.searchedPublisher = publisher;
  }

  backToPublishersList(): void {
    this.searchedPublisher = null;
    }
}
