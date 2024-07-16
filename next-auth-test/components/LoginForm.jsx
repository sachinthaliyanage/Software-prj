"use client";

import { useState } from 'react';
import Register from '@/app/register/page'
import Link from 'next/link'
import { signIn } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';


export default function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await signIn('credentials',{
                email, 
                password, 
                redirect: false,
            });

            if (res.error) {
                setError("Invalid Credentials");
                return;
            }
            
            router.replace("dashboard");
            


        }catch (error) {
            console.log(error);
        }
    };

    

    return (
        <div>
            <h1>Login Details</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input onChange={e => setEmail(e.target.value)} type="text" placeholder="Email"/>
                <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Password"/>

                <button>Login</button>

                <div>
                    {error && (
                        <div>{error}</div>
                    )}
                </div>
                

                <Link href='/register'>No an account<span>Register</span></Link>

                

            </form>
        </div>
    )
}