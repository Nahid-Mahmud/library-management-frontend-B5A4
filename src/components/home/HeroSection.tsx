import { BookOpen, Plus } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function HeroSection() {
  return (
    <section className="text-center space-y-6 py-12">
      <div className="space-y-4">
        <Badge variant="outline" className="px-4 py-2 text-sm">
          📚 Library Management System
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
          Manage Your Library
          <span className="block text-green-600">With Ease</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          A simple and efficient way to manage your book collection, track borrowing, and maintain your library
          inventory.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link to="/all-books">
          <Button size="lg" className="px-8 py-3">
            <BookOpen className="h-5 w-5 mr-2" />
            Browse Books
          </Button>
        </Link>
        <Link to="/add-book">
          <Button size="lg" variant="outline" className="px-8 py-3 bg-transparent">
            <Plus className="h-5 w-5 mr-2" />
            Add New Book
          </Button>
        </Link>
      </div>
    </section>
  );
}
