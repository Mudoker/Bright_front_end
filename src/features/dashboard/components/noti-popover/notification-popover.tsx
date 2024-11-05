import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import React from "react"
import { NotificationItem, NotificationItemProps } from "./notification-item";
import { useSelector } from "react-redux";
import { DataFactory } from "../../utils/data-factory";

interface NotificationPopoverProps {
    children: React.ReactNode
}

export const NotificationPopover: React.FC<NotificationPopoverProps> = ({ children }) => {
    const dataViewMode = useSelector((state: any) => state.dataViewMode.current);
    const [notifications, setNotifications] = React.useState<NotificationItemProps[]>([]);

    React.useEffect(() => {
        setNotifications(DataFactory.getNotificationData(dataViewMode));
    }, [dataViewMode]);

    return (
        <Popover>
            <PopoverTrigger>{children}</PopoverTrigger>
            <PopoverContent className="w-80 p-0 flex flex-col gap-2">
                {notifications.map((notification, index) => (
                    <NotificationItem
                        key={index}
                        icon={notification.icon}
                        title={notification.title}
                        description={notification.description}
                        sentAt={notification.sentAt}
                    />
                ))}
            </PopoverContent>

        </Popover>
    );
};
