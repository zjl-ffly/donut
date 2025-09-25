
type Props = {
    cx: number;
    cy: number;
    radius: number;   // 圆心半径
    thickness: number; // 环宽
    startAngle: number; // 起始角度 (度数)
    sweepAngle: number; // 占用角度 (度数)
    color: string;
};

export default function DonutSegment({
    cx,
    cy,
    radius,
    thickness,
    startAngle,
    sweepAngle,
    color,
}: Props) {
    const outerR = radius + thickness / 2 - 10;
    const innerR = radius - thickness / 2;

    const rad = (deg: number) => (deg * Math.PI) / 180;

    // 实际绘制角度（减去间隙）

    // 起点角 & 终点角
    const a0 = rad(startAngle + 2);
    const a1 = rad(startAngle + sweepAngle - 2);

    // 起点外圆坐标
    const x0 = cx + outerR * Math.cos(a0);
    const y0 = cy + outerR * Math.sin(a0);

    // 终点外圆坐标
    const x1 = cx + outerR * Math.cos(a1);
    const y1 = cy + outerR * Math.sin(a1);

    // 起点内圆坐标
    const xi0 = cx + innerR * Math.cos(a0);
    const yi0 = cy + innerR * Math.sin(a0);

    // 终点内圆坐标
    const xi1 = cx + innerR * Math.cos(a1);
    const yi1 = cy + innerR * Math.sin(a1);

    const largeArc = sweepAngle > 180 ? 1 : 0;

    // 构造路径：起点凸半圆帽 → 外圆弧 → 终点凹半圆 → 内圆弧
    const d = [
        `M ${xi0} ${yi0}`,
        // 起点凸半圆
        `A ${thickness / 2} ${thickness / 2} 0 0 1 ${x0} ${y0}`,
        // 外圆弧
        `A ${outerR} ${outerR} 0 ${largeArc} 1 ${x1} ${y1}`,
        // 终点凹半圆
        `A ${thickness / 2} ${thickness / 2} 0 0 0 ${xi1} ${yi1}`,
        // 内圆弧回起点
        `A ${innerR} ${innerR} 0 ${largeArc} 0 ${xi0} ${yi0}`,
        "Z",
    ].join(" ");

    return <path d={d} fill={color} />;
}
