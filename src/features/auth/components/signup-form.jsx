import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { SYSTEM_ALERT, SYSTEM_COLORS } from '@/config/constants/strings.global';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import PropTypes from 'prop-types';

import {
    PASSWORD_INPUT_VALIDATOR,
    SIGN_UP,
    SIGN_UP_VALIDATOR,
} from '../assets/strings';
import { useSignupMutation } from '../utils/authApi';
import { BirthdayPicker } from './birthday-picker';
import OTPVerification from './otp-verification'; // Import the OTPVerification component

const formSchema = z
  .object({
    firstname: z.string({ required_error: SIGN_UP_VALIDATOR.NAME_REQUIRED }),
    lastname: z.string({ required_error: SIGN_UP_VALIDATOR.NAME_REQUIRED }),
    email: z.string({ required_error: SIGN_UP_VALIDATOR.EMAIL }),
    password: z
      .string({ required_error: PASSWORD_INPUT_VALIDATOR.REQUIRED })
      .min(6, { message: PASSWORD_INPUT_VALIDATOR.SHORT })
      .max(50, { message: PASSWORD_INPUT_VALIDATOR.LONG }),
    confirm_password: z.string({
      required_error: PASSWORD_INPUT_VALIDATOR.RE_CONFIRM,
    }),
    dob: z.date().optional(),
  })
  .refine(data => data.password === data.confirm_password, {
    message: 'New password and confirm password must match',
    path: ['confirm_password'],
  });

function Signupform({ onSignUpComplete }) {
  const [loading, setLoading] = useState(false);
  const [showOTPVerification, setShowOTPVerification] = useState(false); // State to manage OTP verification dialog visibility
  const [email, setEmail] = useState(''); // State to store the email
  const { toast } = useToast();
  const [signup] = useSignupMutation();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirm_password: '',
      dob: null,
    },
  });

  const handleSignUp = async data => {
    setLoading(true);

    try {
      const body = {
        email: data.email,
        password: data.password,
        fullname: `${data.firstname} ${data.lastname}`,
        dob: new Date(data.dob).toISOString().slice(0, 10),
      };

      const response = await signup(body);
      console.log(response);
      
      if (response.error) {
        const error_code = response.error.status;
        if (error_code === 400) {
          toast({
            className: SYSTEM_COLORS.SIGN_UP_FAILED_COLOR,
            title: SYSTEM_ALERT.SIGNUP_INVALID_CREDENTIALS,
          });
        } else if (error_code === 500) {
          toast({
            className: SYSTEM_COLORS.SIGN_UP_FAILED_COLOR,
            title: SYSTEM_ALERT.SIGNUP_SERVER_ERROR,
          });
        }

        return;
      }

      toast({
        className: SYSTEM_COLORS.SIGN_UP_COMPLETE_COLOR,
        title: SYSTEM_ALERT.SIGNUP_SUCCESS_TITLE,
      });

      setEmail(data.email); // Set the email state
      setShowOTPVerification(true); // Show OTP verification dialog
    } catch (error) {
      toast({
        className: SYSTEM_COLORS.SIGN_UP_FAILED_COLOR,
        title: SYSTEM_ALERT.SIGNUP_FAILED_TITLE,
      });
    } finally {
      setLoading(false);
    }
  };

  const onError = errors => {
    console.log(errors);
  };

  const handleOTPVerificationComplete = () => {
    setShowOTPVerification(false);
    onSignUpComplete();
  };

  return (
    <div className="flex flex-col space-y-2 text-center">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {SIGN_UP.TITLE}
        </h1>
        <p className="text-sm text-muted-foreground">{SIGN_UP.DES}</p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSignUp, onError)}
          className="space-y-2"
        >
          <div className="flex-cols-2 flex gap-2">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={'First Name'}
                      className="border border-auth_form_border focus:border-transparent"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.firstname?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={'Last Name'}
                      className="border border-auth_form_border focus:border-transparent"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.lastname?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>

          <BirthdayPicker
            date={form.watch('dob')}
            setDate={date => form.setValue('dob', date)}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={'Account Email'}
                    autoComplete={'email'}
                    className="border border-auth_form_border focus:border-transparent"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.email?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={'Password'}
                    autoComplete={'new-password'}
                    className="border border-auth_form_border focus:border-transparent"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.password?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={'Confirm your Password'}
                    className="border border-auth_form_border focus:border-transparent"
                    autoComplete={'confirm-password'}
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.confirm_password?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="outline"
            className="inline-flex h-9 w-full items-center rounded border border-gray-400 bg-white px-5 py-2.5 text-center text-sm font-medium text-black hover:bg-gray-300"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-3 h-4 w-4 animate-spin" />}
            {loading ? 'Signing up...' : 'Sign Up'}
          </Button>
        </form>
      </Form>
      {showOTPVerification && (
        <OTPVerification email={email} onComplete={handleOTPVerificationComplete} />
      )}
    </div>
  );
}

Signupform.propTypes = {
  onSignUpComplete: PropTypes.func.isRequired,
};

export default Signupform;