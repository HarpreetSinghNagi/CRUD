import React from 'react';
import { ReportData } from './api';

interface ReportTableProps {
    reportData: ReportData[];
    selectedColumns: string[];
  }
  
  const ReportTable: React.FC<ReportTableProps> = ({ reportData, selectedColumns }) => {
    return (
        <table className='analytics-table'>
        <thead>
          <tr>
            {selectedColumns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {reportData.map((row, index) => (
            <tr key={index}>
              {selectedColumns.map((column) => (
                <td key={column}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

export default ReportTable;
