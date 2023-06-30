import { User } from "./user.interfaces";
import { Book } from "./book.interfaces";

export interface Borrow {
    borrowId: number;
    borrowDate: Date;
    returnDate: Date | null;
    returned: number;
    user: User;
    borrowedBooks: BorrowedBook[];
}

export interface BorrowedBook {
    id: number;
    book: Book;
    borrow: Borrow;
    returned: number;
}