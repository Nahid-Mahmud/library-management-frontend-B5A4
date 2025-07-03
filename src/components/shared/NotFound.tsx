import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 px-4">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mt-4">Page Not Found</h2>
      <p className="text-gray-600 mt-2">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-6 px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition">
        Go back to LibM Home
      </Link>
    </div>
  );
}
