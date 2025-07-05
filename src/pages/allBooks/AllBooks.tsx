"use client";

import BorrowBookModal from "@/components/borrow-book/BorrowBookModal";
import Loader from "@/components/shared/Loader";
import { useDeleteBookMutation, useGetAllBooksQuery } from "@/redux/features/book/bookApi";
import type { IBook } from "@/types/book.type";
import { BookOpen, Edit, Eye, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { BookDetailsModal } from "../../components/home/BookDetailsModal";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";

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

  const totalPages = metaData ? Math.ceil(metaData.total / (metaData.limit || 1)) : 0;

  const deleteBook = async (bookId: string) => {
    try {
      await deleteBookFn(bookId).unwrap();
      toast.success("Book deleted successfully");
    } catch (error) {
      toast.error("Failed to delete book");
      console.error("Failed to delete book:", error);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto py-5 px-4">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-2 text-center">All Books</h1>
        <p className="text-gray-600 text-lg md:text-xl mb-6 text-center">Manage your library collection efficiently.</p>
      </div>

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
        <>
          {/* Desktop Table View */}
          <Card className="hidden md:block">
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
                              onClick={() => {
                                setBorrowBookModalOpen(true);
                                setBookId(book._id);
                              }}
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

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Books Collection ({books.length})</h2>
            </div>

            {books.map((book: IBook) => (
              <Card key={book._id} className="w-full">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Title and Status */}
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-lg leading-tight pr-2">{book.title}</h3>
                      <Badge variant={book.available ? "default" : "secondary"} className="shrink-0">
                        {book.available ? "Available" : "Unavailable"}
                      </Badge>
                    </div>

                    {/* Book Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Author:</span>
                        <span className="font-medium">{book.author}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Genre:</span>
                        <span className="font-medium">{book.genre}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ISBN:</span>
                        <span className="font-mono text-xs">{book.isbn}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Copies:</span>
                        <span className="font-medium">{book.copies}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end space-x-2 pt-2 border-t">
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
                        onClick={() => {
                          setBorrowBookModalOpen(true);
                          setBookId(book._id);
                        }}
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Pagination Controls */}
      {books && books.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPagination((prev) => ({ ...prev, page: Math.max(prev.page - 1, 1) }))}
            disabled={pagination.page === 1}
            className="w-full sm:w-auto"
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600 order-first sm:order-none">
            Page {pagination.page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPagination((prev) => ({ ...prev, page: Math.min(prev.page + 1, totalPages) }))}
            disabled={pagination.page >= totalPages}
            className="w-full sm:w-auto"
          >
            Next
          </Button>
        </div>
      )}

      {/* Modal for Book Details */}
      <BookDetailsModal
        onClose={() => {
          setIsOpen(false);
          setBookId(null);
        }}
        bookId={bookId}
        isOpen={open}
      />

      {/* Modal for borrow book */}
      <BorrowBookModal
        open={borrowBookModalOpen}
        onClose={() => setBorrowBookModalOpen(false)}
        bookId={bookId}
        setBookId={setBookId}
      />
    </div>
  );
}
