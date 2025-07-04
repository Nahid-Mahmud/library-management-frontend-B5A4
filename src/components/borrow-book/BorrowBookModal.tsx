import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Zod schema
const formSchema = z.object({
  number: z.number().min(1, "Number must be greater than 0"),
  date: z.string().min(1, "Date is required"),
});

type FormData = z.infer<typeof formSchema>;

interface BorrowBookModalProps {
  open: boolean;
  onClose: () => void;
}

export default function BorrowBookModal({ open, onClose }: BorrowBookModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      number: 0,
      date: "",
    },
  });

  const onSubmitForm = (data: FormData) => {
    console.log(data);
    reset();
    onClose();
  };

  const handleClose = () => {
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
              id="number"
              {...register("number", { valueAsNumber: true })}
              placeholder="Enter a number"
            />
            {errors.number && <p className="text-sm text-red-500 mt-1">{errors.number.message}</p>}
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
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
