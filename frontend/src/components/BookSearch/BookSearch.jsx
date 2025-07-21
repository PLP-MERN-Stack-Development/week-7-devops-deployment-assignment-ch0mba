// src/components/BookSearch/BookSearch.jsx
import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

export default function BookSearch() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const searchBooks = async () => {
    try {
      const res = await axios.get(`/api/books?q=${query}`);
      setBooks(res.data.items || []);
    } catch (error) {
      console.error('Error fetching books:', error.message);
    }
  };

  const saveFavorite = async (book) => {
    const { id, volumeInfo } = book;
    const { title, authors, imageLinks } = volumeInfo;

    try {
      await axios.post('/api/favorites', {
        id,
        title,
        authors,
        image: imageLinks?.thumbnail,
      });
      alert('Book saved to favorites!');
    } catch (error) {
      console.error('Error saving favorite:', error.message);
      alert('Failed to save book.');
    }
  };

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Search for books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={searchBooks}>Search</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <Card key={book.id} className="flex flex-col justify-between">
            <CardContent className="p-4 space-y-2">
              <h3 className="font-semibold text-lg line-clamp-2">{book.volumeInfo.title}</h3>
              <p className="text-sm text-gray-600">
                {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
              </p>
              {book.volumeInfo.imageLinks?.thumbnail && (
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={book.volumeInfo.title}
                  className="w-full h-48 object-cover rounded-md"
                />
              )}
              <Button className="mt-2" onClick={() => saveFavorite(book)}>
                Save to Favorites
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}