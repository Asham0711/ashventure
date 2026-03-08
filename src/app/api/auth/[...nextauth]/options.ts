/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/database";
import { comparePassword } from "@/lib/hash";
import User from "@/models/user.model";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";

export const authOptions : NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            id:'credentials',
            name:'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials:any) : Promise<any>{
                await connectDB();
                try {
                    const user = await User.findOne({
                        $or:[
                            {email: credentials.identifier},
                            {username: credentials.identifier}
                        ]
                    });

                    if(!user){
                        throw new Error('No user found with this email');
                    }

                    const isValidPassword = await comparePassword(
                        credentials.password,
                        user.password
                    );

                    if(isValidPassword){
                        return user;
                    } else {
                        throw new Error('Incorrect password');
                    }

                } catch (err:any) {
                    throw new Error(err);
                }
            }
        }),
    ],
    callbacks:{
        async jwt({token, user}) {
            if (user) {
                token._id = user._id?.toString();
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
            }
            return session;
        },
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                await connectDB();

                const existingUser = await User.findOne({ email: user.email });

                if (!existingUser) {
                    await User.create({
                        firstName: user.name?.split(" ")[0] || "",
                        lastName: user.name?.split(" ")[1] || "",
                        email: user.email,
                        authProvider: "google",
                    });
                }
            }
            return true;
        },
    },
    session:{
        strategy:'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:'/sign-in'
    },
}