import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CountdownPage = () => {
    const calculateTimeLeft = () => {
        const targetDate = new Date(2026, 1, 14, 0, 0, 0).getTime();
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference < 0) {
            return { total: difference, days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
            total: difference,
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000),
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [isTimeUp, setIsTimeUp] = useState(timeLeft.total < 0);

    useEffect(() => {
        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft();
            setTimeLeft(newTimeLeft);

            if (newTimeLeft.total < 0) {
                setIsTimeUp(true);
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full min-h-screen text-white bg-black overflow-y-auto overflow-x-hidden flex flex-col items-center p-4">
            <div
                className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0 scale-105 bg-pink-900"
                style={{ backgroundImage: "url('/valentine-bg.jpg')" }}
            >
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            </div>

            <div className="relative z-10 w-full max-w-4xl flex flex-col items-center py-20">

                {!isTimeUp ? (
                    <motion.div
                        className="text-center sticky top-20"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="mb-12 text-4xl md:text-6xl font-bold font-freckle drop-shadow-lg text-pink-200">
                            See you soon!
                        </h1>

                        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                            {Object.entries(timeLeft)
                                .filter(([key]) => key !== 'total')
                                .map(([unit, value]) => (
                                    <div key={unit} className="flex flex-col items-center bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 min-w-[100px] md:min-w-[140px] border border-white/20 shadow-xl">
                                        <span className="text-4xl md:text-6xl font-bold font-freckle text-white drop-shadow-md">
                                            {String(value).padStart(2, '0')}
                                        </span>
                                        <span className="text-sm md:text-lg uppercase tracking-widest text-pink-200 mt-2 font-medium">
                                            {unit}
                                        </span>
                                    </div>
                                ))}
                        </div>

                        <p className="mt-12 text-xl md:text-2xl font-light text-white/80 animate-pulse">
                            Counting down to February 14, 2026.<br></br>Make sure to come back to this after the countdown ends! You'll be surprised!
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="w-full flex flex-col gap-20 items-center"
                    >
                        <section className="w-full max-w-2xl bg-white/90 text-black p-8 md:p-12 rounded-lg shadow-2xl rotate-1 transform hover:rotate-0 transition-transform duration-500">
                            <h2 className="text-3xl font-freckle text-pink-600 mb-6 text-center">My Dearest Valentine</h2>
                            <div className="font-serif leading-relaxed text-lg space-y-4 text-gray-800">
                                <p>My Dearest,</p>
                                <p>
                                    As the countdown finally reaches zero, I want to take a moment to tell you how much you mean to me.
                                    Looking forward to this day has been the highlight of my year.
                                </p>
                                <p>
                                    You bring so much color and joy into my world, just like the beautiful background of this page.
                                    I can't wait to create more memories with you today and forever.
                                </p>
                                <p>
                                    Happy Valentine's Day!
                                </p>
                                <p className="text-right mt-8 font-bold">- Always Yours</p>
                            </div>
                        </section>

                        <section className="w-full max-w-md bg-black/60 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl shadow-lg flex items-center justify-center animate-pulse">
                                    <span className="text-2xl">🎵</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white">Our Song</h3>
                                    <p className="text-pink-200">The Perfect Artist</p>
                                </div>
                            </div>

                            <div className="w-full bg-white/10 h-1.5 rounded-full mb-2 overflow-hidden">
                                <div className="bg-pink-500 w-1/3 h-full rounded-full"></div>
                            </div>
                            <div className="flex justify-between text-xs text-white/50 mb-6">
                                <span>1:23</span>
                                <span>3:45</span>
                            </div>

                            <div className="flex justify-center items-center gap-8 text-2xl">
                                <button className="text-white/70 hover:text-white transition-colors">⏮️</button>
                                <button className="w-12 h-12 flex items-center justify-center bg-white text-black rounded-full shadow hover:scale-105 active:scale-95 transition-all">▶️</button>
                                <button className="text-white/70 hover:text-white transition-colors">⏭️</button>
                            </div>
                        </section>

                        <section className="w-full max-w-4xl text-center">
                            <h2 className="text-4xl font-freckle text-white mb-8 drop-shadow-lg">Us Through Time</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 md:col-span-2 md:row-span-2 flex items-center justify-center text-white/30 text-xl font-freckle hover:bg-white/20 transition-colors">
                                    [Big Photo of Us]
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center text-white/30 font-freckle hover:bg-white/20 transition-colors">
                                    [Photo 1]
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center text-white/30 font-freckle hover:bg-white/20 transition-colors">
                                    [Photo 2]
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 md:col-span-3 flex items-center justify-center text-white/30 font-freckle p-8 hover:bg-white/20 transition-colors">
                                    [Funny Photo of Us]
                                </div>
                            </div>
                        </section>

                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default CountdownPage;
