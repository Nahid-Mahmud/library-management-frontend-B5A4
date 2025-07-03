import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGetBookByIdQuery, useGetGenreQuery, useUpdateBookMutation } from "@/redux/features/book/bookApi";
import type { IBook } from "@/types/book.type";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

// Zod validation schema

interface UpdateBookFormProps {
  method?: "update" | "add";
}

type BookFormData = {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
};

export function BookForm({ method }: UpdateBookFormProps) {
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const { data: genreData } = useGetGenreQuery(undefined);

  const [updateFn, { isLoading: updateBookLoading }] = useUpdateBookMutation();

  // console.log(genreData?.data);

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  // console.log(method, "Method used in BookForm");

  const { data } = useGetBookByIdQuery(id, {
    skip: !id,
  });

  const book: IBook = data?.data;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<BookFormData>({
    defaultValues: {
      title: "",
      author: "",
      genre: "", // Default genre, can be changed
      isbn: "",
      description: "",
      copies: 0,
      available: true, // Default availability
    },
  });

  const watchedGenre = watch("genre");
  const watchedAvailable = watch("available");

  const onSubmit = async (data: BookFormData) => {
    setSubmitMessage(null);

    if (method === "update") {
      try {
        const res = await updateFn({
          id: book._id,
          data,
        }).unwrap();
        console.log(res);
        if (res.success) {
          toast.success("Book updated successfully!");
          navigate("/all-books");
        }
      } catch (error) {
        console.error("Error updating book:", error);
        setSubmitMessage({
          type: "error",
          message: "Failed to update book. Please try again.",
        });
      }
    }
  };

  useEffect(() => {
    // Reset form values when book data is available
    if (book) {
      reset({
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        description: book.description,
        copies: book.copies,
        available: book.available,
      });
    }
  }, [book, reset, genreData]);

  return (
    <div className="space-y-6 container mx-auto py-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link to="/all-books">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Books
          </Link>
        </Button>
      </div>

      {submitMessage && (
        <Alert
          className={submitMessage.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}
        >
          <AlertDescription className={submitMessage.type === "success" ? "text-green-800" : "text-red-800"}>
            {submitMessage.message}
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Save className="h-5 w-5" />
            Book Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input id="title" {...register("title")} className={errors.title ? "border-red-500" : ""} />
                {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Author *</Label>
                <Input id="author" {...register("author")} className={errors.author ? "border-red-500" : ""} />
                {errors.author && <p className="text-sm text-red-500">{errors.author.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="genre">Genre *</Label>
                <Select
                  value={watchedGenre}
                  onValueChange={(value) => setValue("genre", value as BookFormData["genre"], { shouldDirty: true })}
                >
                  <SelectTrigger className={errors.genre ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select a genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {genreData?.data?.map((genre: string) => (
                      <SelectItem key={genre} value={genre}>
                        {genre.split("_").join(" ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.genre && <p className="text-sm text-red-500">{errors.genre.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="isbn">ISBN *</Label>
                <Input
                  id="isbn"
                  {...register("isbn")}
                  placeholder="978-0-123456-78-9"
                  className={errors.isbn ? "border-red-500" : ""}
                />
                {errors.isbn && <p className="text-sm text-red-500">{errors.isbn.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                {...register("description")}
                rows={4}
                className={errors.description ? "border-red-500" : ""}
                placeholder="Enter book description..."
              />
              {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="copies">Number of Copies *</Label>
                <Input
                  id="copies"
                  type="number"
                  min="0"
                  {...register("copies", { valueAsNumber: true })}
                  className={errors.copies ? "border-red-500" : ""}
                />
                {errors.copies && <p className="text-sm text-red-500">{errors.copies.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Availability</Label>
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox
                    id="available"
                    checked={watchedAvailable}
                    onCheckedChange={(checked) => setValue("available", checked as boolean, { shouldDirty: true })}
                  />
                  <Label htmlFor="available" className="text-sm font-normal">
                    Book is available for borrowing
                  </Label>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              {method === "update" && (
                <Button type="submit" disabled={updateBookLoading || !isDirty} className="flex-1 md:flex-none">
                  {updateBookLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Update Book
                    </>
                  )}
                </Button>
              )}

              <Button
                type="button"
                variant="outline"
                disabled={updateBookLoading}
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
