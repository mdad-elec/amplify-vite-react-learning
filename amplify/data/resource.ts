import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Student: a
    .model({
      name: a.string(),
      email: a.string(),
      studentClass: a.enum(["1", "2", "3"]), // Restrict to class 1, 2, or 3
    })
    .authorization((allow) => [allow.authenticated()]), // Only authenticated users can access
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
