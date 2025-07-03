import { BookForm } from "@/components/shared/BookForm";

export default function AddBooks() {
  return (
    <div>
      <div className="container mx-auto py-5">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Add New Book</h1>
          <p className="mb-6">Fill in the details below to add a new book to the library.</p>
        </div>
        {/* Assuming BookForm is a component that handles adding a book */}
      </div>
      <BookForm method="add" />
    </div>
  );
}
