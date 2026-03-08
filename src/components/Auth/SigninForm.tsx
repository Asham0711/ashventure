'use client'
import * as z from "zod"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { signInSchema } from '@/schema/signinSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "../ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import HighlightText from "../common/HighlightText";
const SigninForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isGoogleLogin, setIsGoogleLogin] = useState(false);

    const { toast } = useToast()
    const router = useRouter();

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            identifier:'',
            password:''
        }
    })

    const onSubmit = async (data : z.infer<typeof signInSchema>) => {
        setIsSubmitting(true);
        const result = await signIn('credentials',{
            redirect: false,
            identifier: data.identifier,
            password: data.password,
        });

        if (result?.error) {
            toast({
                title: 'Login Failed',
                description: 'Incorrect email or password',
                variant: 'destructive',
            });
            setIsSubmitting(false);
            return;
        }

        if (result?.url) {
            router.replace('/');
            toast({
                title: 'Success',
                description: 'User logged in successfully',
            });
        }

        setIsSubmitting(false);
    }

    const handleGoogleSignin = async () => {
        setIsGoogleLogin(true);
        await signIn("google", { callbackUrl: "/" });
        toast({
            title: 'Success',
            description: 'User logged in successfully',
        })
    }

    return (
        <div className="bg-transparent backdrop-blur-sm border-white/20 border px-4 py-6 rounded-3xl shadow-lg shadow-black/50 lg:w-[35%] md:w-[50%] w-[95%]">
            <div>
                <p className="text-4xl text-center"><HighlightText text="Welcome Back" /></p>
                <p className="text-center mb-2">Build your itinerary for your next trip...</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        name="identifier"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='md:text-lg'>Email</FormLabel>
                                <Input {...field} name="email" placeholder="Enter your email" className='bg-black/20 border border-white/50'/>
                                <FormMessage className="text-red-500 text-sm font-bold"/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="password"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="relative">
                                <FormLabel className='md:text-lg'>Password</FormLabel>
                                <Input 
                                    type={passwordVisible ? 'text' : 'password'}  // Toggle password visibility
                                    {...field} 
                                    name="password" 
                                    placeholder="Enter your password" 
                                    className='bg-black/20 border border-white/50' 
                                />
                                <button
                                    type="button"
                                    onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility on click
                                    className="absolute top-8 right-3 text-gray-500"
                                >
                                    {passwordVisible ? (
                                        <EyeOff className="w-5 h-5 cursor-pointer" />
                                    ) : (
                                        <Eye className="w-5 h-5 cursor-pointer" />
                                    )}
                                </button>
                                <FormMessage className="text-red-500 text-sm font-bold"/>
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end">
                        <Link href={'/forget-password'} className="text-primary-brand hover:text-primary-brand-hover mt-[-16]">
                            Forget Password
                        </Link>
                    </div>
                    <Button type="submit" className='w-full rounded-lg text-lg cursor-pointer' disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </>
                        ) : (
                            'Submit'
                        )}
                    </Button>
                </form>
            </Form>
            <div className="flex justify-center items-center gap-1 my-2">
                <div className="w-[50%] h-0.5 bg-gray-400"></div>
                <div className="text-gray-400 text-lg">Or</div>
                <div className="w-[50%] h-0.5 bg-gray-400"></div>
            </div>
            <div>
                <button 
                    className="flex items-center justify-center gap-2  py-2 w-full rounded-md cursor-pointer border bg-black border-white/20 font-bold text-lg"
                    onClick={handleGoogleSignin}
                >
                    {isGoogleLogin ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </>
                    ) : (
                        <>
                            <FcGoogle />
                            Sign in with Google
                        </>
                    )}
                </button>
            </div>
            <div className="text-center mt-4">
                <p>
                    Didn’t Have an Account?{' '}
                    <Link href="/sign-up" className="text-primary-brand hover:text-primary-brand-hover">
                        Register Now
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SigninForm