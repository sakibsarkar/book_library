export interface IBook {
  bookId: string;
  title: string;
  genre: string;
  publishedYear: number;
  totalCopies: number;
  availableCopies: number;
  createdAt: Date;
}
