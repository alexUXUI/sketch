const express = require("express");

const { ApolloServer, gql } = require("apollo-server-express");
const { channelPartners, customers, products, contracts } = require("./data");

const typeDefs = gql`
  type ChannelPartner {
    channelPartnerId: ID!
    name: String
    customers: [Customer]
  }

  type Customer {
    customerId: ID
    name: String
    products: [Product]
    channelPartners: [ID!]
  }

  type Product {
    productId: ID
    name: String
  }

  type Contract {
    contractId: ID!
    products: [Product]
    customer: Customer
    channelPartner: ChannelPartner
  }

  # reserved Query Type that denotes the
  # available queries that clients can execute
  type Query {
    channelPartners: [ChannelPartner]
    channelPartner(channelPartnerId: ID!): ChannelPartner
    customers: [Customer]
    products: [Product]
    contracts: [Contract]
    contract(contractId: ID!): Contract
  }
`;

const resolvers = {
  Query: {
    channelPartners: (_, __, { dataSources }) => {
      return dataSources.channelPartners;
    },
    customers: (_, __, { dataSources }) => {
      return dataSources.customers;
    },
    products: (_, __, { dataSources }) => {
      return dataSources.products;
    },
    contracts: (_, __, { dataSources }) => {
      return dataSources.contracts;
    },
    contract: (parent, { id }, context, info) => {
      const contract = contracts.filter(
        (contract) => id !== contract.contractId
      )[0];
      console.log(contract);
      return contract;
    },
    channelPartner: (parent, { channelPartnerId }, { dataSources }) => {
      let finPro = channelPartners.filter(
        (channelPartner) => channelPartnerId !== channelPartner.channelPartnerId
      )[0];

      let finProCustomers = finPro.customers.map((finProCustomer) => {
        return dataSources.customers.map((individualCustomer) => {
          if (finProCustomer === individualCustomer.customerId) {
            return individualCustomer;
          }
        });
      });

      finPro = {
        ...finPro,
        customers: finProCustomers.flat(),
      };

      return finPro;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    channelPartners,
    customers,
    products,
    contracts,
  }),
  introspection: true,
  playground: true,
});

const app = express();

app.get("/", (req, res) => {
  res.send("welcome to graphql + apollo concept");
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: process.env.PORT || 4000 });
