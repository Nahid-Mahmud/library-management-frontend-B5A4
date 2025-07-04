import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useBorrowBookMutation } from "@/redux/features/borrow-book/borrowBookApi";
import { toast } from "react-toastify";

// Zod schema
const formSchema = z.object({
  quantity: z.number().min(1, "Number must be greater than 0"),

  date: z.string().refine((date) => {
    const today = new Date();
    const selectedDate = new Date(date);
    return selectedDate > today;
  }, "Date must be in the future"),
});

type FormData = z.infer<typeof formSchema>;

interface BorrowBookModalProps {
  open: boolean;
  onClose: () => void;
  bookId: string | null;
  setBookId: (id: string | null) => void;
}

export default function BorrowBookModal({ bookId, open, onClose, setBookId }: BorrowBookModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 0,
      date: "",
    },
  });

  const [borrowBookFn, { isLoading }] = useBorrowBookMutation();

  const onSubmitForm = async (data: FormData) => {
    // console.log(data);

    try {
      if (!bookId) {
        toast.error("Book ID is required to borrow a book");
        return;
      }
      // console.log({ book: bookId, ...data });
      // return;
      const res = await borrowBookFn({ book: bookId, dueDate: data?.date, quantity: data?.quantity }).unwrap();
      if (res.success) {
        toast.success("Book borrowed successfully");
        setBookId(null);
        reset();
        onClose();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to borrow book. Please try again.");
    }
  };

  const handleClose = () => {
    setBookId(null);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Submit Data</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <div>
            <Label htmlFor="number">Number</Label>
            <Input
              type="number"
              id="quantity"
              {...register("quantity", { valueAsNumber: true })}
              placeholder="Enter a number"
            />
            {errors.quantity && <p className="text-sm text-red-500 mt-1">{errors.quantity.message}</p>}
          </div>

          <div>
            <Label htmlFor="date">Date</Label>
            <Input type="date" id="date" {...register("date")} />
            {errors.date && <p className="text-sm text-red-500 mt-1">{errors.date.message}</p>}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button disabled={isLoading} type="submit">
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
