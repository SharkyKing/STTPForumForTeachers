import React, { useEffect, useState } from 'react';
import './Dropdown.css'; 

const Dropdown = ({ options, setSelectedValue, defaultLabel='Select an option', labelKey = 'label', selectLabel='', selectedOptionExternal, selectedValueExternal}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const extendedOptions = Array.isArray(options) 
        ? [{ id: 0, [labelKey]: 'All' }, ...options] 
        : [];

     useEffect(() => {
        if (selectedOptionExternal) {
            setSelectedOption(selectedOptionExternal);
            setSelectedValue(selectedOptionExternal.id);
        } else if (selectedValueExternal) {
            const matchedOption = extendedOptions.find(option => option[labelKey] === selectedValueExternal);
            if (matchedOption) {
                setSelectedOption(matchedOption);
                setSelectedValue(matchedOption.id); 
            }
        }
    }, [selectedOptionExternal, selectedValueExternal, options, setSelectedValue, labelKey]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setSelectedValue(option.id); 
        setIsOpen(false);
    };

    return (
        <div className="dropdown">
            <div className="dropdown-header" onClick={toggleDropdown}>
                {selectedOption ? `${selectLabel}: ${selectedOption[labelKey]}` : defaultLabel}
            </div>
            {isOpen && (
                <div className="dropdown-list">
                    {extendedOptions.map((option) => (
                        <div
                            key={option.id}
                            className="dropdown-item"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option[labelKey]}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
