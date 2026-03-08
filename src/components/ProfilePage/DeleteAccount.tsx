/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Trash2, X } from "lucide-react";
import { Button } from "../ui/button"
import { useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const DeleteAccount = () => {
    const [isDelete, setIsDelete] = useState(false);
    const [loading, setLoading] = useState(false);

    const { toast } = useToast();
    const router = useRouter();
    const handleDelete = async () => {
        try {
            setLoading(true);
            const response = await axios.delete('/api/user/delete-user');
            if (!response.data.success) {
                toast({
                    title: "Error",
                    description: response.data.message,
                    variant: "destructive",
                });
                return;
            }

            toast({
                title: "Account Deleted",
                description: response.data.message,
            });

            router.push("/sign-in");
            router.refresh();
        } catch (error : any) {
            toast({
                title: "Error",
                description:
                error?.response?.data?.message || "Something went wrong",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
            setIsDelete(false);
        }
    }
    return (
        <div>
            <div className="border border-red-500/30 bg-red-500/10 rounded-2xl p-4">
                <p className="text-lg font-semibold text-red-400">
                    Delete Account
                </p>
                <p className="text-sm text-gray-300 mt-1">
                    Once you delete your account, there is no going back.
                </p>

                <Button
                    onClick={()=>setIsDelete(true)}
                    variant="destructive"
                    className="mt-4"
                >
                    <Trash2 />
                    Delete My Account
                </Button>
            </div>
            {isDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/70"
                    onClick={() => setIsDelete(false)}
                />

                {/* Modal Box */}
                <div className="relative z-10 w-[90%] max-w-md rounded-2xl border border-white/20 bg-black p-6 shadow-xl">
                    <button
                        onClick={() => setIsDelete(false)}
                        className="absolute right-4 top-4 text-gray-400 hover:text-white cursor-pointer"
                    >
                        <X size={18} />
                    </button>

                    <h3 className="text-xl font-semibold text-red-400">
                        Confirm Delete
                    </h3>

                    <p className="text-sm text-gray-300 mt-2">
                        Are you sure? This action is permanent and cannot be undone.
                    </p>

                    <div className="mt-6 flex gap-4 justify-end">
                        <Button
                            variant="secondary"
                            onClick={() => setIsDelete(false)}
                            disabled={loading}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={loading}
                        >
                            {loading ? "Deleting..." : "Yes, Delete"}
                        </Button>
                    </div>
                </div>
                </div>
            )}
        </div>
    )
}

export default DeleteAccount