import React, { useState } from 'react';
import './EditableTable.css'; 
import EndPoint from '../../Endpoint';

const EditableTable = ({ data, columns, onDelete, onEdit, onAdd }) => {
    const [editableRowIndex, setEditableRowIndex] = useState(null);
    const [editedRowData, setEditedRowData] = useState({});
    const [newRowData, setNewRowData] = useState({});

    const handleEditClick = (index, row) => {
        setEditableRowIndex(index);
        setEditedRowData(row);
    };

    const handleInputChange = (e, columnKey) => {
        const { value } = e.target;
        setEditedRowData((prev) => ({
            ...prev,
            [columnKey]: value,
        }));
    };

     const handleNewRowInputChange = (e, columnKey) => {
        const { value } = e.target;
        setNewRowData((prev) => ({
            ...prev,
            [columnKey]: value,
        }));
    };

    const handleSaveClick = (index) => {
        onEdit(index, editedRowData);
        setEditableRowIndex(null); 
    };

    const handleCancelClick = () => {
        setEditableRowIndex(null); 
    };

    const handleNewRowSave = () => {
        onAdd(newRowData); 
        setNewRowData({}); 
    };

    return (
        <table className="editable-table">
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column.key}>{column.title}</th>
                    ))}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {onAdd && (
                    <tr>
                        {columns.map((column) => (
                            <td key={column.key}>
                                {column.editable ? (
                                    column.dropdown ? (
                                        <EndPoint.components.Dropdown 
                                            options={column.dropdown.source} 
                                            setSelectedValue={column.dropdown.setSelectedValue} 
                                            defaultLabel={column.dropdown.defaultLabel} 
                                            labelKey={column.dropdown.labelKey} 
                                            selectLabel={column.dropdown.selectLabel} 
                                        />
                                    ) : (
                                        <EndPoint.components.Input
                                            type="text"
                                            value={newRowData[column.key] || ''} 
                                            onChange={(e) => handleNewRowInputChange(e, column.key)}
                                        />
                                    )
                                ) : (
                                    ''
                                )}
                            </td>
                        ))}
                        <td>
                            <EndPoint.components.Button onClick={handleNewRowSave}>Add</EndPoint.components.Button>
                        </td>
                    </tr>
                )}
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((column) => (
                            <td key={column.key}>
                                {editableRowIndex === rowIndex && column.editable ? (
                                    column.dropdown ? (
                                        <EndPoint.components.Dropdown
                                            options={column.dropdown.source}
                                            setSelectedValue={(value) => {
                                                setEditedRowData(prev => ({
                                                    ...prev,
                                                    [column.key]: value,
                                                }));
                                            }}
                                            defaultLabel={column.dropdown.defaultLabel}
                                            labelKey={column.dropdown.labelKey}
                                            selectLabel={column.dropdown.selectLabel}
                                            selectedValueExternal={editedRowData[column.key]}
                                        />
                                    ) : (
                                        <EndPoint.components.Input
                                            type="text"
                                            value={editedRowData[column.key] || ''}
                                            onChange={(e) => handleInputChange(e, column.key)}
                                        />
                                    )
                                ) : (
                                    row[column.key]
                                )}
                            </td>
                        ))}
                        <td>
                            {editableRowIndex === rowIndex ? (
                                <div>
                                    <EndPoint.components.Button className="save" onClick={() => handleSaveClick(rowIndex)}>Save</EndPoint.components.Button>
                                    <EndPoint.components.Button onClick={() => handleCancelClick()}>Cancel</EndPoint.components.Button>
                                </div>
                            ) : (
                                <>
                                    {onEdit && <EndPoint.components.Button onClick={() => handleEditClick(rowIndex, row)}>Edit</EndPoint.components.Button>}
                                    {onDelete && <EndPoint.components.Button className="delete" onClick={() => onDelete(rowIndex)}>Delete</EndPoint.components.Button>}
                                </>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default EditableTable;
