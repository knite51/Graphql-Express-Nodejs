const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');

const { books, authors } = require('../DB/dummyData');

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'Represent Authors for books written',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    books: {
      type: new GraphQLList(BooksType),
      resolve: (author) => books.filter((book) => book.authorId === author.id),
    },
  }),
});

const BooksType = new GraphQLObjectType({
  name: 'Book',
  description: 'Represent Books written by authors',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
    author: {
      type: AuthorType,
      resolve: (book) => authors.find((author) => author.id === book.authorId),
    },
  }),
});

const ROOTQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    book: {
      type: BooksType,
      description: 'A Books',
      args: { id: { type: GraphQLInt } },
      resolve: (parent, args) => books.find((bk) => bk.id === args.id),
    },
    books: {
      type: new GraphQLList(BooksType),
      description: 'List of Books',
      resolve: () => books,
    },
    author: {
      type: AuthorType,
      description: 'An Author',
      args: { id: { type: GraphQLInt } },
      resolve: (parent, args) => authors.find((auth) => auth.id === args.id),
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: 'List of Authors',
      resolve: () => authors,
    },
  }),
});

const ROOTMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addBook: {
      type: BooksType,
      description: 'Add Books',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const book = {
          id: books.length + 1,
          name: args.name,
          authorId: args.authorId,
        };
        books.push(book);
        return book;
      },
    },
    addAuthor: {
      type: AuthorType,
      description: 'An Author',
      args: { name: { type: GraphQLNonNull(GraphQLString) } },
      resolve: (parent, args) => {
        const author = {
          id: authors.length + 1,
          name: args.name,
        };
        authors.push(author);
        return author;
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: ROOTQueryType,
  mutation: ROOTMutationType,
});
