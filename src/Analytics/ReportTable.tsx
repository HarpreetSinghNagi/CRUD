import React from 'react';
import { ReportData, formatDate, formatNumber} from './api';

interface ReportTableProps {
    reportData: ReportData[];
    selectedColumns: string[];
  }

 export  const getHeading = (column: string) => {
  if (column === "Unchecked") {
    return "";
  }
    switch (column) {
      case 'date':
        return 'Date';
      case 'app_name':
        return 'App Name';
      case 'requests':
        return 'Ad Requests';
      case 'responses':
        return 'Ad Responses';
      case 'impressions':
        return 'Impressions';
      case 'clicks':
        return 'Clicks';
      case 'revenue':
        return 'Revenue';
      case 'fill_rate':
        return 'Fill Rate';
      case 'ctr':
        return 'CTR';
      default:
        return column.toUpperCase();
    }
  }
  
  const ReportTable: React.FC<ReportTableProps> = ({ reportData, selectedColumns }) => {

    return (
        <table className='analytics-table'>
        <thead>
          <tr>
            {selectedColumns.map((column) => (
              <th key={column}>{getHeading(column)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {reportData.map((row, index) => (
            <tr key={index}>
              {selectedColumns.map((column) => (
                  <td key={column}>
                  {column === 'date'
                    ? formatDate(row[column])
                    : column === 'request' || column === 'clicks'
                    ? formatNumber(row[column])
                    : column === 'response' || column === 'impression'
                    ? formatNumber(row[column])
                    : column === 'revenue'
                    ? `₹${row[column].toFixed(2)}`
                    : column === 'fill_rate'
                    ? row[column]
                    : column === 'ctr'
                    ? row[column]
                    : row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

export default ReportTable;
