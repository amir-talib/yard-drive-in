import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TicketProps {
    type: "NORMAL" | "VIP";
    price: string;
    includes: string[];
    className?: string;
}

export function TicketCard({ type, price, includes, className }: TicketProps) {
    const isVip = type === "VIP";

    return (
        <div className={cn("relative group", className)}>
            {/* Ticket Body */}
            <Card
                className={cn(
                    "relative border-2 border-navy bg-paper overflow-hidden transition-transform duration-300 md:hover:-translate-y-2",
                    isVip ? "border-gold shadow-[6px_6px_0px_0px_var(--color-gold)] md:shadow-[8px_8px_0px_0px_var(--color-gold)]" : "shadow-[6px_6px_0px_0px_var(--color-navy)] md:shadow-[8px_8px_0px_0px_var(--color-navy)]"
                )}
            >
                {/* Perforation Line - Hidden on mobile */}
                <div className="hidden md:block absolute left-[70%] top-0 bottom-0 w-[2px] border-l-2 border-dashed border-navy/30" />

                {/* Semi-Circles for Perforation Effect - Hidden on mobile */}
                <div className="hidden md:block absolute top-[-10px] left-[70%] ml-[-10px] w-5 h-5 bg-background rounded-full border-2 border-navy" />
                <div className="hidden md:block absolute bottom-[-10px] left-[70%] ml-[-10px] w-5 h-5 bg-background rounded-full border-2 border-navy" />

                <div className="flex flex-col md:flex-row h-full">
                    {/* Main Section */}
                    <div className="flex-1 p-4 md:p-6 md:pr-10">
                        <CardHeader className="p-0 mb-4">
                            <div className="uppercase tracking-widest text-[10px] md:text-xs font-bold text-muted-foreground mb-1">
                                One Night Only
                            </div>
                            <CardTitle className={cn("text-3xl md:text-4xl font-display uppercase", isVip ? "text-orange" : "text-navy")}>
                                {type}
                            </CardTitle>
                            <div className="text-xl md:text-2xl font-bold mt-2 font-mono">
                                {price}
                            </div>
                        </CardHeader>
                        <CardContent className="p-0 space-y-2">
                            <p className="text-xs md:text-sm font-bold uppercase mb-2">Includes:</p>
                            <ul className="text-xs md:text-sm space-y-1.5 font-merriweather opacity-90">
                                {includes.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 bg-red rounded-full mt-1.5 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>

                        {/* Mobile CTA - Always visible */}
                        <div className="mt-6 md:hidden">
                            <a href="https://www.jetronticket.com/yarddrivein?checkout=true" target="_blank" rel="noopener noreferrer" className="block">
                                <Button
                                    size="lg"
                                    variant={isVip ? "secondary" : "default"}
                                    className="w-full text-base font-bold py-6 active:scale-95 transition-transform"
                                >
                                    SECURE TICKET
                                </Button>
                            </a>
                        </div>
                    </div>

                    {/* Stub Section (Right Side) - Hidden on mobile */}
                    <div className="hidden md:flex w-[30%] bg-muted/20 flex-col items-center justify-center p-4 border-l-2 border-dashed border-navy/10 relative">
                        <div className="rotate-90 text-xs font-mono tracking-widest text-muted-foreground whitespace-nowrap absolute">
                            ADMIT ONE CAR
                        </div>
                    </div>
                </div>

                {/* Desktop Action Button Overlay - Hidden on mobile */}
                <div className="hidden md:flex absolute inset-0 bg-navy/80 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center backdrop-blur-sm">
                    <a href="https://www.jetronticket.com/yarddrivein?checkout=true" target="_blank" rel="noopener noreferrer">
                        <Button size="lg" variant={isVip ? "secondary" : "default"} className="animate-in zoom-in-50 duration-300">
                            SECURE TICKET
                        </Button>
                    </a>
                </div>
            </Card>
        </div>
    );
}
