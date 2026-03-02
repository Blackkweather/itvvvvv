'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IntroSequence } from "@/components/ui/IntroSequence";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import SupportFloat from "@/components/layout/SupportFloat";

export function CinematicWrapper({ children }: { children: React.ReactNode }) {
    const [introComplete, setIntroComplete] = useState(false);

    return (
        <>
            <IntroSequence onComplete={() => setIntroComplete(true)} />

            <div className="flex flex-col flex-1">
                <AnimatePresence mode="wait">
                    {introComplete && (
                        <motion.div
                            key="main-content"
                            initial={{ opacity: 0, y: 10, filter: "blur(20px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                            className="flex flex-col flex-1"
                        >
                            <Navbar />
                            <main className="flex-grow">{children}</main>
                            <Footer />
                            <SupportFloat />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
