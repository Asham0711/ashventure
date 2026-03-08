'use client'
import { useToast } from "@/hooks/use-toast";
import HighlightText from "../common/HighlightText";
import { Button } from "../ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod';
import { resetSchema } from "@/schema/resetPasswordSchema";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import axios from 'axios';

const ResetPasswordForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const { toast } = useToast()
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const form = useForm<z.infer<typeof resetSchema>>({
        resolver: zodResolver(resetSchema),
        defaultValues:{
            password: '',
            confirmPassword: ''
        }
    });

    const onSubmit = async (data : z.infer<typeof resetSchema>) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post('/api/auth/reset-password', {
                token: token,
                password: data.password,
                confirmPassword: data.confirmPassword
            });

            if(!response.data.success){
                toast({
                    title: 'Error',
                    description: response.data.message || 'Failed to reset the password',
                    variant: 'destructive',
                });
                return;
            }

            toast({
                title: 'Success',
                description: response.data.message || 'Password reset successfully',
                variant: 'default',
            });

            router.push('/sign-in');
        } catch (error) {
            console.log("Error while resetting the password -->", error);
            toast({
                title: 'Error',
                description: 'An unexpected error occurred',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="bg-transparent backdrop-blur-sm border-white/20 border px-4 py-6 rounded-3xl shadow-lg shadow-black/50 lg:w-[35%] md:w-[50%] w-[95%]">
            <div className='mb-8'>
                <p className="text-4xl text-center"><HighlightText text="Reset your password" /></p>
                <p className='text-center'>Enter a new password to continue building itenary for your trips</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                                    placeholder="Password" 
                                    className='bg-black/20 border border-white/50' 
                                />
                                <button
                                    type="button"
                                    onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility on click
                                    className="absolute top-8 right-3 text-gray-500"
                                >
                                    {passwordVisible ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                                <FormMessage className="text-red-500 text-sm font-bold"/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="confirmPassword"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="relative">
                                <FormLabel className='md:text-lg'>Confirm Password</FormLabel>
                                <Input 
                                    type={confirmPasswordVisible ? 'text' : 'password'}  // Toggle password visibility
                                    {...field} 
                                    name="confirmPassword" 
                                    placeholder="Confirm password" 
                                    className='bg-black/20 border border-white/50'
                                />
                                <button
                                    type="button"
                                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} // Toggle visibility on click
                                    className="absolute top-8 right-3 text-gray-500"
                                >
                                    {confirmPasswordVisible ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                                <FormMessage className="text-red-500 text-sm font-bold"/>
                            </FormItem>
                        )}
                    />
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
        </div>
    )
}

export default ResetPasswordForm