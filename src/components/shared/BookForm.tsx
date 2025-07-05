import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateBookMutation,
  useGetBookByIdQuery,
  useGetGenreQuery,
  useUpdateBookMutation,
} from "@/redux/features/book/bookApi";
import type { BookFormData, IBook } from "@/types/book.type";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

// Zod validation schema

interface UpdateBookFormProps {
  method?: "update" | "add";
}

export function BookForm({ method }: UpdateBookFormProps) {
  const { data: genreData } = useGetGenreQuery(undefined);

  const [updateFn, { isLoading: updateBookLoading }] = useUpdateBookMutation();
  const [createBookFn, { isLoading: createBookLoading }] = useCreateBookMutation();

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

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
    control,
    trigger,
    formState: { errors, isDirty },
  } = useForm<BookFormData>({
    defaultValues: {
      title: book?.title || "",
      author: book?.author || "",
      genre: book?.genre || "",
      isbn: book?.isbn || "",
      description: book?.description || "",
      copies: book?.copies || 0,
      available: book?.available || false,
    },
  });

  // const watchedGenre = watch("genre");
  const watchedAvailable = watch("available");

  const onSubmit = async (data: BookFormData) => {
    if (method === "update") {
      try {
        const res = await updateFn({
          id: book._id,
          data,
        }).unwrap();
        if (res.success) {
          toast.success("Book updated successfully!");
          navigate("/all-books");
        }
      } catch (error) {
        console.error("Error updating book:", error);
        toast.error("Failed to update book. Please try again.");
      }
    }

    if (method === "add") {
      try {
        const res = await createBookFn(data).unwrap();
        if (res.success) {
          toast.success("Book created successfully!");
          navigate("/all-books");
        }
      } catch (error) {
        console.error("Error creating book:", error);
        toast.error("Failed to create book. Please try again.");
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
                <Input
                  id="title"
                  {...register("title", {
                    required: "Title is required",
                    minLength: {
                      value: 3,
                      message: "Title must be at least 3 characters long",
                    },
                  })}
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Author *</Label>
                <Input
                  id="author"
                  {...register("author", {
                    required: "Author is required",
                    minLength: {
                      value: 3,
                      message: "Author name must be at least 3 characters long",
                    },
                  })}
                  className={errors.author ? "border-red-500" : ""}
                />
                {errors.author && <p className="text-sm text-red-500">{errors.author.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="genre">Genre *</Label>
                <Controller
                  control={control}
                  name="genre"
                  rules={{ required: "Genre is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setValue("genre", value as BookFormData["genre"], { shouldDirty: true });
                        trigger("genre");
                      }}
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
                  )}
                />

                {errors.genre && <p className="text-sm text-red-500">{errors.genre.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="isbn">ISBN *</Label>
                <Input
                  id="isbn"
                  {...register("isbn", {
                    required: "ISBN is required",
                  })}
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
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters long",
                  },
                })}
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
                <Button
                  type="submit"
                  disabled={updateBookLoading || !isDirty}
                  className="flex-1 md:flex-none bg-green-800 text-white hover:bg-green-700 transition-colors duration-200"
                >
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

              {method === "add" && (
                <Button
                  type="submit"
                  disabled={createBookLoading || !isDirty}
                  className="flex-1 md:flex-none bg-green-800 text-white hover:bg-green-700 transition-colors duration-200"
                >
                  {createBookLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Create Book
                    </>
                  )}
                </Button>
              )}
              <Button
                type="button"
                variant="outline"
                disabled={createBookLoading || updateBookLoading}
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
