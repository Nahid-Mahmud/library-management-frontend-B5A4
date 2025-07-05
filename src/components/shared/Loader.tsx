import { FaSpinner } from "react-icons/fa6";

export default function Loader() {
  return (
    <div className="flex justify-center items-center py-12">
      {/* <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div> */}
      <FaSpinner className="animate-spin h-8 w-8 text-green-600" />
    </div>
  );
}
