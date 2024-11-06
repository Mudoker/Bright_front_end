import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

function SettingTab({ tab, tabIndex, selectedActive, handleSelected }) {
    const isSelected = selectedActive === tabIndex;
    const iconStyle = `w-4 h-4 ${isSelected ? '' : 'group-hover:text-foreground'}`;
    return (
        <NavLink
            to={`/user/settings/${tab.name.toLowerCase().replace(/\s/g, '-')}`}
        >
            <div
                id={tab.name}
                className={`group my-3 flex cursor-pointer flex-col rounded-md p-3 pl-3 ${selectedActive === tabIndex ? 'bg-black' : 'hover:bg-slate-200/50'}`}
                onClick={handleSelected}
            >
                <div
                    className={`flex flex-row items-center gap-2 ${selectedActive === tabIndex ? 'text-white' : ''}`}
                >
                    {tab.icon &&
                        React.cloneElement(tab.icon, { className: iconStyle })}
                    <h1 className="text-sm font-semibold">{tab.name}</h1>
                </div>

                <div className="ml-8">
                    <p>{tab.paragraph}</p>
                </div>
            </div>
        </NavLink>
    );
}

SettingTab.propTypes = {
    tab: PropTypes.object,
    tabIndex: PropTypes.number,
    selectedActive: PropTypes.number,
    handleSelected: PropTypes.func,
};

export default SettingTab;
