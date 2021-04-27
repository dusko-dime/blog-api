const resolvers = {
    Query: {
        hello: async function (s, req) {
            return 'hello';
        },
    }
}

exports.module = resolvers;