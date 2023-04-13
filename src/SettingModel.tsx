import React, { useState } from 'react';
import { ReportData } from './api';

interface SettingsModalProps {
  selectedColumns: string[];
  setSelectedColumns: React.Dispatch<React.SetStateAction<string[]>>;
  reportData: ReportData[];
  toggleSettingsModal: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ selectedColumns, setSelectedColumns, reportData, toggleSettingsModal }) => {
  const [updatedSelectedColumns, setUpdatedSelectedColumns] = useState(selectedColumns);

  const handleColumnToggle = (column: string) => {
    setUpdatedSelectedColumns(prevSelectedColumns => {
      if (prevSelectedColumns.includes(column)) {
        return prevSelectedColumns.filter(col => col !== column);
      } else {
        return [...prevSelectedColumns, column];
      }
    });
  };

  const handleApplyChanges = () => {
    setSelectedColumns(updatedSelectedColumns);
    toggleSettingsModal();
  };

  return (
    <div className='analytics-settings-modal'>
      <div className='analytics-settings-modal-header'>
        <span>Column Settings</span>
        <button className='analytics-settings-modal-close' onClick={toggleSettingsModal}>X</button>
      </div>
      <div className='analytics-settings-modal-content'>
        {reportData.length > 0 && Object.keys(reportData[0]).map((key) => (
          <div key={key} className='analytics-settings-modal-item'>
            <input type='checkbox' id={key} checked={updatedSelectedColumns.includes(key)} onChange={() => handleColumnToggle(key)} />
            <label htmlFor={key}>{key}</label>
          </div>
        ))}
        <div className='analytics-settings-modal-footer'>
          <button className='analytics-button analytics-button-apply' onClick={handleApplyChanges}>Apply Changes</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;


