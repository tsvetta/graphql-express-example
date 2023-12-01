import React from 'react';
import { useQuery } from '@apollo/client';

import { getBookQuery } from '../queries/queries';

const BookDetails = ({ id }) => {
    const { error, loading, data } = useQuery(getBookQuery, {
        variables: { id }
    });

    if (error) {
        return <div className="book-details">{error.message}</div>;
    }

    if (loading) {
        return <div className="book-details">Loading book info...</div>;
    }

    if (!data.book) {
        return <div className="book-details"></div>;
    }

    return (
        <div className="book-details">
            <h2>Title: {data.book.name}</h2>
            <p>Genre: {data.book.genre}</p>
            <p>Author: {data.book.author.name}</p>

            {data.book.author.books.length &&
                <>
                    <p>All books of this author:</p>
                    <ul>
                        {data.book.author.books.map(book => {
                            return <li key={book.id}>{book.name}</li>;
                        })}
                    </ul>
                </>
            }
        </div>
    );
}

export default BookDetails;