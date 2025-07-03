import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useGetBookByIdQuery } from "@/redux/features/book/bookApi";
import { BookOpen, BookType, Calendar, Edit, Hash, User } from "lucide-react";
import { Link } from "react-router";

interface BookDetailsModalProps {
  bookId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BookDetailsModal({ bookId, isOpen, onClose }: BookDetailsModalProps) {
  const { data: bookData } = useGetBookByIdQuery(bookId, {
    skip: !bookId,
    // refetchOnMountOrArgChange: true,
  });

  console.log(bookId);
  // const book = {
  //   _id: "1",
  //   title: "The Great Gatsby",
  //   author: "F. Scott Fitzgerald",
  //   genre: "Fiction",
  //   description:
  //     "A novel set in the Roaring Twenties that explores themes of decadence, idealism, resistance to change, social upheaval, and excess.",
  //   available: true,
  //   copies: 5,
  //   isbn: "978-0743273565",
  //   createdAt: "2023-01-01T00:00:00Z",
  //   updatedAt: "2023-01-15T00:00:00Z",
  // };

  const book = bookData?.data;

  if (!book) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 pr-8">{book.title}</DialogTitle>
          <p className="text-lg text-gray-600">by {book.author}</p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Badge variant={book.available ? "default" : "secondary"} className="text-sm px-3 py-1">
              {book.available ? "Available" : "Unavailable"}
            </Badge>

            <div className="flex gap-2">
              <Link to={`/edit-book/${book._id}`}>
                <Button variant="outline" size="sm" onClick={onClose}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Book
                </Button>
              </Link>
              {book.available && (
                <Link to={`/borrow/${book._id}`}>
                  <Button size="sm" onClick={onClose}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Borrow Book
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <Separator />

          {/* Book Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <User className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Author</p>
                  <p className="text-base text-gray-900">{book.author}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <BookType className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Genre</p>
                  <p className="text-base text-gray-900">{book.genre}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Hash className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">ISBN</p>
                  <p className="text-base font-mono text-gray-900">{book.isbn}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <BookOpen className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Available Copies</p>
                  <p className="text-base font-semibold text-gray-900">{book.copies}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Date Added</p>
                  <p className="text-base text-gray-900">
                    {new Date(book.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Last Updated</p>
                  <p className="text-base text-gray-900">
                    {new Date(book.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {book.description && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{book.description}</p>
              </div>
            </>
          )}

          {/* Availability Notice */}
          {!book.available && (
            <>
              <Separator />
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 text-center">
                  This book is currently unavailable for borrowing. Please check back later or contact the librarian.
                </p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
