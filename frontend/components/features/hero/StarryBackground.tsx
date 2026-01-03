"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";

function Stars(props: any) {
    const ref = useRef<any>(null);
    const [sphere] = useMemo(() => {
        const coords = random.inSphere(new Float32Array(5000), { radius: 1.2 });
        // Sanitize NaN values that can occur with some random implementations
        for (let i = 0; i < coords.length; i++) {
            if (isNaN(coords[i]) || !isFinite(coords[i])) {
                coords[i] = (Math.random() - 0.5) * 2.4; // Random value within sphere bounds
            }
        }
        return [coords];
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#FFFDF0"
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

function Lanterns() {
    const count = 30;
    // Generate random positions for lanterns
    const lanterns = useMemo(() => {
        return new Array(count).fill(0).map(() => ({
            position: [
                (Math.random() - 0.5) * 10, // x
                (Math.random() - 0.5) * 5,  // y
                (Math.random() - 0.5) * 5   // z
            ] as [number, number, number],
            speed: 0.5 + Math.random(),
            phase: Math.random() * Math.PI
        }));
    }, []);

    return (
        <>
            {lanterns.map((lantern, i) => (
                <Lantern key={i} position={lantern.position} speed={lantern.speed} phase={lantern.phase} />
            ))}
        </>
    );
}

function Lantern({ position, speed, phase }: { position: [number, number, number]; speed: number; phase: number }) {
    const mesh = useRef<any>(null);
    const light = useRef<any>(null);
    const material = useRef<any>(null);

    useFrame((state, delta) => {
        if (mesh.current) {
            // Gentle floating movement up and drift
            mesh.current.position.y += delta * 0.1 * speed;
            mesh.current.position.x += Math.sin(state.clock.elapsedTime * 0.5 + phase) * 0.002;

            // Loop back to bottom if too high (simple reset)
            if (mesh.current.position.y > 4) {
                mesh.current.position.y = -4;
            }

            // Flickering effect
            const flicker = 1.5 + Math.sin(state.clock.elapsedTime * 10 + phase) * 0.5 + (Math.random() * 0.2);
            if (light.current) light.current.intensity = flicker * 1.5;
            if (material.current) material.current.emissiveIntensity = flicker;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={mesh} position={position}>
                {/* Lantern Body */}
                <cylinderGeometry args={[0.05, 0.08, 0.15, 8]} />
                <meshStandardMaterial
                    ref={material}
                    color="#E06C3E"
                    emissive="#F4C430"
                    emissiveIntensity={2}
                    transparent
                    opacity={0.8}
                />

                {/* Simple Point Light to simulate glow */}
                <pointLight ref={light} distance={1.5} decay={2} intensity={2} color="#F4C430" />
            </mesh>
        </Float>
    )
}

export function StarryBackground() {
    return (
        <div className="absolute inset-0 z-0 bg-navy pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-orange/10 mix-blend-overlay z-10" />
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Stars />
                <Lanterns />
            </Canvas>
        </div>
    );
}
