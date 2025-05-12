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
      // Create vertical line marker
    const verticalLineTime = data[2].time;
    // Create a price label at the important point
    lineSeries.createPriceLine({
      price: data[2].value,
      color: 'red',
      lineWidth: 2,
      lineStyle: 0, // Solid line
      axisLabelVisible: true,
      title: 'จุดสำคัญ', // Important point in Thai
      lineVisible: false, // We don't want a horizontal line
    });
      // Add custom vertical line using a plugin-like approach
    const timeScale = chart.timeScale();
    
    // Store a reference to the DOM element for cleanup
    const chartElement = chartContainerRef.current;
    
    // Create a subscription to chart resizing and time range changes
    const updateVerticalLine = () => {
      // Find the coordinate for the time value
      const x = timeScale.timeToCoordinate(verticalLineTime);
      
      // Only proceed if we have a valid x coordinate
      if (x !== null) {
        // Get the canvas and context when we need to update
        const canvas = chartElement.querySelector('canvas');
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            // Clear any previous drawing first (only the part we need)
            ctx.save();
            ctx.globalCompositeOperation = 'copy';
            ctx.strokeStyle = 'transparent';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height - 30);
            ctx.stroke();
            ctx.restore();
            
            // Save state
            ctx.save();
            // Set drawing style
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.setLineDash([]);
            
            // Draw vertical line
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height - 30); // Avoid drawing over the time axis
            ctx.stroke();
            
            // Restore state
            ctx.restore();
          }
        }
      }
    };// Update the vertical line whenever the chart is interacted with
    chart.subscribeClick(() => {
      setTimeout(updateVerticalLine, 50);
    });
    
    // This is crucial - update vertical line whenever visible range changes (scrolling, zooming)
    timeScale.subscribeVisibleLogicalRangeChange(() => {
      requestAnimationFrame(updateVerticalLine);
    });
    
    // Update when price scale changes
    chart.subscribeCrosshairMove(() => {
      requestAnimationFrame(updateVerticalLine);
    });
    
    // Subscribe to visible time range changes (scrolling)
    timeScale.subscribeVisibleTimeRangeChange(() => {
      requestAnimationFrame(updateVerticalLine);
    });
      // Add a full repaint after any mouse interaction
    const wheelHandler = () => {
      setTimeout(updateVerticalLine, 50);
    };
    chartElement.addEventListener('wheel', wheelHandler);
    
    window.addEventListener('resize', updateVerticalLine);
    
    // Initial draw
    setTimeout(updateVerticalLine, 100);
    
    // ปรับขนาดเมื่อหน้าจอเปลี่ยน
    const handleResize = () => {
      chart.resize();
      setTimeout(updateVerticalLine, 50);
    };
    window.addEventListener('resize', handleResize);
      return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', updateVerticalLine);
      chartElement?.removeEventListener('wheel', wheelHandler);
      chart.remove();
    };
  }, [data, height]);
  return <div ref={chartContainerRef} style={{ width: '100%' }} />;
};