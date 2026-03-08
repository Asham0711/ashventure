/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Star } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import HighlightText from "../common/HighlightText";

import {
    blogSchema,
    BlogFormValues,
    BudgetEnum,
    TravelTypeEnum,
    MonthEnum,
} from "@/schema/blogSchema";

const CreateBlogForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<BlogFormValues>({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            title: "",
            placeName: "",
            description: "",
            rating: 0,
            tripDuration: 1,
            budgetRange: undefined,
            travelMonth: undefined,
            travelType: "Family",
            images: undefined,
        },
    });

    const rating = form.watch("rating");

    const onSubmit = async (data: BlogFormValues) => {
        try {
            setIsSubmitting(true);

            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (key !== "images") {
                    formData.append(key, String(value));
                }
            });

            if (data.images && data.images.length > 0) {
                const files = Array.from(data.images as FileList);

                files.forEach((file) => {
                    formData.append("images", file);
                });
            }

            const response = await axios.post(
                "/api/blogs/create-blog",
                formData
            );

            if (!response.data.success) {
                toast({
                    title: "Error",
                    description: response.data.message,
                    variant: "destructive",
                });
                return;
            }

            toast({
                title: "Blog Published!",
                description: "Your story is live",
            });

            router.push(`/blogs/${response.data.slug}`);
        } catch (error: any) {
            toast({
                title: "Something went wrong",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-transparent backdrop-blur-sm border border-white/20 px-4 py-6 rounded-3xl shadow-lg lg:w-[50%] w-[95%] mb-6">

            <p className="text-center text-xl md:text-3xl mb-4">
                <HighlightText text="Tell us about your journey" />
            </p>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                    {/* TITLE */}
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Blog Title</FormLabel>
                            <Input {...field} className="bg-black/20 border-white/20" placeholder="e.g. A Magical 5 Days in Manali" />
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    {/* PLACE NAME */}
                    <FormField
                        control={form.control}
                        name="placeName"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Place Name</FormLabel>
                            <Input {...field} placeholder="e.g. Manali, Himachal Pradesh" className="bg-black/20 border-white/20" />
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    {/* DESCRIPTION */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                placeholder="Share your experience, highlights, tips, budget details, and memorable moments..."
                                rows={5}
                                {...field}
                                className="bg-black/20 border-white/20"
                            />
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="tripDuration"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Trip Duration</FormLabel>
                                <Input
                                    type="number"
                                    min={1}
                                    placeholder="e.g. 5"
                                    {...field}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                    className="bg-black/20 border border-white/20"
                                />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="budgetRange"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Budget</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="bg-black/20">
                                            <SelectValue placeholder="Select budget" />
                                        </SelectTrigger>
                                        <SelectContent>
                                        {BudgetEnum.options.map((option) => (
                                            <SelectItem key={option} value={option}>
                                            {option}
                                            </SelectItem>
                                        ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>

                    {/* MONTH */}
                    <FormField
                        control={form.control}
                        name="travelMonth"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Travel Month</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="bg-black/20">
                                <SelectValue placeholder="Select month" />
                            </SelectTrigger>
                            <SelectContent>
                                {MonthEnum.options.map((month) => (
                                <SelectItem key={month} value={month}>
                                    {month}
                                </SelectItem>
                                ))}
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    {/* Travel Type */}
                    <div className="flex justify-between">
                        <FormField
                            control={form.control}
                            name="travelType"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Travel Type</FormLabel>
                                <div className="flex flex-wrap gap-2 mt-2">
                                {TravelTypeEnum.options.map((type) => (
                                    <button
                                    key={type}
                                    type="button"
                                    onClick={() => field.onChange(type)}
                                    className={`px-4 py-1 rounded-full border text-sm transition ${
                                        field.value === type
                                        ? "bg-primary-brand text-black"
                                        : "border-white/20 text-white/70 hover:bg-white/10"
                                    }`}
                                    >
                                    {type}
                                    </button>
                                ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="rating"
                            render={() => (
                            <FormItem>
                                <FormLabel>Rating</FormLabel>
                                <div className="flex gap-2 mt-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                    key={star}
                                    onClick={() => form.setValue("rating", star)}
                                    className={`cursor-pointer transition ${
                                        rating >= star
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-white/30"
                                    }`}
                                    />
                                ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>

                    {/* IMAGES */}
                    <FormField
                        control={form.control}
                        name="images"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Upload Images</FormLabel>

                            <Input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => {
                                const files = e.target.files;

                                if (files && files.length > 6) {
                                form.setError("images", {
                                    type: "manual",
                                    message: "Maximum 6 images allowed",
                                });
                                return;
                                }

                                field.onChange(files);
                            }}
                            className="bg-black/20 border-white/20"
                            />

                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full text-lg"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Publishing...
                        </>
                        ) : (
                        "Publish Blog"
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default CreateBlogForm;