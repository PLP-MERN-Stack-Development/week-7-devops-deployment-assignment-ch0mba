// src/components/Favorites/Favorites.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const res = await axios.get('/api/favorites');
      setFavorites(res.data);
    } catch (error) {
      console.error('Error fetching favorites:', error.message);
    }
  };

  const removeFavorite = async (bookId) => {
    try {
      await axios.delete(`/api/favorites/${bookId}`);
      fetchFavorites(); // Refresh list
    } catch (error) {
      console.error('Error removing favorite:', error.message);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">❤️ Your Favorite Books</h2>

      {favorites.length === 0 ? (
        <p className="text-gray-500">No favorites yet. Start saving books!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((book) => (
            <Card key={book.bookId} className="flex flex-col">
              <CardContent className="p-4 space-y-2 flex-grow">
                <h3 className="font-semibold text-lg line-clamp-2">{book.title}</h3>
                <p className="text-sm text-gray-600">{book.authors?.join(', ')}</p>
                {book.image && (
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-48 object-cover rounded-md"
                  />
                )}
              </CardContent>
              <div className="p-4 pt-0">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => removeFavorite(book.bookId)}
                >
                  Remove
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}