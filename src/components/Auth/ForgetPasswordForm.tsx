'use client'
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import axios from 'axios';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { emailSchema } from '@/schema/emailSchema';
import HighlightText from '../common/HighlightText';
import { Button } from '../ui/button';

const ForgetPasswordForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast()
    const router = useRouter();

    const form = useForm<z.infer<typeof emailSchema>>({
        resolver: zodResolver(emailSchema),
        defaultValues:{
            email:''
        }
    });

    const onSubmit = async (data : z.infer<typeof emailSchema>) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post('/api/auth/forget-password', data);
            if (!response.data.success) {
                toast({
                    title: 'Error',
                    description: response.data.message || 'Failed to send email',
                    variant: 'destructive',
                });
                return;
            }

            toast({
                title: 'Success',
                description: response.data.message || 'Email sent successfully',
                variant: 'default',
            });

            router.push('/sign-in');
        } catch (error) {
            console.log("Error while sending OTP -->", error);
            toast({
                title: 'Error',
                description: 'Error while sending password otp',
                variant: 'destructive',
            });
        }
    }
    
    return (
        <div className="bg-transparent backdrop-blur-sm border-white/20 border px-4 py-6 rounded-3xl shadow-lg shadow-black/50 lg:w-[35%] md:w-[50%] w-[95%]">
            <div className='mb-8'>
                <p className="text-4xl text-center"><HighlightText text="Forget Password?" /></p>
                <p className='text-center'>Please enter the email address registered with your account.</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        name="email"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='md:text-lg'>Email</FormLabel>
                                <Input {...field} placeholder='Enter your email address' className='bg-black/20 border border-white/50'/>
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
            <div className="flex justify-center mt-5">
                <Link href={'/sign-in'} className="text-primary-brand hover:text-primary-brand-hover">
                    Back to Sign in
                </Link>
            </div>
        </div>
    )
}

export default ForgetPasswordForm