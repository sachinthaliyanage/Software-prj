import User from "@/app/models/user";
import { connectMongoDB } from "@/lib/mongodb";
import { Session } from "inspector";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';



const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            Credentials: {},

            async authorize(credentials) {
                const {email, password} = credentials;
                
                
                try {
                    await connectMongoDB();
                    const user = await User.findOne({ email });


                    if (!user) {
                        return null;
                    }

                    const passwordMatch = await bcrypt.compare(password, user.password);

                    if (!passwordMatch) {
                        return null;
                    }

                    return user;

                } catch (error) {

                    console.log("Error: ", error);
                    
                }
            },
        }),
    ],
    Session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
    },
};

const handler = NextAuth(authOptions);


export {handler as GET, handler as POST};
