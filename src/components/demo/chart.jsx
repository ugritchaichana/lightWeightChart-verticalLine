// components/demo/chart.jsx
import { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import { VertLine } from '../lightweight-charts/plugins/vertical-line/vertical-line';

export const LineChart = ({ data, height = 300 }) => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#ffffff' },
        textColor: '#333',
      },
      grid: {
        vertLines: { color: '#e0e0e0' },
        horzLines: { color: '#e0e0e0' },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
      height,
    });

    const lineSeries = chart.addLineSeries({
      color: '#2962FF',
      lineWidth: 2,
    });

    lineSeries.setData(data);

    // เพิ่มเส้นแนวตั้ง
    const vertLine = new VertLine(chart, lineSeries, data[2].time, {
      color: 'red',
      width: 2,
      showLabel: true,
      labelText: 'จุดสำคัญ',
      labelTextColor: 'white',
      labelBackgroundColor: 'red'
    });

    lineSeries.addPrimitive(vertLine);

    // ปรับขนาดเมื่อหน้าจอเปลี่ยน
    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data, height]); // ✅ เพิ่ม height ที่นี่

  return <div ref={chartContainerRef} style={{ width: '100%' }} />;
};