"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, ChevronRight } from "lucide-react";
import { LogoSVG } from "@/components/ui/Logo";

const InputField = ({ label, type = "text", value, onChange, required = true }: any) => {
    const [focused, setFocused] = useState(false);
    const isActive = focused || value;

    return (
        <div className="relative mb-6">
            <label
                className={`absolute left-0 transition-all duration-200 pointer-events-none ${isActive ? "-top-5 text-violet-500 text-xs font-semibold" : "top-3 text-zinc-500 text-sm font-light"
                    } ${required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ""}`}
            >
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                required={required}
                className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-violet-500 transition-colors"
            />
        </div>
    );
};

const SelectField = ({ label, value, onChange, options, required = true }: any) => {
    return (
        <div className="relative mb-6">
            <label className={`absolute left-0 -top-5 text-violet-500 text-xs font-semibold ${required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ""}`}>
                {label}
            </label>
            <select
                value={value}
                onChange={onChange}
                required={required}
                className="w-full bg-zinc-900 border-b border-white/20 py-3 px-2 text-white focus:outline-none focus:border-violet-500 transition-colors rounded-sm appearance-none outline-none mt-2 text-sm"
            >
                <option value="" disabled className="text-zinc-500">Select an option</option>
                {options.map((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
            <ChevronRight className="absolute right-2 top-8 w-4 h-4 text-zinc-500 rotate-90 pointer-events-none" />
        </div>
    );
};

export default function RequestAccess() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "", email: "", phone: "", country: "", experience: "", role: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const nextStep = () => {
        if (step === 1 && (!formData.name || !formData.email || !formData.phone)) return;
        setStep(step + 1);
    };

    const prevStep = () => setStep(step - 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.country || !formData.experience || !formData.role) return;
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSuccess(true);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-slate-950 flex relative overflow-hidden">
            {/* Background aesthetics */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-violet-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-slate-950/60 rounded-full blur-[100px]" />
            </div>

            <div className="flex-1 flex flex-col relative z-10 w-full lg:w-1/2 p-6 md:p-12 lg:p-24 justify-center max-w-2xl mx-auto">
                <div className="mb-12">
                    <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-violet-500 transition-colors mb-8 text-sm group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
                    </Link>
                    <div className="flex gap-2 items-center mb-4">
                        <div className={`h-1 flex-1 rounded-full transition-colors duration-500 ${step >= 1 ? "bg-violet-500" : "bg-white/10"}`} />
                        <div className={`h-1 flex-1 rounded-full transition-colors duration-500 ${step >= 2 ? "bg-violet-500" : "bg-white/10"}`} />
                        <div className={`h-1 flex-1 rounded-full transition-colors duration-500 ${success ? "bg-violet-500" : "bg-white/10"}`} />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2">Request Academy Access</h1>
                    <p className="text-zinc-400 font-light">Join Dubai's most exclusive real estate training platform.</p>
                </div>

                <div className="bg-slate-950/40 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-2xl shadow-2xl relative">
                    <AnimatePresence mode="wait">
                        {!success ? (
                            <motion.div
                                key={`step-${step}`}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <form onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
                                    {step === 1 && (
                                        <div className="space-y-4">
                                            <h2 className="text-xl font-medium text-white mb-8 border-b border-white/5 pb-4">Personal Details</h2>
                                            <InputField label="Full Legal Name" value={formData.name} onChange={(e: any) => setFormData({ ...formData, name: e.target.value })} />
                                            <InputField label="Corporate Email Address" type="email" value={formData.email} onChange={(e: any) => setFormData({ ...formData, email: e.target.value })} />
                                            <InputField label="Phone Number (with Code)" type="tel" value={formData.phone} onChange={(e: any) => setFormData({ ...formData, phone: e.target.value })} />

                                            <button
                                                type="submit"
                                                disabled={!formData.name || !formData.email || !formData.phone}
                                                className="w-full mt-8 py-4 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed border border-white/10 transition-colors"
                                            >
                                                Continue
                                            </button>
                                        </div>
                                    )}

                                    {step === 2 && (
                                        <div className="space-y-4 pt-4">
                                            <h2 className="text-xl font-medium text-white mb-8 border-b border-white/5 pb-4">Professional Profile</h2>
                                            <InputField label="Country of Residence" value={formData.country} onChange={(e: any) => setFormData({ ...formData, country: e.target.value })} />
                                            <SelectField
                                                label="Years of Experience in Real Estate"
                                                value={formData.experience}
                                                onChange={(e: any) => setFormData({ ...formData, experience: e.target.value })}
                                                options={["Less than 1 Year", "1-3 Years", "3-5 Years", "5-10 Years", "10+ Years"]}
                                            />
                                            <SelectField
                                                label="Primary Role Applying For"
                                                value={formData.role}
                                                onChange={(e: any) => setFormData({ ...formData, role: e.target.value })}
                                                options={["Agent", "Property Consultant", "Sales Manager", "Channel Partner"]}
                                            />

                                            <div className="flex gap-4 mt-8">
                                                <button
                                                    type="button"
                                                    onClick={prevStep}
                                                    className="w-1/3 py-4 bg-transparent border border-white/10 hover:bg-white/5 text-white font-medium rounded-lg transition-colors"
                                                >
                                                    Back
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting || !formData.country || !formData.experience || !formData.role}
                                                    className="flex-1 py-4 bg-gradient-to-r from-violet-400 to-violet-600 text-slate-950 font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all flex justify-center items-center gap-2"
                                                >
                                                    {isSubmitting ? (
                                                        <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: "linear", duration: 1 }} className="block w-5 h-5 border-2 border-slate-950/20 border-t-slate-950 rounded-full" />
                                                    ) : "Submit Application"}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-10"
                            >
                                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                                        className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white"
                                    >
                                        <Check className="w-6 h-6" />
                                    </motion.div>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Application Received</h3>
                                <p className="text-zinc-400 mb-8 max-w-sm mx-auto font-light leading-relaxed">
                                    Your request for access has been submitted successfully to the Lyka Academy administration. You will receive an email shortly regarding your approval status.
                                </p>
                                <Link href="/" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded border border-white/10 transition-colors inline-block">
                                    Return to Homepage
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Decorative desktop side */}
            <div className="hidden lg:block lg:w-1/2 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 to-transparent z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-left z-0"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541888086925-0c13be456d35?q=80&w=2940&auto=format&fit=crop')" }}
                />
                <div className="absolute bottom-20 right-20 z-20 bg-slate-950/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl max-w-sm">
                    <div className="text-violet-500 font-serif text-4xl leading-none mb-2">"</div>
                    <p className="text-white text-lg font-light mb-4">
                        The difference between a good agent and a top producer is the knowledge they command and the network they leverage.
                    </p>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center">
                            <LogoSVG className="w-10 h-10" />
                        </div>
                        <div>
                            <div className="text-white text-sm font-semibold">Lyka Realty Group</div>
                            <div className="text-zinc-500 text-xs">Director of Sales</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
