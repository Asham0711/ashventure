/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { changePasswordSchema } from "@/schema/changePasswordSchema";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";

const ChangePassword = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmNewPasswordVisible, setConfirmNewPasswordVisible] = useState(false);

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof changePasswordSchema>) => {
    try {
      setLoading(true);

      const response = await axios.put("/api/user/change-password", data);

      if (!response.data.success) {
        toast({
          title: "Error",
          description: response.data.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Password updated successfully",
      });

    } catch (error : any) {
      console.error('Error while changing password -> ', error);
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      form.reset();
      setPasswordVisible(false);
      setNewPasswordVisible(false);
      setConfirmNewPasswordVisible(false);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-black/30 border border-white/20 rounded-3xl md:px-4 py-6 px-3 text-sm md:text-base">
      <h2 className="text-2xl mb-6">Change Password</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Current Password */}
          <FormField
            name="currentPassword"
            control={form.control}
            render={({ field }) => (
                <FormItem className="relative">
                    <FormLabel>Current Password</FormLabel>
                    <Input 
                        type={passwordVisible ? 'text' : 'password'}  // Toggle password visibility
                        {...field} 
                        name="currentPassword" 
                        placeholder="Enter your current password" 
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

          {/* New Password */}
          <FormField
            name="newPassword"
            control={form.control}
            render={({ field }) => (
                <FormItem className="relative">
                    <FormLabel>New Password</FormLabel>
                    <Input 
                        type={newPasswordVisible ? 'text' : 'password'}
                        {...field} 
                        name="newPassword" 
                        placeholder="Enter your new password" 
                        className='bg-black/20 border border-white/50' 
                    />
                    <button
                        type="button"
                        onClick={() => setNewPasswordVisible(!newPasswordVisible)} // Toggle visibility on click
                        className="absolute top-8 right-3 text-gray-500"
                    >
                        {newPasswordVisible ? (
                            <EyeOff className="w-5 h-5 cursor-pointer" />
                        ) : (
                            <Eye className="w-5 h-5 cursor-pointer" />
                        )}
                    </button>
                    <FormMessage className="text-red-500 text-sm font-bold"/>
                </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            name="confirmNewPassword"
            control={form.control}
            render={({ field }) => (
                <FormItem className="relative">
                    <FormLabel>New Password</FormLabel>
                    <Input 
                        type={confirmNewPasswordVisible ? 'text' : 'password'}
                        {...field} 
                        name="confirmNewPassword" 
                        placeholder="Enter your new password" 
                        className='bg-black/20 border border-white/50' 
                    />
                    <button
                        type="button"
                        onClick={() => setConfirmNewPasswordVisible(!confirmNewPasswordVisible)} // Toggle visibility on click
                        className="absolute top-8 right-3 text-gray-500"
                    >
                        {confirmNewPasswordVisible ? (
                            <EyeOff className="w-5 h-5 cursor-pointer" />
                        ) : (
                            <Eye className="w-5 h-5 cursor-pointer" />
                        )}
                    </button>
                    <FormMessage className="text-red-500 text-sm font-bold"/>
                </FormItem>
            )}
          />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChangePassword;
