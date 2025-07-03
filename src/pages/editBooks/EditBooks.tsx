import { useGetBookByIdQuery } from "@/redux/features/book/bookApi";
import { useParams } from "react-router";

export default function EditBooks() {
  const { id } = useParams<{ id: string }>();
  console.log(id);

  const { data: bookData } = useGetBookByIdQuery(id, {
    skip: !id,
  });

  console.log(bookData?.data);

  return <div>EditBooks</div>;
}
