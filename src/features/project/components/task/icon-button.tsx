import React, { FC } from 'react';
import { Button } from '@components/ui/button';

interface IconButtonProps {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Icon component
    label?: string | number; // Optional label next to the icon
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Click handler
    className?: string; // Additional CSS classes
}

const IconButton: FC<IconButtonProps> = ({ icon: Icon, label, onClick, className }) => {
    return (
        <Button
            onClick={onClick}
            variant="ghost"
            className={`flex items-center gap-1 px-1.5 hover:rounded-md dark:text-neutral-300/80 text-xs ${className}`}
        >
            <Icon className="h-3.5 w-3.5" />
            {label !== undefined && <span>{label}</span>}
        </Button>
    );
};

export default IconButton;
