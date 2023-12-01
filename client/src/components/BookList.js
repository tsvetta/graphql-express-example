import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import BookDetails from '../components/BookDetails'

import { getBooksQuery } from '../queries/queries';


const BookList = () => {
    const { error, loading, data } = useQuery(getBooksQuery);
    const [selectedBookId, setBookId] = useState(undefined);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <div>
            <ul id="book-list">
                {data.books.map((book) => {
                    return <li key={book.id} onClick={() => setBookId(book.id)}>{book.name}</li>
                })}
            </ul>
            <BookDetails id={selectedBookId} />
        </div>
    )
}

export default BookList;