import React, { useState } from 'react';
import { ReportData } from './api';

interface SettingsModalProps {
  selectedColumns: string[];
  setSelectedColumns: React.Dispatch<React.SetStateAction<string[]>>;
  reportData: ReportData[];
  toggleSettingsModal: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ selectedColumns, setSelectedColumns, reportData, toggleSettingsModal }) => {
  const [showColumns, setShowColumns] = useState<{[key: string]: boolean}>(() => {
    const initialShowColumns: {[key: string]: boolean} = {};
    selectedColumns.forEach((column) => {
      initialShowColumns[column] = true;
    });
    return initialShowColumns;
  });
  const [updatedSelectedColumns, setUpdatedSelectedColumns] = useState(selectedColumns);
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);

  const handleApplyChanges = () => {
    setSelectedColumns(updatedSelectedColumns.filter((column) => showColumns[column]));
    toggleSettingsModal();
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, column: string) => {
    setDraggedColumn(column);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, column: string) => {
    const draggedIndex = updatedSelectedColumns.indexOf(draggedColumn!);
    const dropIndex = updatedSelectedColumns.indexOf(column);
    if (draggedIndex === -1 || dropIndex === -1) {
      return;
    }
    const updatedColumns = [...updatedSelectedColumns];
    updatedColumns.splice(draggedIndex, 1);
    updatedColumns.splice(dropIndex, 0, draggedColumn!);
    setUpdatedSelectedColumns(updatedColumns);
  };

  const handleToggleColumn = (column: string) => {
    setShowColumns({
      ...showColumns,
      [column]: !showColumns[column],
    });
  };

  return (
    <div className='analytics-settings-modal'>
      <div className='analytics-settings-modal-header'>
        <span>Settings</span>
        <button className='analytics-settings-modal-close' onClick={toggleSettingsModal}>X</button>
      </div>
      <div className='analytics-settings-modal-content'>
        <div className='analytics-settings-modal-selected-columns'>
          {updatedSelectedColumns.map((column) => (
            <div key={column}>
              <label>
                <input
                  type='checkbox'
                  checked={showColumns[column]}
                  onChange={() => handleToggleColumn(column)}
                />
                {column}
              </label>
            </div>
          ))}
        </div>
        <div className='analytics-settings-modal-preview'>
          <table>
            <thead>
              <tr>
                {updatedSelectedColumns.filter((column) => showColumns[column].map((column) => (
<th key={column}>{column}</th>
))}
</tr>
</thead>
<tbody>
{reportData.map((row, rowIndex) => (
<tr key={rowIndex}>
{updatedSelectedColumns.filter((column) => showColumns[column]).map((column, columnIndex) => (
<td key={columnIndex}>{row[column]}</td>
))}
</tr>
))}
</tbody>
</table>
</div>
<button className='analytics-button analytics-button-apply' onClick={handleApplyChanges}>
Apply
</button>
</div>
);
};

export default SettingsModal;