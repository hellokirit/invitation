import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';

const DatePlanner = () => {
    const receiptRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const [form] = useState({
        what: "Valentine's Day Date",
        where: "Let's decide together",
        when: "2026-02-14",
        who: "Us"
    });

    const handleDownload = async () => {
        if (!receiptRef.current) return;

        try {
            const canvas = await html2canvas(receiptRef.current, {
                backgroundColor: null,
                scale: 2
            });

            const link = document.createElement('a');
            link.download = 'our-date-receipt.png';
            link.href = canvas.toDataURL('image/png');
            link.click();

            setTimeout(() => {
                navigate('/countdown');
            }, 1500);

        } catch (error) {
            console.error("Failed to generate receipt", error);
        }
    };

    return (
        <div className="relative w-full min-h-screen flex items-center justify-center p-4 overflow-hidden">
            <div
                className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0 scale-105 bg-pink-900"
                style={{ backgroundImage: "url('/valentine-bg.jpg')" }}
            >
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            </div>

            <div className="relative z-10 w-full flex flex-col items-center animate-fade-in-up">
                <div
                    ref={receiptRef}
                    className="w-full max-w-3xl p-8 md:p-12 text-black bg-white shadow-2xl rotate-1 font-mono relative"
                    style={{
                        boxShadow: "0 0 30px rgba(0,0,0,0.2)",
                        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 19px, #e5e5e5 20px), linear-gradient(#fafafa, #fafafa)"
                    }}
                >
                    <div className="flex flex-col items-center mb-8 border-b-2 border-dashed border-gray-300 pb-4">
                        <h2 className="text-3xl font-bold tracking-wider uppercase">RECEIPT</h2>
                        <p className="text-sm text-gray-500 mt-1">Order #20260214</p>
                        <p className="text-xs text-gray-400">THANK YOU FOR SAYING YES</p>
                    </div>

                    <div className="space-y-6 mb-8 text-sm md:text-base">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-1">
                            <span className="font-bold text-gray-600 uppercase">What:</span>
                            <span className="font-bold text-black text-right w-1/2">{form.what}</span>
                        </div>

                        <div className="flex items-center justify-between border-b border-gray-100 pb-1">
                            <span className="font-bold text-gray-600 uppercase">Who:</span>
                            <span className="font-bold text-black text-right w-1/2">{form.who}</span>
                        </div>

                        <div className="flex items-center justify-between border-b border-gray-100 pb-1">
                            <span className="font-bold text-gray-600 uppercase">When:</span>
                            <span className="font-bold text-black text-right w-3/5 font-mono">{form.when}</span>
                        </div>

                        <div className="flex items-center justify-between border-b border-gray-100 pb-1">
                            <span className="font-bold text-gray-600 uppercase">Where:</span>
                            <span className="font-bold text-black text-right w-3/5">{form.where}</span>
                        </div>
                    </div>

                    <div className="border-t-2 border-dashed border-gray-300 pt-4 text-center">
                        <p className="text-xl font-bold tracking-widest">TOTAL: $0.00</p>

                        <div className="mt-6 flex flex-col items-center">
                            <div className="h-8 w-4/5 bg-black/10 flex justify-between px-1 items-end overflow-hidden opacity-50">
                                {[...Array(20)].map((_, i) => (
                                    <div key={i} className="bg-black w-[2px]" style={{ height: `${Math.random() * 100}%` }}></div>
                                ))}
                            </div>
                            <p className="text-[10px] mt-1 tracking-[0.2em]">14-02-2026</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleDownload}
                    className="mt-8 px-8 py-3 bg-white text-pink-600 font-bold rounded-full shadow-lg hover:bg-pink-50 hover:scale-105 transition-all active:scale-95"
                >
                    Confirm & Download Receipt
                </button>

                <p className="mt-4 text-sm text-white/60 font-light drop-shadow-md">
                    (Don't forget to send me the receipt!)
                </p>
            </div>
        </div>
    );
};

export default DatePlanner;
