import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import PropTypes from 'prop-types';

export function FailureAlert({ open, setOpen, title, des }) {
    return (
        <AlertDialog open={open}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className={'text-xl font-bold'}>
                        {title}
                    </AlertDialogTitle>
                    <AlertDialogDescription>{des}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={() => setOpen(false)}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

FailureAlert.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    title: PropTypes.string,
    des: PropTypes.string,
};
