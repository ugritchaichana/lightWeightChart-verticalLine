import './App.css';
import { LineChart } from './components/charts/LineChart';
import { VerticalLineChart } from './components/VerticalLineChart';
import { chartData } from './data/chartData';

// Data without time field - for testing non-time based charts
const dataWithoutTime = [
  { value: 10 },
  { value: 15 },
  { value: 20 },
  { value: 18 },
  { value: 25 },
  { value: 30 },
  { value: 28 },
  { value: 35 },
  { value: 32 },
  { value: 40 }
];

const timestampData = [
  { time: 1704067200000, value: 12 }, // 2024-01-01
  { time: 1704153600000, value: 18 }, // 2024-01-02
  { time: 1704240000000, value: 15 }, // 2024-01-03
];

function App() {

  return (
    <>
      <div className="chart-container">
        <h2>ตัวอย่างกราฟเส้นแบบเดิม</h2>
        <LineChart data={chartData} height={300} />
      </div>

      <div className="chart-container">
        <h2>ทดสอบ VerticalLineChart คอมโพเนนต์</h2>
        <VerticalLineChart 
          data={chartData} 
          height={400}
          verticalLineIndex={2}
          labelText="ตำแหน่งสำคัญ"
          verticalLineColor="#FF0000"
          verticalLineDash={[5, 5]}
          chartBgColor="#f8f9fa"
          seriesColor="#0066FF"
          className="test-chart"
          style={{ 
            border: "1px solid #ddd", 
            borderRadius: "8px", 
            padding: "10px",
            marginBottom: "20px"
          }}
          onChartReady={() => console.log("Chart ready!")}
        />
      </div>
      
      <div className="chart-container">
        <h2>ทดสอบ VerticalLineChart แบบที่ 2 (ไม่แสดงสีที่ axis)</h2>
        <VerticalLineChart 
          data={chartData} 
          height={300}
          verticalLineIndex={4} 
          labelText="จุดสูงสุด"
          verticalLineColor="green" 
          verticalLineWidth={3}
          gridLinesVisible={false}
          crosshairEnabled={false}
          showValueInLabel={true}
        />
      </div>

      <div className="chart-container">
        <h2>ทดสอบ VerticalLineChart แบบใหม่ (หลายเส้นแนวตั้ง)</h2>
        <VerticalLineChart 
          data={chartData} 
          height={350}
          chartBgColor="#f8f8f8"
          disablePointHover={true}
          verticalLines={[
            { 
              time: "2024-01-02", 
              color: "red", 
              width: 1.5, 
              dash: [5, 5],
              label: {
                text: "จุดเริ่มต้น", 
                show: true, 
                showValue: true,
                color: "white", 
                bgColor: "red"
              }
            },
            { 
              time: "2024-01-05", 
              color: "green", 
              width: 2, 
              dash: [],
              label: {
                text: "จุดสูงสุด", 
                show: true, 
                showValue: true,
                color: "white", 
                bgColor: "green"
              }
            },
            { 
              time: "2024-01-07", 
              color: "blue", 
              width: 1, 
              dash: [2, 2],
              label: {
                text: "สิ้นสุด", 
                show: true, 
                showValue: false,
                color: "white", 
                bgColor: "blue"
              }
            }
          ]}
          style={{ 
            border: "1px solid #ddd", 
            borderRadius: "8px", 
            padding: "10px",
            marginBottom: "20px"
          }}
        />
      </div>

      <div className="chart-container">
        <h2>ทดสอบใช้ verticalLineTime แทน index</h2>
        <VerticalLineChart 
          data={chartData} 
          height={300}
          verticalLineTime="2024-01-06" 
          labelText="กำหนดด้วยเวลา"
          verticalLineColor="purple" 
          verticalLineWidth={2}
          showValueInLabel={true}
        />
      </div>

      <div className="chart-container">
        <h2>ทดสอบข้อมูลที่ไม่มี time field</h2>
        <VerticalLineChart 
          data={[
            { value: 30 },
            { value: 35 },
            { value: 34 },
            { value: 38 },
            { value: 40 },
            { value: 45 },
            { value: 42 }
          ]}
          height={300}
          verticalLineIndex={4} 
          labelText="จุดสูงสุด"
          verticalLineColor="orange" 
          verticalLineWidth={2}
          showValueInLabel={true}
        />
      </div>

      <div className="chart-container">
        <h2>ทดสอบข้อมูลที่ไม่มี time field กับหลายเส้นแนวตั้ง</h2>
        <VerticalLineChart 
          data={[
            { value: 30 },
            { value: 35 },
            { value: 34 },
            { value: 38 },
            { value: 40 },
            { value: 45 },
            { value: 42 }
          ]}
          height={300}
          disablePointHover={true}
          chartBgColor="#f1f1f1"
          verticalLines={[
            { 
              index: 1, 
              color: "red", 
              width: 2,
              label: { text: "จุดเริ่มต้น" }
            },
            { 
              index: 4, 
              color: "green", 
              width: 2,
              label: { text: "จุดสูงสุด" }
            }
          ]}
        />
      </div>

      <div className="chart-container">
        <h2>ทดสอบ VerticalLineChart กับข้อมูลที่ไม่มี time field</h2>
        <VerticalLineChart 
          data={dataWithoutTime} 
          height={300}
          verticalLineIndex={3}
          labelText="จุดสำคัญ"
          verticalLineColor="purple"
          seriesColor="#FF6600"
          showValueInLabel={true}
          disablePointHover={false}
        />
      </div>

      <div className="chart-container">
        <h2>ทดสอบ VerticalLineChart กับข้อมูลที่ไม่มี time field - หลายเส้น</h2>
        <VerticalLineChart 
          data={dataWithoutTime} 
          height={300}
          seriesColor="#0088CC"
          chartBgColor="#f0f0f0"
          disablePointHover={true}
          verticalLines={[
            { 
              index: 2, // ใช้ index แทน time สำหรับข้อมูลที่ไม่มี time field
              color: "red", 
              width: 2, 
              dash: [],
              label: {
                text: "จุดต่ำสุด", 
                show: true, 
                showValue: true,
                color: "white", 
                bgColor: "red"
              }
            },
            { 
              index: 7, // ใช้ index แทน time สำหรับข้อมูลที่ไม่มี time field
              color: "green", 
              width: 2, 
              dash: [],
              label: {
                text: "จุดสูงสุด", 
                show: true, 
                showValue: true,
                color: "white", 
                bgColor: "green"
              }
            }
          ]}
        />
      </div>

      <div className="chart-container">
        <h2>ทดสอบ VerticalLineChart กับ Timestamp</h2>
        <VerticalLineChart 
          data={timestampData}
          height={300}
          verticalLineTime={1704153600}
          labelText="ด้วย Timestamp"
          verticalLineColor="red"
        />
      </div>
    </>
  );
}

export default App;