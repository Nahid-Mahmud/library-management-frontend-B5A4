import { useGetAllBooksQuery } from "@/redux/features/book/bookApi";
import type { IBook } from "@/types/book.type";
import { useState } from "react";
import { Link } from "react-router";
import Loader from "../shared/Loader";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BookDetailsModal } from "./BookDetailsModal";

// const books = [
//   {
//     _id: "1",
//     title: "The Great Gatsby",
//     author: "F. Scott Fitzgerald",
//     genre: "Fiction",
//     description:
//       "A novel set in the Roaring Twenties that explores themes of decadence, idealism, resistance to change, social upheaval, and excess.",
//     available: true,
//     copies: 5,
//   },
//   {
//     _id: "2",
//     title: "To Kill a Mockingbird",
//     author: "Harper Lee",
//     genre: "Fiction",
//     description:
//       "A novel about the serious issues that are faced in the Deep South, including racial injustice and moral growth.",
//     available: false,
//     copies: 0,
//   },
// ];

export default function RecentBooks() {
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: booksData,
    isLoading: bookDataLoading,
    error: bookDataError,
  } = useGetAllBooksQuery({ page: 1, limit: 6 });

  //   const openModal = (bookId: string) => {
  //     setSelectedBookId(bookId);
  //     setIsModalOpen(true);
  //   };

  const closeModal = () => {
    setSelectedBookId(null);
    setIsModalOpen(false);
  };

  if (bookDataLoading) {
    return <Loader />;
  }

  if (bookDataError) {
    return <div className="text-center text-red-500">Failed to load books.</div>;
  }

  return (
    <section className="flex flex-col gap-5 container mx-auto mb-5 ">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Recent Books</h2>
        <p className="text-gray-600">Latest additions to our library collection</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {booksData?.data?.map((book: IBook) => (
          <Card key={book._id} className="hover:shadow-md  duration-200 hover:scale-105 transition-all ">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-lg line-clamp-2">{book.title}</CardTitle>
                  <p className="text-sm text-gray-600">by {book.author}</p>
                </div>
                <Badge variant={book.available ? "secondary" : "destructive"} className="ml-2">
                  {book.available ? "Available" : "Unavailable"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Genre:</span> {book.genre}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Copies:</span> {book.copies}
                </p>
              </div>
              {book.description && (
                <p className="text-sm text-gray-700 line-clamp-2">
                  {book.description?.length > 60 ? book.description.slice(0, 60) + "..." : book.description}
                </p>
              )}
              <div className="flex w-fit mx-auto">
                <Button
                  onClick={() => {
                    setSelectedBookId(book._id);
                    setIsModalOpen(true);
                  }}
                  // variant="outline"
                  size="sm"
                  className="w-full bg-green-300 text-black hover:bg-green-600 transition-colors duration-200"
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Link to="/all-books">
          <Button variant="outline" size="lg">
            View All Books
          </Button>
        </Link>
      </div>

      <BookDetailsModal bookId={selectedBookId} isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
}
