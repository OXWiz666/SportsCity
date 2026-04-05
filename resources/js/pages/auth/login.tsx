import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Mail, KeySquare, Zap, CheckCircle2 } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

interface LoginForm {
    email: string;
    password: string;
    remember: boolean;
}

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="System Authorization" description="Enter credentials to access the system">
            <Head title="Log in" />

            {status && (
                <div className="mb-6 flex items-center gap-3 border border-lime-400/40 bg-lime-400/10 p-4 text-xs font-black uppercase tracking-widest text-lime-400 backdrop-blur-sm animate-fade-in-up">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    {status}
                </div>
            )}

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-lime-400">Email</Label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-lime-400 text-zinc-500 transition-colors z-10">
                                <Mail className="w-5 h-5" />
                            </div>
                            <Input
                                id="email"
                                type="email"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="pl-12 tracking-widest uppercase font-bold"
                                placeholder="youremail@gensantos.gov.ph"
                            />
                        </div>
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            {canResetPassword && (
                                <TextLink href={route('password.request')} className="ml-auto text-[10px] tracking-widest text-zinc-500 hover:text-lime-400 transition-colors" tabIndex={5}>
                                    FORGOT PASSWORD?
                                </TextLink>
                            )}
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-lime-400 text-zinc-500 transition-colors z-10">
                                <KeySquare className="w-5 h-5" />
                            </div>
                            <Input
                                id="password"
                                type="password"
                                required
                                tabIndex={2}
                                autoComplete="current-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="pl-12 font-mono tracking-[0.5em] text-lg text-lime-400"
                                placeholder="••••••••"
                            />
                        </div>
                        <InputError message={errors.password} />
                    </div>

                    <Label htmlFor="remember" className="flex items-center space-x-3 bg-zinc-900/50 border border-zinc-800 p-3 hover:border-lime-400/50 transition-all group cursor-pointer hover:bg-zinc-900/80">
                        <Checkbox
                            id="remember"
                            name="remember"
                            tabIndex={3}
                            checked={data.remember}
                            onCheckedChange={(checked) => setData('remember', checked as boolean)}
                            className="group-hover:border-lime-400 transition-colors"
                        />
                        <span className="cursor-pointer group-hover:text-lime-400 transition-colors tracking-widest uppercase font-black text-[10px] text-zinc-500">
                            Remember Me
                        </span>
                    </Label>

                    <Button type="submit" className="mt-4 w-full flex items-center justify-center gap-3 transition-all duration-300 group" tabIndex={4} disabled={processing}>
                        {processing ? <LoaderCircle className="h-5 w-5 animate-spin mx-auto text-black" /> : (
                            <>
                                <Zap className="w-5 h-5 fill-black group-hover:animate-pulse -ml-2" />
                                Login Now!
                            </>
                        )}
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-[10px] mt-2 tracking-widest font-black uppercase">
                    Access Denied?{' '}
                    <TextLink href={route('register')} tabIndex={5} className="text-lime-400 ml-1 hover:text-white">
                        Register Here!
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
