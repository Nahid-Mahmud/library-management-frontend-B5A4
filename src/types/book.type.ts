// {
//     "_id": "68665a058fa8216cbcc93929",
//     "title": "Throne of Tides",
//     "author": "Kael Seawind",
//     "genre": "FANTASY",
//     "isbn": "9780062024039",
//     "description": "The sea chooses its own ruler—and it has chosen her.",
//     "copies": 3,
//     "available": true,
//     "createdAt": "2025-07-03T10:23:01.408Z",
//     "updatedAt": "2025-07-03T10:23:01.408Z"
// }

export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export type BookFormData = {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
};
