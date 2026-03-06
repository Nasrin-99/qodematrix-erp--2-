import React, { useState, useEffect } from 'react';
import { Library, Plus, Search, Book, User, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useAuthStore } from '../../store/authStore';

export const LibraryManagement = () => {
  const { user } = useAuthStore();
  const [books, setBooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isAdmin = user?.role === 'schooladmin';

  useEffect(() => {
    // Mock data for library books
    setTimeout(() => {
      setBooks([
        { 
          id: '1', 
          title: 'The Great Gatsby', 
          author: 'F. Scott Fitzgerald', 
          isbn: '978-0743273565', 
          category: 'Fiction',
          status: 'Available',
          borrower: '-'
        },
        { 
          id: '2', 
          title: 'A Brief History of Time', 
          author: 'Stephen Hawking', 
          isbn: '978-0553380163', 
          category: 'Science',
          status: 'Borrowed',
          borrower: 'Alex Johnson (10-A)'
        },
        { 
          id: '3', 
          title: 'Introduction to Algorithms', 
          author: 'Thomas H. Cormen', 
          isbn: '978-0262033848', 
          category: 'Computer Science',
          status: 'Available',
          borrower: '-'
        },
        { 
          id: '4', 
          title: 'The Art of War', 
          author: 'Sun Tzu', 
          isbn: '978-1590302255', 
          category: 'Philosophy',
          status: 'Reserved',
          borrower: 'Sarah Miller (12-B)'
        },
      ]);
      setIsLoading(false);
    }, 800);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Library Management</h1>
          <p className="text-slate-500">Search, borrow and manage school library resources.</p>
        </div>
        {isAdmin && (
          <Button size="sm" className="gap-2">
            <Plus size={16} /> Add New Book
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Books</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">1,250</h3>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Available</p>
          <h3 className="text-2xl font-bold text-emerald-600 mt-1">980</h3>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Borrowed</p>
          <h3 className="text-2xl font-bold text-amber-600 mt-1">245</h3>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Overdue</p>
          <h3 className="text-2xl font-bold text-red-600 mt-1">25</h3>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input placeholder="Search by title, author or ISBN..." className="pl-10" />
          </div>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Table headers={['Book Details', 'Category', 'Status', 'Borrower', 'Actions']}>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Book size={20} />
                    </div>
                    <div className="space-y-0.5">
                      <span className="font-medium text-slate-900 block">{book.title}</span>
                      <span className="text-xs text-slate-500 block">{book.author}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="neutral">{book.category}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={
                    book.status === 'Available' ? 'success' : 
                    book.status === 'Borrowed' ? 'warning' : 'info'
                  }>
                    {book.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-slate-600 text-sm">
                    {book.borrower !== '-' && <User size={14} className="text-slate-400" />}
                    <span>{book.borrower}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="text-indigo-600">
                    {book.status === 'Available' ? 'Borrow' : 'Details'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        )}
      </Card>
    </div>
  );
};
