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
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSendOTPMutation, useVerifyOTPMutation } from '../utils/otpApi';
import { useToast } from '@/components/ui/use-toast';

const FormSchema = z.object({
    pin: z.string().min(6, {
        message: 'Your one-time password must be 6 characters.',
    }),
});

function OTPVerification({ email, onComplete }) {
    const [isOpen, setIsOpen] = useState(true); // State to manage dialog visibility
    const [cooldown, setCooldown] = useState(0); // State to manage cooldown timer
    const { toast } = useToast();
    const [sendOTP] = useSendOTPMutation();
    const [verifyOTP] = useVerifyOTPMutation();
    const hasSentOTP = useRef(false); // Ref to track if OTP has been sent

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: '',
        },
    });

    const startCooldown = () => {
        setCooldown(60); // Set cooldown to 60 seconds
    };

    useEffect(() => {
        const sendOTPRequest = async () => {
            if (hasSentOTP.current) return; // Check if OTP has already been sent
            hasSentOTP.current = true; // Mark OTP as sent

            try {
                const response = await sendOTP({ email });
                if (response.error) {
                    toast({
                        className: 'bg-red-500 text-white',
                        title: 'Failed to send OTP',
                    });
                } else {
                    toast({
                        className: 'bg-green-500 text-white',
                        title: 'OTP sent successfully',
                    });
                    startCooldown(); // Start cooldown after sending OTP
                }
            } catch (error) {
                toast({
                    className: 'bg-red-500 text-white',
                    title: 'Failed to send OTP',
                });
            }
        };

        sendOTPRequest();
    }, [email, sendOTP, toast]);

    useEffect(() => {
        if (cooldown > 0) {
            const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [cooldown]);

    const handleResendOTP = async () => {
        try {
            const response = await sendOTP({ email });
            if (response.error) {
                toast({
                    className: 'bg-red-500 text-white',
                    title: 'Failed to resend OTP',
                });
            } else {
                toast({
                    className: 'bg-green-500 text-white',
                    title: 'OTP resent successfully',
                });
                startCooldown(); // Restart cooldown after resending OTP
            }
        } catch (error) {
            toast({
                className: 'bg-red-500 text-white',
                title: 'Failed to resend OTP',
            });
        }
    };

    const onSubmit = async (data) => {
        try {
            const response = await verifyOTP({ email, userTypedOTP: data.pin });
            if (response.error) {
                toast({
                    className: 'bg-red-500 text-white',
                    title: 'Failed to verify OTP',
                });
            } else {
                toast({
                    className: 'bg-green-500 text-white',
                    title: 'OTP verified successfully',
                });
                setIsOpen(false);
                onComplete(); // Call the onComplete callback
            }
        } catch (error) {
            toast({
                className: 'bg-red-500 text-white',
                title: 'Failed to verify OTP',
            });
        }
    };

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
                    <div className="flex justify-center mt-4">
                        <Button
                            variant="outline"
                            onClick={handleResendOTP}
                            disabled={cooldown > 0}
                        >
                            {cooldown > 0 ? `Resend OTP in ${cooldown}s` : 'Resend OTP'}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

OTPVerification.propTypes = {
    email: PropTypes.string.isRequired,
    onComplete: PropTypes.func.isRequired,
};

export default OTPVerification;