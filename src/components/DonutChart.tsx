import { useEffect, useRef, useState } from "react";
import DonutSegment from "./DonutSegment";

type Props = {
    data: number[];
    colors: string[];
    diameter?: number;
    animationDuration?: number;
};

export default function DonutChart({
    data,
    colors,
    diameter,
    animationDuration = 600,
}: Props) {
    const [animated, setAnimated] = useState<number[]>(data);
    const rafRef = useRef<number | null>(null);
    const fromRef = useRef<number[]>(data);

    useEffect(() => {
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }
        fromRef.current = animated.slice();
        const to = data.slice();
        const start = performance.now();

        const step = (t: number) => {
            const pct = Math.min(1, (t - start) / animationDuration);
            const ease = 1 - Math.pow(1 - pct, 3);
            const next = fromRef.current.map((f, i) => f + (to[i] - f) * ease);
            setAnimated(next);
            if (pct < 1) {
                rafRef.current = requestAnimationFrame(step);
            } else {
                setAnimated(to);
            }
        };
        rafRef.current = requestAnimationFrame(step);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [data.join(","), animationDuration]);

    const viewBoxSize = 200;
    const cx = viewBoxSize / 2;
    const cy = viewBoxSize / 2;
    const radius = 70;
    const thickness = viewBoxSize * 0.2;

    let startAngle = -90; // 从正上方开始

    return (
        <svg
            viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
            style={{
                width: diameter ? diameter + "px" : "100%",
                height: diameter ? diameter + "px" : "100%",
                maxWidth: "100%",
                maxHeight: "100%",
            }}
        >
            {animated.map((val, i) => {
                const sweep = (val / 100) * 360;
                const seg = (
                    <DonutSegment
                        key={i}
                        cx={cx}
                        cy={cy}
                        radius={radius}
                        thickness={thickness}
                        startAngle={startAngle}
                        sweepAngle={sweep}
                        color={colors[i]}
                    />
                );
                startAngle += sweep;
                return seg;
            })}
        </svg>
    );
}
