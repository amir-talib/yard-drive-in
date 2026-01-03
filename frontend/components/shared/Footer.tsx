"use client";

export function Footer() {
    return (
        <footer className="bg-navy border-t-4 border-gold py-8">
            <div className="container mx-auto px-4 text-center">
                <div className="mb-4">
                    <p className="font-mono text-gold text-sm mb-1">📅 10th January 2026 • Gates Open 5PM</p>
                    <p className="font-mono text-paper/60 text-xs">📍 Opposite Federal Ministry of Justice (Judges Quarters), Abuja</p>
                </div>
                <div className="w-16 h-px bg-gold/30 mx-auto mb-4" />
                <p className="font-mono text-paper/80 text-sm">
                    © 2026 Yard Drive-In. All rights reserved.
                </p>
                <p className="font-mono text-gold/60 text-xs mt-2">
                    Built by <span className="text-gold">Trojan Tech Industries</span>
                </p>
            </div>
        </footer>
    );
}

