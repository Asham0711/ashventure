'use client'
import HighlightText from "@/components/common/HighlightText"
import FAQCategory from "@/components/FAQPage/FAQCategory"
import { faqData } from "@/data"
import { Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

const FAQPage = () => {

    const [searchTerm, setSearchTerm] = useState("");

    const filteredData = useMemo(() => {
        if (!searchTerm.trim()) return faqData;

        const lower = searchTerm.toLowerCase();

        return faqData
            .map((category) => {
                const filteredItems = category.items.filter(
                    (item) =>
                        item.question.toLowerCase().includes(lower) ||
                        item.answer.toLowerCase().includes(lower) ||
                        category.category.toLowerCase().includes(lower)
                );

                if (category.category.toLowerCase().includes(lower)) {
                    return category;
                }

                if (filteredItems.length === 0) return null;

                return { ...category, items: filteredItems };
            })
            .filter((c): c is NonNullable<typeof c> => c !== null);
    }, [searchTerm]);

    return (
        <div className="max-w-screen min-h-screen container mx-auto overflow-x-hidden w-full h-full">
            <div className="mx-auto p-4 overflow-x-hidden mt-16">
                <h1 className="md:text-5xl text-3xl text-center">Have <HighlightText text="Questions?"/> We’ve Got Answers</h1>
                <p className="text-base md:text-lg text-center hidden md:block">From planning your trip to making the most of every adventure, find clear answers to all your queries. Your journey starts here.</p>
            </div>
            <div className="w-11/12 bg-transparent backdrop-blur-sm shadow-xl md:rounded-3xl rounded-xl md:p-6 p-4 border border-white/20 mx-auto my-4">
                <div className="relative mb-5">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />

                    <input
                        type="text"
                        placeholder="Search for a question…"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full border border-white/20 backdrop-blur-sm rounded-xl py-3 pl-12 pr-4 text-sm outline-none placeholder-white/40 focus:ring-2 focus:ring-white/40"
                    />
                </div>
                <div className="max-h-[80vh] overflow-y-auto md:space-y-4 space-y-2 no-scrollbar md:p-4 p-2 bg-transparent md:rounded-3xl rounded-xl border border-white/20">
                    {filteredData.length ? (
                        filteredData.map((category, index) => (
                        <FAQCategory
                            key={index}
                            category={category.category}
                            items={category.items}
                        />
                        ))
                    ) : (
                        <div className="text-center text-sm opacity-70 md:mt-10">
                            <p>No results found.</p>
                            <p className="w-9/12 md:w-full mx-auto"> Reach us with your query from &nbsp;
                                <Link
                                    href='/contact-us'
                                    className="text-primary-brand hover:underline font-bold"
                                >
                                    Contact Support
                                </Link>
                            </p>
                        </div>
                    )}
                </div>
                
            </div>
        </div>
    )
}

export default FAQPage