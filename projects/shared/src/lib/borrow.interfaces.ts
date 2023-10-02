import { User } from "./user.interfaces";
import { Book } from "./book.interfaces";

export interface Borrow {
    id: {
        userId: number;
        bookId: number;
    };
    borrowDate: string; 
    returnDate: string | null;
    returned: number;
}
