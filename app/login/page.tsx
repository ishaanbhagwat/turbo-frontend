'use client';
import React, {useEffect, useState} from 'react';
import { useAuth } from '@/app/context/authContext';
import { Card, CardContent, CardTitle, CardHeader, CardFooter, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function sleep(ms: number): Promise<void>{
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default function Login() {
    const {signIn, user, loading} = useAuth();
    const router = useRouter();
    const [signInGoogle, setSignInGoogle] = useState(false);
    const [signInGithub, setSignInGithub] = useState(false);

    useEffect(() => {
        if (!loading && user) router.replace("/dashboard");
    }, [user, router, loading]);

    if (user || loading) {
        return null;
    }

    const handleGoogleLogin = async() => {
        setSignInGoogle(true);
        await sleep(3000);
        signIn();
        setSignInGoogle(false);
    }
    const handleGithubLogin = async() => {
        setSignInGithub(true);
        await sleep(3000);
        signIn();
        setSignInGithub(false);
    }

    return(
        <div className='flex items-center justify-center min-h-screen'>
            <Card className='w-full max-w-sm'>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>Sign in with the ID provider of your choice.</CardDescription>
                </CardHeader>
                <CardContent className='flex flex-col gap-1'>
                    <Button
                        variant='outline'
                        className={`w-full ${signInGoogle ? 'opacity-75 cursor-not-allowed' : ''}`}
                        onClick={handleGoogleLogin}
                        disabled={signInGoogle}
                    >
                        {signInGoogle ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-1 border-current mr-2"></div>
                        ): (
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                        )}
                        {signInGoogle ? 'Working the magic...' : 'Login with Google'}
                    </Button>
                    <Button
                    variant='outline'
                    className={`w-full ${signInGithub ? 'opacity-75 cursor-not-allowed' : ''}`}
                    onClick={handleGithubLogin}
                    disabled={signInGithub}>
                        {signInGithub ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-1 border-current mr-2"></div>
                        ): (
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/>
                            </svg>
                        )}
                        {signInGithub ? 'Working the magic...' : 'Login with Github'}
                    </Button>
                    
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <h3 className="text-sm text-gray-600 dark: text-white">Welcome to Turbo.</h3>
                </CardFooter>
            </Card>
        </div>
    );
};