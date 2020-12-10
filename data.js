const channelPartners = [
  {
    channelPartnerId: 1,
    name: "Elle",
    customers: [1],
  },
];

const customers = [
  {
    customerId: 1,
    name: "Ted",
    products: [1, 2, 3],
    channelPartners: [1],
  },
];

const contracts = [
  {
    contractId: 1,
    products: [1, 2],
    customer: 1,
    channelPartner: 1,
  },
];

const products = [
  {
    productId: 1,
    name: "Life Annuity",
  },
  {
    productId: 2,
    name: "Variable Annuity",
  },
  {
    productId: 2,
    name: "Individual Annuity",
  },
];

module.exports = {
  channelPartners,
  customers,
  contracts,
  products,
};
