"use client";

import React from "react";

export function RetroOverlay() {
    return (
        <>
            {/* Noise Grain Layer */}
            <div className="fixed inset-0 pointer-events-none z-[9998] retro-noise" />

            {/* Scanlines Layer */}
            <div className="fixed inset-0 pointer-events-none z-[9997] scanlines" />

            {/* Vignette Layer */}
            <div className="fixed inset-0 pointer-events-none z-[9999] vignette" />
        </>
    );
}
