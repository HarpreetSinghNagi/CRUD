import React, { useState } from 'react';
import { ReportData } from './api';
import { getHeading } from './ReportTable';

interface SettingsModalProps {
  selectedColumns: string[];
  setSelectedColumns: React.Dispatch<React.SetStateAction<string[]>>;
  reportData: ReportData[];
  toggleSettingsModal: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ selectedColumns, setSelectedColumns, reportData, toggleSettingsModal }) => {
  const [showColumns, setShowColumns] = useState<{ [key: string]: boolean }>(() => {
    const initialShowColumns: { [key: string]: boolean } = {};
    selectedColumns.forEach((column) => {
      initialShowColumns[column] = true;
    });
    return initialShowColumns;
  });
  const [updatedSelectedColumns, setUpdatedSelectedColumns] = useState(selectedColumns);
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);

  const handleApplyChanges = () => {
    const filteredSelectedColumns = updatedSelectedColumns.filter((column) => showColumns[column]);
    setSelectedColumns(filteredSelectedColumns);
    setUpdatedSelectedColumns(filteredSelectedColumns);
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

  const handleToggleColumn = (column: string, checked: boolean) => {
    setShowColumns({
      ...showColumns,
      [column]: checked,
    });
  
    if (checked && !updatedSelectedColumns.includes(column)) {
      setUpdatedSelectedColumns([...updatedSelectedColumns, column]);
    } else if (!checked) {
      setUpdatedSelectedColumns(updatedSelectedColumns.filter((col) => col !== column));
    }
  };

  return (
    <div className='analytics-settings-modal'>
      <div className='analytics-settings-modal-header'>
        <span>Settings</span>
        <button className='analytics-settings-modal-close' onClick={toggleSettingsModal}>
          X
        </button>
      </div>
      <div className='analytics-settings-modal-content'>
        <div className='analytics-settings-modal-selected-columns'>
          {updatedSelectedColumns.map((column) => (
            <div
              key={column}
              className='analytics-settings-modal-selected-column'
              draggable
              onDragStart={(e) => handleDragStart(e, column)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column)}
            >
              <label>
                <input
              type='checkbox'
              checked={showColumns[column]}
              onChange={(e) => handleToggleColumn(column, e.target.checked)}
              disabled={ column === "app_name" || column === "date"}
            />
            {getHeading(column)}
          </label>
        </div>
      ))}
    </div>
    <div className='analytics-settings-modal-available-columns'>
      {Object.keys(reportData[0]).map((column) => {
        if (column === 'app_id' || updatedSelectedColumns.includes(column)) {
          return null;
        }
        return (
          <div key={column} className='analytics-settings-modal-available-column'>
            <label>
              <input
                type='checkbox'
                checked={showColumns[column] ?? false}
                onChange={(e) => handleToggleColumn(column, e.target.checked)}
              />
              {getHeading(column)}
            </label>
          </div>
        );
      })}
    </div>
    <button className='analytics-settings-modal-save-button' onClick={handleApplyChanges}>
      Save Changes
    </button>
  </div>

</div>
);
};

export default SettingsModal;