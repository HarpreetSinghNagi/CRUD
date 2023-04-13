import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Analytics.css';
import ReportTable from './ReportTable';
import { fetchReportData, ReportData } from './api';
import SettingsModal from './SettingModel';

interface AnalyticsProps {
  apiUrl: string;
}

export const Analytics: React.FC<AnalyticsProps> = ({ apiUrl }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [reportData, setReportData] = useState<ReportData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  useEffect(() => {
    setSelectedColumns([ 'date' , 'app_name' , 'requests' , 'responses' , 'impressions' , 'clicks' , 'revenue', 'fill_rate' , "ctr"]);
  }, []);

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
  };

  return (
    <div className='analytics-container'>
      <img className="analytics-icon"  src="https://cdn.dribbble.com/users/189524/screenshots/2818547/media/d91628575a5382db2c4828ce539848f8.gif" alt='calendar icon' />

      <div className='analytics-date-range-picker-container'>
        <div className='analytics-date-range-picker'>
          <DatePicker
            id='start-date-picker'
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className='analytics-input'
            placeholderText='Start Date'
          />
        </div>

        <div className='analytics-date-range-picker'>
          <DatePicker
            id='end-date-picker'
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className='analytics-input'
            placeholderText='End Date'
          />
        </div>
      </div>

      <div className='analytics-buttons-container'>
        <button className='analytics-button analytics-button-fetch-data' onClick={fetchData}>
          Fetch Data
        </button>
        {reportData.length > 0 ? (
          <button
            className='analytics-button analytics-button-settings'
            onClick={toggleSettingsModal}
            disabled={isLoading || reportData.length === 0}
          >
            Settings
          </button>
        ) : null}
      </div>

      {isLoading && <div className='analytics-loading'>Loading...</div>}
      {showSettingsModal && (
        <SettingsModal
          selectedColumns={selectedColumns}
          setSelectedColumns={setSelectedColumns}
          reportData={reportData}
          toggleSettingsModal={toggleSettingsModal}
        />
      )}
      {!isLoading && reportData.length > 0 ? (
        <ReportTable reportData={reportData} selectedColumns={selectedColumns} />
      ) : ( null)}
    </div>
  )
      };
