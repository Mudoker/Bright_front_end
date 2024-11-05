import { Button } from '@/components/ui/button';
import { FileSpreadsheet, GanttChartSquare, KanbanSquare } from 'lucide-react';
import PropTypes from 'prop-types';

const TableNames = [
    { name: 'Kanban', icon: KanbanSquare, isDisabled: false },
    { name: 'Board', icon: GanttChartSquare, isDisabled: false },
    { name: 'Sheet', icon: FileSpreadsheet, isDisabled: true },
];

const TabGroup = ({ tableNames = TableNames, selected, setSelected }) => {
    const handleButtonClick = buttonIndex => {
        setSelected(buttonIndex);
    };

    return (
        <div className="flex gap-4 text-sm">
            {tableNames.map((table, index) => (
                <Button
                    key={index}
                    className={`text-md flex items-center gap-2 px-2 py-3 font-semibold ${selected === index ? 'bg-tab_group' : ''}`}
                    disabled={table.isDisabled}
                    variant="ghost"
                    onClick={() => handleButtonClick(index)}
                >
                    {table.icon && <table.icon className="h-5 w-5" />}

                    <div>{table.name}</div>
                </Button>
            ))}
        </div>
    );
};

TabGroup.propTypes = {
    tableNames: PropTypes.arrayOf(PropTypes.object),
    setIsUnderDevDialogOpen: PropTypes.func,
    selected: PropTypes.number,
    setSelected: PropTypes.func,
};

export default TabGroup;
