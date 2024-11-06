/* eslint-disable max-len */
import { Checkbox } from '@/components/ui/checkbox';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { setTheme } from '@/features/theme/utils/themeSlice';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '../../../components/ui/button';
import {
    PASSWORD_INPUT_VALIDATOR,
    SIGN_IN,
    SIGN_IN_VALIDATOR,
} from '../assets/strings';
import { useLoginMutation } from '../utils/authApi';
import { setLoginStatus } from '../utils/authSlice';

const formShcema = z.object({
  email: z.string({ required_error: SIGN_IN_VALIDATOR.EMAIL }),
  password: z
    .string({ required_error: PASSWORD_INPUT_VALIDATOR.REQUIRED })
    .min(6, { message: PASSWORD_INPUT_VALIDATOR.SHORT })
    .max(50, { message: PASSWORD_INPUT_VALIDATOR.LONG }),
  remember: z.boolean().default(false).optional(),
});

function Loginform() {
  // Import necessary hooks and functions
  const dispatch = useDispatch(); // Hook to dispatch actions to the Redux store
  const [email, setEmail] = useState(''); // State to hold the email input
  const [password, setPassword] = useState(''); // State to hold the password input

    // State to manage the spinner for the login button
    const [spinning, setSpinning] = useState(false);

    // Hook to trigger the login mutation
    const [login] = useLoginMutation();
    // Hook to navigate programmatically
    const navigate = useNavigate();

    // Function to handle the login process
    const handleLogin = async e => {
        e.preventDefault(); // Prevent the default form submission

        try {
            setSpinning(true); // Show the spinner when login starts

      // Prepare the request body with email and password
      const body = {
        email: email,
        password: password,
      };

            // Perform the login mutation
            const data = await login(body);

      // Dispatch action to update login state in the Redux store
      dispatch(setLoginStatus(data, email));

            // Log success and navigate to the user dashboard
            console.log('login success', data);
            navigate('/welcome');

            // Stop the spinner after a delay
            setTimeout(() => {
                setSpinning(false);
            }, 2000);
        } catch (error) {
            // Log the error and stop the spinner
            console.error('failed', error);
            setSpinning(false);
        }
    };

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const codeParam = urlSearchParams.get('code');
        if (codeParam) {
            const onGitHubCallback = async () => {
                const code = codeParam;
                try {
                    const response = await axios.post(
                        'http://3.27.142.116:4000/bright-backend/api/auth/git',
                        { code }
                    );
                    console.log(response);
                    return response.data;
                } catch (error) {
                    console.error('failed', error);
                }
            };
            onGitHubCallback(codeParam);
        }
    }, []);

    const form = useForm({
        resolver: zodResolver(formShcema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = () => {
        console.log('Sign in complete');
    };

    const onError = error => {
        console.log(error);
    };

    return (
        <div className="flex flex-col gap-3 space-y-2 text-center">
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    {SIGN_IN.TITLE}
                </h1>

        <p className="text-sm text-muted-foreground">{SIGN_IN.DES}</p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="flex flex-col gap-3"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    value={email}
                    placeholder={'Account Email'}
                    autoComplete="email"
                    onChangeCapture={e => setEmail(e.currentTarget.value)}
                    className="border border-black/20 focus:border-transparent"
                    {...field}
                  />
                </FormControl>
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
                    value={password}
                    autoComplete="current-password"
                    placeholder={'Password'}
                    onChangeCapture={e => setPassword(e.currentTarget.value)}
                    className="border border-black/30 focus:border-transparent"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="inline-flex h-8 w-full items-center rounded border border-gray-400 bg-white px-5 py-2.5 text-center text-sm font-medium text-black hover:bg-gray-200"
            onClick={handleLogin}
            disabled={spinning}
          >
            {spinning ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span className="please-wait-text">Please wait...</span>
              </>
            ) : (
              'Sign in'
            )}
          </Button>
        </form>

                <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                        <FormField
                            control={form.control}
                            name="remember"
                            render={({ field }) => (
                                <FormItem className="flex items-center space-x-2">
                                    <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Remember me
                                    </FormLabel>

                                    <FormItem>
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                </FormItem>
                            )}
                        />
                    </div>

                    <button
                        type="button"
                        className="text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline"
                    >
                        {'Forgot password?'}
                    </button>
                </div>
            </Form>
        </div>
    );
}

export default Loginform;
