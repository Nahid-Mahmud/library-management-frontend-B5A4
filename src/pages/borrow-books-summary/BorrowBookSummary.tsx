import Loader from "@/components/shared/Loader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useBorrowBooksSummaryQuery } from "@/redux/features/borrow-book/borrowBookApi";
import type { IBook } from "@/types/book.type";
import { Book, Hash, User } from "lucide-react";

interface BorrowBookSummaryItem {
  totalQuantity: number;
  book: IBook;
}

export default function BorrowBookSummary() {
  const { data: borrowBookData, isLoading } = useBorrowBooksSummaryQuery(undefined);

  console.log("BorrowBookSummary data:", borrowBookData);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-2xl md:text-4xl font-bold ">Borrowed Books Summary</h1>
        <p className="text-muted-foreground mb-4 underline">
          Below is the summary of all borrowed books, including the total quantity of each book.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
        {borrowBookData?.data?.map((item: BorrowBookSummaryItem) => (
          <Card key={item.book.isbn} className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
            <CardHeader className="">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2 flex-1 min-w-0">
                  <CardTitle className="text-lg leading-tight line-clamp-2">{item.book.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <User className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{item.book.author}</span>
                  </CardDescription>
                </div>
                <Badge variant="default" className="flex-shrink-0 font-semibold">
                  {item.totalQuantity} copies
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Book className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-sm font-medium">Genre:</span>
                <Badge variant="outline" className={`text-xs `}>
                  {item.book.genre.replace("_", " ")}
                </Badge>
              </div>

              <div className="flex items-start gap-2">
                <Hash className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <span className="text-sm font-medium block">ISBN:</span>
                  <span className="text-sm text-muted-foreground font-mono break-all">{item.book.isbn}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
