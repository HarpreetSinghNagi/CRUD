import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

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
      console.error("Error fetching report data", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Title>Analytics</Title>
      <DateRangePickerContainer>
        <DateRangePicker>
          <Label htmlFor="start-date-picker">Start Date:</Label>
          <DatePicker
            id="start-date-picker"
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
        </DateRangePicker>
        <DateRangePicker>
          <Label htmlFor="end-date-picker">End Date:</Label>
          <DatePicker
            id="end-date-picker"
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </DateRangePicker>
        <Button onClick={fetchData}>Fetch Data</Button>
      </DateRangePickerContainer>
      {isLoading && <Loading>Loading...</Loading>}
      {!isLoading && reportData.length === 0 && (
        <NoData>No data to display</NoData>
      )}
      {!isLoading && reportData.length > 0 && (
        <Table>
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
                <td>{`${((data.requests / data.responses) * 100).toFixed(
                  2
                )}%`}</td>
                <td>{`${((data.clicks / data.impression) * 100).toFixed(
                  2
                )}%`}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

const Container = styled.div`display: flex; flex-direction: column; align-items: center; padding: 2rem;`;

const Title = styled.h1`font-size: 2rem; margin-bottom: 2rem;`;

const DateRangePickerContainer = styled.div`display: flex; align-items: center; margin-bottom: 2rem;`;

const DateRangePicker = styled.div`display: flex; flex-direction: column; align-items: flex-start; margin-right: 2rem`;

const Label = styled.label`margin-bottom: 0.5rem`;

const Button = styled.button`
background-color: #1976d2;
color: #fff;
border: none;
border-radius: 0.25rem;
padding: 0.5rem 1rem;
cursor: pointer;
transition: background-color 0.2s ease-in-out;

&:hover {
background-color: #1565c0;
}
`;

const Loading = styled.div`font-size: 1.5rem; font-weight: bold; margin-bottom: 2rem;`;

const NoData = styled.div`font-size: 1.5rem; font-weight: bold; margin-bottom: 2rem;`;

const Table = styled.table`
width: 100%;
border-collapse: collapse;

th,
td {
text-align: left;
padding: 0.5rem;
border: 1px solid #ddd;
}

th {
font-weight: bold;
background-color: #f2f2f2;
}

tr:nth-child(even) {
background-color: #f2f2f2;
}

tr:hover {
background-color: #ddd;
}
`;

export default Analytics;
