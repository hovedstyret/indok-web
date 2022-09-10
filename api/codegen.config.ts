import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "src/graphql/**/type-defs.ts",
  generates: {
    "src/graphql/generated/types.ts": {
      config: {
        useIndexSignature: true,
        showUnusedMappers: true,
        immutableTypes: true,
        nonOptionalTypename: true,
        strictScalars: true,

        scalars: {
          DateTime: "Date",
        },

        contextType: "@/graphql/context#IContext",

        mapperTypeSuffix: "Model",

        mappers: {
          User: "@prisma/client#User",
          Permission: "@prisma/client#Permission",
          Cabin: "@prisma/client#Cabin",
          Booking: "@prisma/client#Booking",
        },
      },
      plugins: ["typescript", "typescript-resolvers"],
    },
    "src/graphql/generated/schema.graphql": {
      plugins: ["schema-ast"],
    },
  },
  hooks: {
    afterAllFileWrite: ["prettier --write"],
  },
};

export default config;