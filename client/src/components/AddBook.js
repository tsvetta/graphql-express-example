import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

const AuthorsSelect = ({ error, loading, data, value, onChange }) => {
    return (
        <select value={value} onChange={e => onChange(e.target.value)}>
            {loading && <option disabled>Data is loading...</option>}
            {error && <option disabled>Error: {error.message}</option>}

            {data && data.authors && <option value=''>Select author</option>}
            {data && data.authors && data.authors.map((author) => {
                return (<option key={author.id} value={author.id}>{author.name}</option>)
            })}
        </select>
    )
}

const AddBook = () => {
    const { error, loading, data } = useQuery(getAuthorsQuery);
    const [addBook, addBookDataStatus] = useMutation(addBookMutation)
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState('');

    const submitForm = (e) => {
        e.preventDefault();

        addBook({
            variables: {
                name, 
                genre, 
                authorId
            },
            refetchQueries: [{ query: getBooksQuery }]
        });

        setName('');
        setGenre('');
        setAuthorId('');
    }

    return (
        <form id="add-book" onSubmit={submitForm}>
            <h2>Add New Book:</h2>
            <div className='field'>
                <label>Book name:</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div className='field'>
                <label>Genre:</label>
                <input type="text" value={genre} onChange={e => setGenre(e.target.value)} />
            </div>

            <div className='field'>
                <label>Author:</label>
                <AuthorsSelect error={error} loading={loading} data={data} value={authorId} onChange={setAuthorId}/>
            </div>

            <button type="submit">
                {!(addBookDataStatus.loading || addBookDataStatus.error) && '+'}
                {addBookDataStatus.loading && 'Submitting'}
                {addBookDataStatus.error && addBookDataStatus.error.message}
            </button>
        </form>
    )
}

export default AddBook;