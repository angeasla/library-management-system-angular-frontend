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

  constructor(
    private publisherService: PublisherService,
    private dialog: MatDialog
    ) {}

  ngOnInit(): void {
    console.log("PublishersListComponent Initiated");
    this.getAllPublishers();
  }

  getAllPublishers(): void {
    this.publisherService.getAllPublishers().subscribe(publishers => {
      this.publishers = publishers;
    });
  }

  openUpdateDialog(publisherId: number): void {
    const dialogRef = this.dialog.open(PublisherUpdateComponent, {
      minWidth: '50%',
      data: { publisherId: publisherId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllPublishers();
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(PublisherInsertComponent, {
      minWidth: '50%',
      data: { publisherId: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllPublishers();
    });
  }
}
