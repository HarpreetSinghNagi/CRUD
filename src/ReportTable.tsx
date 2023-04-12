import React from 'react';
import { ReportData, formatNumber, formatPercentage, formatDate } from './api';

interface ReportTableProps {
  reportData: ReportData[];
}

const ReportTable: React.FC<ReportTableProps> = ({ reportData ,  }) => {
  return (
    <table className='analytics-table'>
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
            <td>{formatDate(data.date)}</td>
            <td>{data.app_id}</td>
            <td>{formatNumber(data.requests)}</td>
            <td>{formatNumber(data.responses)}</td>
            <td>{formatNumber(data.impressions)}</td>
            <td>{formatNumber(data.clicks)}</td>
            <td>{formatNumber(data.revenue)}</td>
            <td>{formatPercentage((data.requests / data.responses) * 100)}</td>
            <td>{formatPercentage(data.impressions ? (data.clicks / data.impressions) * 100 : 0)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReportTable;
