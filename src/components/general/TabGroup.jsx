import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { BoardTabContextMenu } from '../../features/project/components/ContextMenu';

const TabGroup = ({ tableNames }) => {
    const [selectedButton, setSelectedButton] = useState(0);

    const handleButtonClick = buttonIndex => {
        setSelectedButton(buttonIndex);
    };

    return (
        <div className="mt-2 flex gap-10">
            {tableNames.map((tableName, index) => (
                <button
                    key={index}
                    className={`overflow-hidden text-ellipsis whitespace-nowrap text-left font-semibold transition-all duration-75 ${selectedButton === index ? 'border-blue-700 text-blue-700' : ''}`}
                    style={{
                        maxWidth: '20rem',
                        boxSizing: 'content-box',
                        boxShadow:
                            selectedButton === index ? '0 1px 0 blue' : 'none',
                    }}
                    onClick={() => handleButtonClick(index)}
                >
                    {tableName}
                </button>
            ))}
        </div>
    );
};

TabGroup.propTypes = {
    tableNames: PropTypes.arrayOf(PropTypes.string),
};

export default TabGroup;
