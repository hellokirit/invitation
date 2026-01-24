import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

type Stage = 'LANDING' | 'REJECTION_LOOP';

const ValentineProposal = () => {
    const [stage, setStage] = useState<Stage>('LANDING');
    const [rejectionCount, setRejectionCount] = useState(0);
    const navigate = useNavigate();

    const getQuestion = () => {
        if (stage === 'LANDING') {
            return <>Would you like to be my <span className="text-pink-400 drop-shadow-sm">Valentine</span>?</>;
        }
        return (
            <>
                Is that your <span className="text-pink-400 drop-shadow-sm">final </span>
                {Array(rejectionCount).fill(null).map((_, i) => (
                    <span key={i} className="text-pink-400 drop-shadow-sm">final </span>
                ))}answer?
            </>
        );
    };

    const handleNoClick = () => {
        setStage('REJECTION_LOOP');
    };

    const handleRejectionConfirm = () => {
        setRejectionCount(prev => prev + 1);
    };

    const handleRejectionRegret = () => {
        setStage('LANDING');
        setRejectionCount(0);
    };

    const handleSuccess = () => {
        navigate('/planner');
    };

    return (
        <div className="w-full max-w-md p-8 text-center">
            <motion.h1
                key={`h1-${stage}-${rejectionCount}`}
                initial={{ scale: 0.9 }} animate={{ scale: 1 }}
                className="mb-8 text-5xl font-bold leading-tight drop-shadow-lg text-pretty md:text-7xl font-freckle"
            >
                {getQuestion()}
            </motion.h1>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                {stage === 'LANDING' ? (
                    <>
                        <button
                            onClick={handleSuccess}
                            className="px-8 py-3 text-lg font-semibold transition-all transform bg-white text-pink-600 rounded-xl hover:scale-105 hover:bg-pink-50 hover:shadow-lg active:scale-95"
                        >
                            Of course!
                        </button>
                        <button
                            onClick={handleNoClick}
                            className="px-8 py-3 text-lg font-medium transition-all transform border-2 border-white/50 rounded-xl hover:bg-white/10 hover:border-white hover:scale-105 active:scale-95"
                        >
                            No, thanks.
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={handleRejectionConfirm}
                            className="px-8 py-3 text-lg font-semibold transition-all transform bg-white text-red-600 rounded-xl hover:scale-105 hover:bg-red-50 hover:shadow-lg active:scale-95"
                        >
                            Yes
                        </button>
                        <button
                            onClick={handleRejectionRegret}
                            className="px-8 py-3 text-lg font-medium transition-all transform border-2 border-white/50 rounded-xl hover:bg-white/10 hover:border-white hover:scale-105 active:scale-95"
                        >
                            No
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ValentineProposal;
