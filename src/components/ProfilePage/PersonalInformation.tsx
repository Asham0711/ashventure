/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import * as z from "zod"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Image from "next/image"
import profile from '../../../public/assets/profile.png'
import HighlightText from "../common/HighlightText"
import { useEffect, useState } from "react";
import { useToast } from '@/hooks/use-toast';
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/schema/profileSchema"
import { Button } from "../ui/button"
import InfoRow from "./InfoRow"
import { Edit } from "lucide-react"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loader from "../common/Loader"

interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
    gender: string | undefined;
    phone: string | null;
}

const PersonalInformation = () => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const { toast } = useToast();

    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            gender: undefined,
            phone: "",
        }
    })

    const fetchUser = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/user/get-profile');

            if(!response.data.success){
                toast({
                    title: 'Error',
                    description: response.data.message || 'Failed to load profile',
                    variant: 'destructive',
                });
                return;
            }
            setUser(response.data.data);
            form.reset({
                firstName: response.data.data.firstName,
                lastName: response.data.data.lastName,
                gender: response.data.data.gender ?? undefined,
                phone: response.data.data.phone ?? "",
            });
        } catch (error) {
            console.log("Error while fetching profile -->", error);
            toast({
                title: 'Error',
                description: 'An unexpected error occurred while fetching profile',
                variant: 'destructive',
            });
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    const onSubmit = async (data: z.infer<typeof profileSchema>) => {
        try {
            const response = await axios.put("/api/user/update-profile", data);
            if (!response.data.success) {
                toast({
                    title: "Error",
                    description: response.data.message,
                    variant: "destructive",
                });
                return;
            }
            if (response.data.message === "No changes found") {
                toast({
                    title: "No changes",
                    description: "You didn't change anything",
                });
                return;
            }

            toast({
                title: "Success",
                description: "Profile updated successfully",
            });

                setUser(prev => ({
                ...prev!,
                ...data,
            }));

        } catch (error) {
            console.error('Error while updating profile -->', error);
            toast({
                title: "Error",
                description: "Something went wrong while updating profile",
                variant: "destructive",
            });
        } finally{
            setIsEditing(false);
        }
    }
  
    return (
        <div className="space-y-4 relative">
            {loading && (
                <Loader
                    text="Loading your profile...."
                    fullPage={false}
                />
            )}
            <p className="md:text-3xl text-2xl">Personal Information</p>
            <div className="border border-white/20 flex justify-start items-center gap-3 bg-black/30 rounded-3xl py-3 px-4">
                <div>
                    <Image
                        src={profile}
                        alt="Profile"
                        className="md:h-24 md:w-24 rounded-full bg-gray-600/30"
                    />
                </div>
                <div>
                    <p className="md:text-2xl text-lg">Hi, <HighlightText text={user?.firstName}/> <HighlightText text={user?.lastName}/></p>
                    <p className="text-gray-200 text-sm md:text-base">{user?.email}</p>
                </div>
            </div>

            {!isEditing && (
                <div className="border border-white/20 bg-black/30 rounded-2xl text-sm md:text-base">
                    <InfoRow label="First Name" value={user?.firstName} />
                    <InfoRow label="Last Name" value={user?.lastName} />
                    <InfoRow label="Email" value={user?.email} />
                    <InfoRow label="Gender" value={user?.gender || "-"} />
                    <InfoRow label="Phone" value={user?.phone || "-"} />

                    <div className="px-5 py-4">
                        <Button
                            onClick={() => setIsEditing(true)}
                        >
                            <Edit/>
                            Edit Profile
                        </Button>
                    </div>
                </div>
            )}
            
            {isEditing && (
                <div className="border border-white/20 bg-black/30 rounded-3xl shadow-lg shadow-black/50 md:px-4 px-3 py-6 text-sm md:text-base">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <FormField
                                name="firstName"
                                control={form.control}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <Input {...field}  placeholder="Enter your first name" className="bg-black/20" />
                                    <FormMessage />
                                </FormItem>
                                )}
                            />

                            <FormField
                                name="lastName"
                                control={form.control}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input {...field} placeholder="Enter your last name" className="bg-black/20" />
                                    <FormMessage />
                                </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Gender</FormLabel>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className="bg-black/20">
                                                <SelectValue placeholder="Select gender (optional)" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value="Male">Male</SelectItem>
                                                <SelectItem value="Female">Female</SelectItem>
                                                <SelectItem value="Other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />


                            <FormField
                                name="phone"
                                control={form.control}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <Input {...field} placeholder="Enter your phone number" className="bg-black/20" />
                                </FormItem>
                                )}
                            />

                            <div className="flex gap-4 pt-4">
                                <Button type="submit">Save</Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        form.reset({
                                            firstName: user?.firstName ?? "",
                                            lastName: user?.lastName ?? "",
                                            gender: user?.gender as "Male" | "Female" | "Other" | undefined,
                                            phone: user?.phone ?? "",
                                        });
                                        setIsEditing(false)
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            )}
        </div>
    )
}

export default PersonalInformation