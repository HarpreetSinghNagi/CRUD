import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./Analytics.css"
import ReportTable from './ReportTable';
import { fetchReportData, ReportData } from './api';

interface AnalyticsProps {
  apiUrl: string;
}

const Analytics: React.FC<AnalyticsProps> = ({ apiUrl }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [reportData, setReportData] = useState<ReportData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const fetchData = async () => {
    if (!startDate || !endDate) {
      return;
    }

    setIsLoading(true);

    const startDateString = startDate.toISOString().slice(0, 10);
    const endDateString = endDate.toISOString().slice(0, 10);

    try {
      const data = await fetchReportData(apiUrl, startDateString, endDateString);
      console.log(data);
      setReportData(data);
    } catch (error) {
      console.error('Error fetching report data', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSettingsModal = () => {
    setShowSettingsModal(!showSettingsModal);
  }

  const renderSettingsModal = () => {
    return (
      <div className='analytics-settings-modal'>
        <div className='analytics-settings-modal-header'>
          <span>Column Settings</span>
          <button className='analytics-settings-modal-close' onClick={toggleSettingsModal}>X</button>
        </div>
        <div className='analytics-settings-modal-content'>
          {reportData.length > 0 && Object.keys(reportData[0]).map((key) => (
            <div key={key} className='analytics-settings-modal-item'>
              <input type='checkbox' id={key} defaultChecked />
              <label htmlFor={key}>{key}</label>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className='analytics-container'>
      <h1 className='analytics-title'>Analytics</h1>
      <div className='analytics-date-range-picker-container'>

        <div className='analytics-date-range-picker'>
          <label className='analytics-date-range-picker-label' htmlFor="start-date-picker">Start Date</label>
          <DatePicker 
            id="start-date-picker"
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
        </div>

        <div className='analytics-date-range-picker'>
          <label className='analytics-date-range-picker-label' htmlFor="end-date-picker">End Date</label>
          <DatePicker  className='analytics-date-range-picker'
            id="end-date-picker"
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </div>

      </div>

      <div className='analytics-buttons-container'>
        <button className='analytics-button analytics-button-fetch-data' onClick={fetchData}>Fetch Data</button>
        <button className='analytics-button analytics-button-settings' onClick={toggleSettingsModal}>Settings</button>
      </div>

      {isLoading && <div className='analytics-loading'>Loading...</div>}
      {showSettingsModal && renderSettingsModal()}
      {!isLoading && reportData.length > 0 ? (
        <ReportTable reportData={reportData} />) : (
          <div className='analytics-placeholder'>No data to display</div>
                )}
    
      </div>
);
};

export default Analytics;
