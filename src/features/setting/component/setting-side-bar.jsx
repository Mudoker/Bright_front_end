import { useState } from 'react';

import SETTING_TABS from '../test/data/setting';
import SettingTab from './setting-tab';

function SettingSideBar() {
    const [selectedActive, setSelectedActive] = useState(0);
    const handleSelected = index => {
        setSelectedActive(index);
    };

    return (
        <div className="no-scrollbar mr-[3vw] flex h-dvh w-[16vw] flex-col overflow-auto bg-background">
            <div className="group top-0 w-full border-b-[1px] border-slate-300/30 px-2 pb-[14px] pt-8 text-2xl font-light">
                {'Setting'}
            </div>

            <div className="px-2">
                {SETTING_TABS.map((tab, index) => (
                    <SettingTab
                        key={index}
                        tab={tab}
                        tabIndex={index}
                        selectedActive={selectedActive}
                        handleSelected={() => handleSelected(index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default SettingSideBar;
