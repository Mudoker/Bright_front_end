import React, { FC, ReactNode } from "react";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@components/ui/alert-dialog";

interface PrivateAlertDialogProps {
    title: string;
    description: string;
    onAction: () => void;
    actionLabel?: string;
    cancelLabel?: string;
    trigger?: ReactNode; // Optional custom trigger
}

const CustomAlertDialog: FC<PrivateAlertDialogProps> = ({
    title,
    description,
    onAction,
    actionLabel = "Continue",
    cancelLabel = "Cancel",
    trigger,
}) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {trigger || (
                    <button className="h-8 text-rose-400 border border-gray-300 rounded">
                        Default Trigger
                    </button>
                )}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-bold">
                        {title}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
                    <AlertDialogAction onClick={onAction}>
                        {actionLabel}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default CustomAlertDialog;

