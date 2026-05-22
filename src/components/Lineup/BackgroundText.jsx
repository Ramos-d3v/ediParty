import React from 'react';

const BackgroundText = ({ name }) => {
    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
            <h2 
                className="text-[25vw] font-black uppercase italic tracking-tighter text-transparent stroke-text opacity-10 whitespace-nowrap transition-all duration-700 ease-out"
                style={{
                    WebkitTextStroke: "1px rgba(255, 255, 255, 0.2)"
                }}
            >
                {name || "ELENCO"}
            </h2>
        </div>
    );
};

export default BackgroundText;
