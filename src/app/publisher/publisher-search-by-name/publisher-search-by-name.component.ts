import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Publisher } from 'projects/shared/src/public-api';
import { PublisherService } from '../publisher.service';

@Component({
  selector: 'app-publisher-search-by-name',
  templateUrl: './publisher-search-by-name.component.html',
  styleUrls: ['./publisher-search-by-name.component.css']
})
export class PublisherSearchByNameComponent implements OnInit {
  @Output() publisherFound = new EventEmitter();
  name: string = '';
  publisher: Publisher | null = null;

  constructor(
    private publisherService: PublisherService
  ) { }

  ngOnInit(): void {
  }

  search(): void {
    this.publisherService.getPublisherByName(this.name).subscribe(
      publisher => this.publisherFound.emit(publisher),
      error => console.error('Error fetching publisher by name:', error)
    );
  }

}
