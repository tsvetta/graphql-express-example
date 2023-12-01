import { gql } from '@apollo/client';

export const getAuthorsQuery = gql`
    query GetAuthors {
        authors {
            name
            id
        }
    }
`;

export const getBooksQuery = gql`
    query GetBooks {
        books {
            name
            id
        }
    }
`;

export const addBookMutation = gql`
    mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
        addBook(name: $name, genre: $genre, authorId: $authorId) {
            name
            genre
            id
        }
    }
`;

export const getBookQuery = gql`
    query GetBook($id: ID) {
        book(id: $id) {
            id
            name
            genre
            author {
                id
                name
                age
                books {
                    name
                    id
                }
            }
        }
    }
`;