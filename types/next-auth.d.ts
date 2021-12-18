import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      address: string;
      accessToken: string;
      refreshToken: string;
      username: string | unknown;
    };
  }
  interface JWT {
    accessToken: string;
    username: string;
  }
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {}
  /**
   * Usually contains information about the provider being used
   * and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
   */
  interface Account {}
  /** The OAuth profile returned from your provider */
  interface Profile {}
}

declare module "next-auth/jwt" {
  // export interface JWT {
  //   token: {
  //     accessToken: string;
  //     username: string;
  //   };
  // }
}
