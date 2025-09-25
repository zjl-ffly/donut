import React, { useState } from "react";
import DonutChart from "./components/DonutChart";

const COLORS = ["red", "green", "blue", "orange"];

function randomPartitionSum100(): number[] {
  // 生成 4 个非负整数和为 100：使用 3 个随机切点
  const cuts = new Set<number>();
  while (cuts.size < 3) cuts.add(Math.floor(Math.random() * 101)); // 0..100
  const arr = Array.from(cuts).sort((a, b) => a - b);
  const parts = [arr[0], arr[1] - arr[0], arr[2] - arr[1], 100 - arr[2]];
  return parts;
}

export default function App() {
  const [values, setValues] = useState<number[]>([25, 25, 25, 25]);

  const handleRandom = () => {
    setValues(randomPartitionSum100());
  };

  return (
    <div className="page">
      <div className="panel">
        <div className="donut-area">
          {/* 不传 diameter 则继承父容器宽度；可以传 diameter={200}（px） */}
          <DonutChart
            data={values}
            colors={COLORS}
          // diameter={240} // 可选：取消注释试验传入 diameter
          />
        </div>

        <div className="controls">
          <div className="controls-top">
            <button className="btn" onClick={handleRandom}>Random</button>
            {/* <button className="btn ghost" onClick={() => setValues([0, 0, 0, 100])}>Example</button> */}
          </div>

          <div className="list">
            {values.map((v, i) => (
              <div key={i} className="item">
                <span className="dot" style={{ background: COLORS[i] }} />
                <span>Index {i}</span>
                <span className="value">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
