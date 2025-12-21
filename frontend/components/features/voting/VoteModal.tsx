"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface VoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (name: string, email: string) => Promise<{ success: boolean; message: string }>;
    movieTitle: string;
}

export function VoteModal({ isOpen, onClose, onSubmit, movieTitle }: VoteModalProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!name.trim()) {
            setError("Please enter your name");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        setIsLoading(true);

        try {
            const result = await onSubmit(name.trim(), email.toLowerCase().trim());

            if (result.success) {
                setSuccess(true);
                setTimeout(() => {
                    onClose();
                    setSuccess(false);
                    setName("");
                    setEmail("");
                }, 1500);
            } else {
                setError(result.message || "Failed to submit vote. Please try again.");
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
                    >
                        <div className="bg-[#F5F0E6] border-4 border-navy shadow-[8px_8px_0px_0px_var(--color-gold)] p-6 md:p-8 relative">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-navy hover:text-red transition-colors"
                            >
                                <X size={24} />
                            </button>

                            {success ? (
                                <div className="text-center py-8">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4"
                                    >
                                        <CheckCircle className="text-white" size={32} />
                                    </motion.div>
                                    <h3 className="font-display text-2xl text-navy uppercase mb-2">Vote Recorded!</h3>
                                    <p className="text-muted-foreground font-mono text-sm">
                                        Thanks for voting for {movieTitle}
                                    </p>
                                </div>
                            ) : (
                                <>
                                    {/* Header */}
                                    <div className="text-center mb-6">
                                        <h3 className="font-display text-2xl md:text-3xl text-navy uppercase mb-2">
                                            Vote for {movieTitle}
                                        </h3>
                                        <p className="text-muted-foreground font-mono text-sm">
                                            Enter your details to cast your vote
                                        </p>
                                    </div>

                                    {/* Form */}
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-mono font-bold text-navy uppercase tracking-widest mb-2">
                                                Your Name
                                            </label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Enter your name"
                                                className="w-full px-4 py-3 bg-white border-2 border-navy font-mono text-navy placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-colors"
                                                disabled={isLoading}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-mono font-bold text-navy uppercase tracking-widest mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="your@email.com"
                                                className="w-full px-4 py-3 bg-white border-2 border-navy font-mono text-navy placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-colors"
                                                disabled={isLoading}
                                            />
                                            <p className="text-xs text-muted-foreground mt-1 font-mono">
                                                You can only vote once per email
                                            </p>
                                        </div>

                                        {error && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="flex items-center gap-2 p-3 bg-red/10 border-2 border-red text-red"
                                            >
                                                <AlertCircle size={18} />
                                                <span className="text-sm font-mono">{error}</span>
                                            </motion.div>
                                        )}

                                        <Button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full py-6 text-lg font-display uppercase tracking-widest border-2 border-navy shadow-[4px_4px_0px_0px_var(--color-navy)] hover:shadow-[2px_2px_0px_0px_var(--color-navy)] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-all"
                                        >
                                            {isLoading ? (
                                                <span className="flex items-center gap-2">
                                                    <Loader2 className="animate-spin" size={20} />
                                                    Submitting...
                                                </span>
                                            ) : (
                                                "Cast My Vote"
                                            )}
                                        </Button>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
