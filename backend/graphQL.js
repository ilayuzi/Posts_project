const { gql } = require("apollo-server-express");
const Post = require("/Users/ilayu/Desktop/posts_project/backend/postModel.js");
const { UserInputError } = require("apollo-server-express");

const typeDefs = gql`
  type Post {
    _id: ID!
    title: String!
    text: String!
    date: String
    author: String!
    status: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    posts: [Post]
    post(_id: ID!): Post
  }

  type Mutation {
    addPost(title: String!, text: String!, author: String!): Post
    editPost(_id: ID!, title: String, text: String): Post
    deletePost(_id: ID!): Post
  }
`;

// Define GraphQL Resolvers
const resolvers = {
  Query: {
    posts: async () => {
      try {
        const allPosts = await Post.find().exec(); // Ensure to use .exec() at the end
        return allPosts;
      } catch (error) {
        throw new UserInputError("Failed to fetch posts", { error });
      }
    },
    post: async (_, { _id }) => {
      try {
        const post = await Post.findById(_id).exec(); // Ensure to use .exec() at the end
        return post;
      } catch (error) {
        throw new UserInputError(`Failed to fetch post with id: ${_id}`, {
          error,
        });
      }
    },
  },
  Mutation: {
    addPost: async (_, { title, text, author }) => {
      try {
        const post = new Post({ title, text, author });
        await post.save();
        return post;
      } catch (error) {
        throw new UserInputError("Failed to add post", { error });
      }
    },
    editPost: async (_, { _id, title, text }) => {
      try {
        const post = await Post.findById(_id).exec();
        if (!post) {
          throw new UserInputError(`Post not found with id: ${_id}`);
        }
        if (title) post.title = title;
        if (text) post.text = text;
        await post.save();
        return post;
      } catch (error) {
        throw new UserInputError(`Failed to edit post with id: ${_id}`, {
          error,
        });
      }
    },
    deletePost: async (_, { _id }) => {
      try {
        const post = await Post.findByIdAndDelete(_id).exec();
        console.log(post);
        if (!post) {
          throw new UserInputError(`Post not found with id: ${_id}`);
        }
        return post;
      } catch (error) {
        throw new UserInputError(`Failed to delete post with id: ${_id}`, {
          error,
        });
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
