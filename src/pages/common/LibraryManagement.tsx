import React, { useState, useEffect } from "react";
import axios from "axios";
import {
Plus,
Search,
Book,
User,
} from "lucide-react";

import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Table, TableRow, TableCell } from "../../components/ui/Table";
import { Badge } from "../../components/ui/Badge";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { useAuthStore } from "../../store/authStore";

export const LibraryManagement = () => {
const { user } = useAuthStore();

const [books, setBooks] = useState<any[]>([]);
const [filtered, setFiltered] = useState<any[]>([]);
const [search, setSearch] = useState("");
const [loading, setLoading] = useState(true);

const API = import.meta.env.VITE_API_URL + "/library";

const isAdmin =
user?.role === "schooladmin" || user?.role === "superadmin";

// ===============================
// FETCH BOOKS
// ===============================
const fetchBooks = async () => {
try {
const res = await axios.get(API, {
headers: {
Authorization: `Bearer ${localStorage.getItem("token")}`,
},
});


  setBooks(res.data);
  setFiltered(res.data);

} catch (err) {
  console.error("Library fetch error", err);
} finally {
  setLoading(false);
}


};

useEffect(() => {
fetchBooks();
}, []);

// ===============================
// SEARCH
// ===============================
useEffect(() => {
const result = books.filter((b) =>
`${b.title} ${b.author} ${b.isbn}`
.toLowerCase()
.includes(search.toLowerCase())
);
setFiltered(result);
}, [search, books]);

// ===============================
// BORROW BOOK
// ===============================
const borrowBook = async (id: string) => {
try {
await axios.post(
`${API}/borrow/${id}`,
{},
{
headers: {
Authorization: `Bearer ${localStorage.getItem("token")}`,
},
}
);


  fetchBooks();
} catch {
  alert("Failed to borrow book");
}


};

return ( <div className="space-y-6">


  {/* HEADER */}
  <div className="flex justify-between">
    <div>
      <h1 className="text-2xl font-bold">Library Management</h1>
      <p className="text-slate-500">
        Manage books and borrowing system
      </p>
    </div>

    {isAdmin && (
      <Button size="sm">
        <Plus size={16} /> Add Book
      </Button>
    )}
  </div>

  {/* STATS */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

    <Card className="p-4">
      <h3 className="text-xl font-bold">{books.length}</h3>
      <p className="text-xs text-slate-500">Total Books</p>
    </Card>

    <Card className="p-4">
      <h3 className="text-xl font-bold text-emerald-600">
        {books.filter(b => b.status === "Available").length}
      </h3>
      <p className="text-xs text-slate-500">Available</p>
    </Card>

    <Card className="p-4">
      <h3 className="text-xl font-bold text-amber-600">
        {books.filter(b => b.status === "Borrowed").length}
      </h3>
      <p className="text-xs text-slate-500">Borrowed</p>
    </Card>

    <Card className="p-4">
      <h3 className="text-xl font-bold text-red-600">
        {books.filter(b => b.status === "Overdue").length}
      </h3>
      <p className="text-xs text-slate-500">Overdue</p>
    </Card>

  </div>

  {/* TABLE */}
  <Card className="p-0">

    <div className="p-4 border-b">
      <Input
        placeholder="Search books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

    {loading ? (
      <LoadingSpinner />
    ) : (
      <Table headers={["Book", "Category", "Status", "Borrower", "Action"]}>
        {filtered.map((book) => (
          <TableRow key={book._id}>

            <TableCell>
              <div className="flex gap-3 items-center">
                <Book size={18} />
                <div>
                  <p className="font-medium">{book.title}</p>
                  <p className="text-xs text-slate-500">
                    {book.author}
                  </p>
                </div>
              </div>
            </TableCell>

            <TableCell>{book.category}</TableCell>

            <TableCell>
              <Badge
                variant={
                  book.status === "Available"
                    ? "success"
                    : book.status === "Borrowed"
                    ? "warning"
                    : "destructive"
                }
              >
                {book.status}
              </Badge>
            </TableCell>

            <TableCell>
              {book.borrower || "-"}
            </TableCell>

            <TableCell>
              {book.status === "Available" ? (
                <Button
                  size="sm"
                  onClick={() => borrowBook(book._id)}
                >
                  Borrow
                </Button>
              ) : (
                <Button size="sm" variant="ghost">
                  View
                </Button>
              )}
            </TableCell>

          </TableRow>
        ))}
      </Table>
    )}

  </Card>
</div>


);
};
