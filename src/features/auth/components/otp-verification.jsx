import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import PropTypes from 'prop-types';

const FormSchema = z.object({
    pin: z.string().min(6, {
        message: 'Your one-time password must be 6 characters.',
    }),
});

function OTPVerification({ onComplete }) {
    const [isOpen, setIsOpen] = useState(true); // State to manage dialog visibility

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: '',
        },
    });

    function onSubmit(data) {
        console.log(data);
        setIsOpen(false); // Close the dialog on successful submission
        onComplete(); // Call the onComplete callback
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>OTP Verification</DialogTitle>
                    <DialogDescription>
                        Please enter your verification code to continue.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col items-center justify-center gap-6">
                            <FormField
                                control={form.control}
                                name="pin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <InputOTP maxLength={6} {...field}>
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0} />
                                                    <InputOTPSlot index={1} />
                                                    <InputOTPSlot index={2} />
                                                </InputOTPGroup>
                                                <InputOTPSeparator />
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={3} />
                                                    <InputOTPSlot index={4} />
                                                    <InputOTPSlot index={5} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter className='w-full '>
                                <div className='flex justify-center items-center w-full'>
                                    <Button type="submit" className='w-[75%]'>Verify</Button>
                                </div>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
OTPVerification.propTypes = {
    onComplete: PropTypes.func.isRequired,
};

export default OTPVerification;