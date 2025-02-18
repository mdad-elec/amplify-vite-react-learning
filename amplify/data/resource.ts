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
      studentClass: a.enum(["CLASS_1", "CLASS_2", "CLASS_3"]), // Use valid enum values
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
