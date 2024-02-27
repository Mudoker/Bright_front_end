import React from 'react';
import {AuthBackground} from '../..';
import Signupform from './page';
import logo from '@/assets/images/app-logo/logomini-light.svg';
import {Button} from '../../../../components/ui/button';


const SignupPage = () => {
  const divStyle = {
    backgroundImage: `url(${AuthBackground})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  };

  return (
    <div>
      <div className='md:hidden'>
        <div style={divStyle}
          alt="Authentication"
          className="block"
        />
      </div>
      <div className='container relative hidden min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
        <Button href="/login" className = "absolute right-4 top-4 md:right-8 md:top-8"> Login </Button>
        <div className='relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r'>
          <div className='absolute inset-0' style={divStyle} />
          <div className='relative z-20 flex items-center text-lg font-medium'>
            <img src={logo} alt='logo' className='object-contain w-40' />

          </div>
          <div className='relative z-20 mt-auto'>
            <div className='mb-10'>
              <h1 className='text-4xl font-bold' style={{fontFamily: 'nunito'}}>BRIGHT</h1>
              <h1 style={{fontFamily: 'nunito', fontSize: 20}} >Where seamless project management meets intuitive task handling</h1>
            </div>
            <blockquote className="space-y-2">
              <p className="text-xl" style={{fontFamily: 'nunito', fontSize: 20, fontStyle: 'italic'}}>
                                &ldquo;Revolutionizing Project Management:
                                Empowering Efficient Task Handling and Delivering Exceptional Designs with Ease.&rdquo;
              </p>
              <footer className="text-lg" style={{fontFamily: 'nunito', fontSize: 15}}>Elon Doan</footer>
            </blockquote>
          </div>
        </div>
        <div className='lg:p-8'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-center'>
              <h1 className="text-2xl font-semibold tracking-tight">
                                Create your account
              </h1>
              <p className="text-sm text-muted-foreground">
                                Unlock Endless Possibilities: Create Your Account Today!
              </p>
            </div>
            <Signupform />
            <p className="px-8 text-center text-sm text-muted-foreground">
                            By clicking continue, you agree to our{' '}
              <a
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                                Terms of Service
              </a>{' '}
                            and{' '}
              <a
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                                Privacy Policy
              </a>
                            .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;