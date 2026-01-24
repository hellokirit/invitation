import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import ValentineProposal from './ValentineProposal';

const LandingPage = () => {
    const [showProposal, setShowProposal] = useState(false);
    const proposalRef = useRef<HTMLDivElement>(null);

    const handleReveal = () => {
        setShowProposal(true);
        setTimeout(() => {
            proposalRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <div className="relative w-full min-h-screen text-white bg-black overflow-x-hidden">
            <div
                className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0 scale-105 bg-pink-900"
                style={{ backgroundImage: "url('/valentine-bg.jpg')" }}
            >
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            </div>

            <div className="relative z-10 flex flex-col items-center w-full">

                <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="mb-6 text-6xl md:text-8xl font-bold font-freckle drop-shadow-lg">
                            Ello, <span className="text-yellow-400 drop-shadow-sm">Khyz!</span>
                        </h1>

                        <p className="mb-12 text-xl md:text-2xl leading-relaxed font-light drop-shadow-md text-pretty">
                            Patapos na January and ano next? February! And ano meron sa February? Exam... Ay, I mean, Valentine's Day! I want to be with you on this very special day. So, I'm going to ask you something very important.
                        </p>

                        {!showProposal && (
                            <motion.button
                                onClick={handleReveal}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 text-xl font-bold text-black bg-yellow-400 rounded-full shadow-lg hover:bg-yellow-300 transition-colors"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                What is it?
                            </motion.button>
                        )}
                    </motion.div>
                </div>

                {showProposal && (
                    <div
                        ref={proposalRef}
                        className="min-h-screen flex flex-col items-center justify-center w-full p-4 pb-20"
                    >
                        <ValentineProposal />
                    </div>
                )}
            </div>
        </div>
    );
};

export default LandingPage;
