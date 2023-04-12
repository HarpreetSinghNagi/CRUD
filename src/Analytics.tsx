import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface ReportData {
  date: string;
  app_id: number;
  app_name: string;
  requests: number;
  responses: number;
  impression: number;
  clicks: number;
  revenue: number;
  fill_rate: number;
  ctr: number;
}

interface AnalyticsProps {
  apiUrl: string;
}

const Analytics: React.FC<AnalyticsProps> = ({ apiUrl }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [reportData, setReportData] = useState<ReportData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    if (!startDate || !endDate) {
      return;
    }

    setIsLoading(true);

    const startDateString = startDate.toISOString().slice(0, 10);
    const endDateString = endDate.toISOString().slice(0, 10);

    try {
      const response = await fetch(
        `${apiUrl}/dummy/report?startDate=${startDateString}&endDate=${endDateString}`
      );
      const data = await response.json();
      console.log(data);
      setReportData(data.data);
    } catch (error) {
      console.error('Error fetching report data', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Analytics</h1>
      <div>
        <label htmlFor="start-date-picker">Start Date:</label>
        <DatePicker
          id="start-date-picker"
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      <div>
        <label htmlFor="end-date-picker">End Date:</label>
        <DatePicker
          id="end-date-picker"
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
      </div>
      <button onClick={fetchData}>Fetch Data</button>
      {isLoading && <div>Loading...</div>}
     {!isLoading && reportData.length === 0 && <div>No data to display</div>}
       {!isLoading && reportData.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>App Name</th>
              <th>AD Request</th>
              <th>AD Response</th>
              <th>Impression</th>
              <th>Clicks</th>
              <th>Revenue</th>
              <th>Fill Rate</th>
              <th>CTR</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((data) => (
              <tr key={data.date}>
                <td>{data.date}</td>
                <td>{data.app_id}</td>
                <td>{data.requests}</td>
                <td>{data.responses}</td>
                <td>{data.impression}</td>
                <td>{data.clicks}</td>
                <td>{data.revenue}</td>
                <td>{`${((data.requests / data.responses) * 100).toFixed(2)}%`}</td>
               <td>{`${data.impression ? ((data.clicks / data.impression) * 100).toFixed(2) : 0}%`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}  
    </div>
  );
};

export default Analytics;
