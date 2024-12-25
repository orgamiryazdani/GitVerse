import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHubProvider],

})