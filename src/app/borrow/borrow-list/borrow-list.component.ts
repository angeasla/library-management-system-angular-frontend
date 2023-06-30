import { Component, OnInit } from '@angular/core';
import { BorrowService } from '../borrow.service';
import { Borrow } from 'projects/shared/src/lib/borrow.interfaces';

@Component({
  selector: 'app-borrow-list',
  templateUrl: './borrow-list.component.html',
  styleUrls: ['./borrow-list.component.css']
})
export class BorrowListComponent {
  borrows: Borrow[] = [];

  constructor(private borrowService: BorrowService) { }

  ngOnInit(): void {
    this.borrowService.getAllBorrows().subscribe(data => {
      this.borrows = data.filter(borrow => borrow.returned === 0); 
    });
  }

  returnBook(borrowedBookId: number) {
    if (!borrowedBookId) {
      return;
    }
    this.borrowService.returnBorrow(borrowedBookId).subscribe(() => {
      this.ngOnInit(); 
    });
  }
}
