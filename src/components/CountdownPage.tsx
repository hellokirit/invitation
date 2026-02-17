import { useState, useEffect, useRef } from 'react';
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

    // Audio State
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

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

    // Audio Effect
    useEffect(() => {
        if (audioRef.current) return; // Prevent recreation

        audioRef.current = new Audio('/her.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.005; // Lower volume for background music

        const handleTimeUpdate = () => {
            if (audioRef.current) {
                setCurrentTime(audioRef.current.currentTime);
            }
        };

        const handleLoadedMetadata = () => {
            if (audioRef.current) {
                setDuration(audioRef.current.duration);
            }
        };

        audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
                audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    // Auto-play when time is up
    useEffect(() => {
        if (isTimeUp && audioRef.current && !isPlaying) {
            audioRef.current.play().catch(e => console.error("Auto-play failed:", e));
            setIsPlaying(true);
        }
    }, [isTimeUp]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
            }
            setIsPlaying(!isPlaying);
        }
    };

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };



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
                            <div className="font-serif leading-relaxed text-lg space-y-4 text-gray-800">
                                <p>
                                    tanda mo pa ba yung kinwento ko nung nakaraan na di ako pumasok ng isang buong sem nung grade 12? well, the story goes back to grade 11. new faces, lahat ng kaklase ko di ko kilala. tas online pa so di ko talaga alam kung ano nasa isip nila behind the messages they send, mga reaksyon nila sa likod ng off na camera. magiinput ako tas walang feedback. magrerecite ako tas di ko alam kung pinagtatawanan or nilalait na nila ako. i was very much anxious. maghhyperventilate ako halos araw-araw mag-isa sa kwarto ko. remember nung sportsfest cheerdance kfc afterparty? yung nagdala ako plastic sa cr? i was hyperventilating na nun e. anyways, lalabas ako sa kwarto after class na para bang walang nangyari. tatanungin ako na kamusta klase tas sasabihin ko na okay lang. day by day by day. hanggang sa natapos ko naman grade 11 tas naggrade 12 na. terrible school management happened and nalipat ako ng section. nung first week to second week naman, napasok pa ako. nakuha pa nga ako ni moises sa group niya sa research. but something happened that second week. recitation ng buong class tas ako pinakahuli kase takot akong magvolunteer. nakapagrecite naman ako kaso napansin ng teacher na kinakabahan ako. bat daw kinakabahan, dapat di na daw kabahan, ganto ganyan. di ko na alam kung anong nasa isip ko nun basta after nun, never na ako pumasok. pupunta ako kwarto na kunwari nag-aaral pero nagbabasa lang ng novels buong araw. minsan tutulala lang ako thinking about knowledge management system. kamusta klase? okay lang. hanggang sa malaman ni mama kase nagchat na adviser namin sa kaniya. nagagalit na sakin kase ayaw ko sabihin kung bakit pero after everything was said and done, i was there bawling my eyes out. ang sinabi ko nun is yung nabasa mo rin ngayon. i felt liberated, di ko na pasan pasan ang mundo.
                                </p>
                            </div>
                        </section>

                        <section className="w-full max-w-md bg-black/60 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl shadow-lg flex items-center justify-center animate-pulse">
                                    <span className="text-2xl">🎵</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white">Her</h3>
                                    <p className="text-pink-200">JVKE</p>
                                </div>
                            </div>

                            <div className="w-full bg-white/10 h-1.5 rounded-full mb-2 overflow-hidden cursor-pointer" onClick={(e) => {
                                if (audioRef.current && duration) {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const x = e.clientX - rect.left;
                                    const percentage = x / rect.width;
                                    audioRef.current.currentTime = percentage * duration;
                                    setCurrentTime(percentage * duration);
                                }
                            }}>
                                <div
                                    className="bg-pink-500 h-full rounded-full transition-all duration-100 ease-linear"
                                    style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between text-xs text-white/50 mb-6">
                                <span>{formatTime(currentTime)}</span>
                                <span>{formatTime(duration)}</span>
                            </div>

                            <div className="flex justify-center items-center gap-8 text-2xl">
                                <button className="text-white/70 hover:text-white transition-colors" onClick={() => {
                                    if (audioRef.current) audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
                                }}>⏮️</button>
                                <button
                                    className="w-12 h-12 flex items-center justify-center bg-white text-black rounded-full shadow hover:scale-105 active:scale-95 transition-all"
                                    onClick={togglePlay}
                                >
                                    {isPlaying ? '⏸️' : '▶️'}
                                </button>
                                <button className="text-white/70 hover:text-white transition-colors" onClick={() => {
                                    if (audioRef.current) audioRef.current.currentTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + 10);
                                }}>⏭️</button>
                            </div>
                        </section>



                    </motion.div>
                )}
            </div>


        </div>
    );
};

export default CountdownPage;
