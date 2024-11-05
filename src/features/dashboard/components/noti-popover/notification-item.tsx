import React from 'react';
import { Button } from '@components/ui/button';

export interface NotificationItemProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    sentAt: string;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({ icon, title, description, sentAt }) => {
    return (
        <Button className="flex items-center w-full p-4 py-8 m-0 text-left rounded-none" variant="ghost">
            <div className='w-full flex gap-2'>
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-foreground">
                    {icon}
                </div>
                <div className='w-full truncate'>
                    <div className="flex items-center justify-between gap-4">
                        <p className="text-sm font-semibold truncate">{title}</p>
                        <p className="text-xs text-neutral-300">{sentAt}</p>
                    </div>
                    <p className="text-xs truncate text-neutral-400">{description}</p>
                </div>
            </div>
        </Button>
    );
};
