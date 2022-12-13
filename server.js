const { ApolloServer } = require("apollo-server");

// Modelos
const Person = require("./models/person");
const Pet = require("./models/pet");

//graphql server

//types query/mutation/subscription
const typeDefs = `
    # Tipos da aplicação <--
    type Person {
      id: ID!
      name: String
      sexo: String
      address: String
      phone: String
    }

    input PersonInput {
      name: String!
      sexo: String
      address: String
      phone: String
    }

    type Pet {
        id: ID!
        name: String
        owner: String
        age: Int
        breed: String
    }

    input PetInput {
      name: String!
      owner: String
      age: Int!
      breed: String
    }

    type Query {
        getPersons: [Person]
        getPerson(id: ID): Person
        getPets: [Pet]
        getPet(id: ID): Pet
    }

    type Mutation {
        createPerson(personInput: PersonInput): Person
        deletePerson(id: ID): String
        createPet(petInput: PetInput): Pet
        deletePet(id: ID): String
    }

`;

const resolvers = {
  Query: {
    getPets: () =>
      Promise.resolve()
        .then(() => Pet.findAll())
        .then((petList) => petList.map((d) => d.dataValues)),
    getPersons: () =>
      Promise.resolve()
        .then(() => Person.findAll())
        .then((personList) => personList.map((d) => d.dataValues)),
    getPerson: (parent, args) =>
      Promise.resolve()
        .then(() => Person.findByPk(args.id))
        .then((data) => data.dataValues),
    getPet: (parent, args) =>
      Promise.resolve()
        .then(() => Pet.findByPk(args.id))
        .then((data) => data.dataValues),
  },
  Mutation: {
    createPerson: (parent, args) =>
      Promise.resolve().then(() => Person.create(args.personInput)),
    deletePerson: (parent, args) =>
      Promise.resolve().then(() =>
        Person.destroy({
          where: {
            id: args.id,
          },
        }).then(() => "Pessoa deletada")
      ),

    createPet: (parent, args) =>
      Promise.resolve().then(() => Pet.create(args.petInput)),
    deletePet: (parent, args) =>
      Promise.resolve().then(() =>
        Pet.destroy({
          where: {
            id: args.id,
          },
        }).then(() => "Pet deletado!")
      ),
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

apolloServer.listen(4000, () => {
  console.log(
    `🚀 GRAPHQL Server is running at http://localhost:${4000}/graphql`
  );
});
