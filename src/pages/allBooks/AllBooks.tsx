import { useDeleteBookMutation, useGetAllBooksQuery } from "@/redux/features/book/bookApi";
import type { IBook } from "@/types/book.type";
import { BookOpen, Edit, Eye, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { Link } from "react-router";
import { BookDetailsModal } from "../../components/home/BookDetailsModal";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { toast } from "react-toastify";
import BorrowBookModal from "@/components/borrow-book/BorrowBookModal";

export default function AllBooks() {
  const [open, setIsOpen] = useState<boolean>(false);
  const [borrowBookModalOpen, setBorrowBookModalOpen] = useState<boolean>(false);
  const [bookId, setBookId] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    limit: 5,
    page: 1,
  });

  const { data: booksData, isLoading } = useGetAllBooksQuery(pagination);
  const [deleteBookFn, { isLoading: deleteLoading }] = useDeleteBookMutation();

  const books = booksData?.data || [];

  const metaData = booksData?.meta;

  //   {
  //     "page": 1,
  //     "limit": 10,
  //     "total": 20
  // }

  //   const totalPages = metaData ? Math.ceil(metaData.total / metaData?.limit !== 0 ? metaData.limit : 1) : 0;
  const totalPages = metaData ? Math.ceil(metaData.total / (metaData.limit || 1)) : 0;

  //   console.log("Books Data:", booksData?.meta);
  const deleteBook = async (bookId: string) => {
    try {
      await deleteBookFn(bookId).unwrap();
      toast.success("Book deleted successfully");
    } catch (error) {
      toast.error("Failed to delete book");
      console.error("Failed to delete book:", error);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-12">
        {/* <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div> */}
        <FaSpinner className="animate-spin h-8 w-8 text-green-600" />
      </div>
    );

  return (
    <div className="container mx-auto py-5">
      <div className="flex flex-col items-center justify-center">
        <h1 className="md:text-5xl font-bold mb-2 ">All Books</h1>
        <p className="text-gray-600 md:text-xl mb-6">Manage your library collection efficiently.</p>
      </div>

      {/* <Separator className="my-4 bg-black" /> */}

      {!books || books.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
            <p className="text-gray-600 mb-4">Get started by adding your first book to the library.</p>
            <Link to="/create-book">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add First Book
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Books Collection ({books.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Genre</TableHead>
                    <TableHead>ISBN</TableHead>
                    <TableHead>Copies</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {books.map((book: IBook) => (
                    <TableRow key={book._id}>
                      <TableCell className="font-medium">{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>{book.genre}</TableCell>
                      <TableCell className="font-mono text-sm">{book.isbn}</TableCell>
                      <TableCell>{book.copies}</TableCell>
                      <TableCell>
                        <Badge variant={book.available ? "default" : "secondary"}>
                          {book.available ? "Available" : "Unavailable"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setBookId(book._id);
                              setIsOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Link to={`/edit-book/${book._id}`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>

                          <Button
                            onClick={() => setBorrowBookModalOpen(true)}
                            variant="ghost"
                            size="sm"
                            disabled={!book.available}
                          >
                            <BookOpen className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              deleteBook(book._id);
                            }}
                            disabled={deleteLoading}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* pagination controls */}

      <div>
        <div className="flex justify-between items-center mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPagination((prev) => ({ ...prev, page: Math.max(prev.page - 1, 1) }))}
            disabled={pagination.page === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {pagination.page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPagination((prev) => ({ ...prev, page: Math.min(prev.page + 1, totalPages) }))}
            disabled={pagination.page >= totalPages}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Modal for Book Details */}
      <BookDetailsModal
        onClose={() => {
          setIsOpen(false);
          setBookId(null);
        }}
        bookId={bookId}
        isOpen={open}
      />

      {/* modal for borrow book */}

      <BorrowBookModal open={borrowBookModalOpen} onClose={() => setBorrowBookModalOpen(false)} />
    </div>
  );
}
