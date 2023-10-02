import { Publisher } from './publisher.interfaces';
import { Author } from './author.interfaces';

export interface Book {
    bookId: number;
    title: string | null | undefined;
    author: number | { authorId: number; firstname?: string; lastname?: string };
    isbn: string |null | undefined;
    publisher: number | { publisherId: number; name?: string };
    pages: number;
    publicationYear: number;
    quantity: number;
}

