import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, User, Mail, KeySquare, ShieldCheck, Zap, Calendar, Hash, UserCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

interface RegisterForm {
    first_name: string;
    middle_name: string;
    last_name: string;
    birthdate: string;
    gender: string;
    email: string;
    password: string;
    password_confirmation: string;
}

function calculateAge(birthdate: string): number | null {
    if (!birthdate) return null;
    const birthDateObj = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const m = today.getMonth() - birthDateObj.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
    }
    return age >= 0 ? Math.min(Math.max(age, 0), 120) : null;
}

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
        first_name: '',
        middle_name: '',
        last_name: '',
        birthdate: '',
        gender: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const currentAge = calculateAge(data.birthdate);

    return (
        <AuthLayout title="Register Now!" description="Enter your designated coordinates to create a profile">
            <Head title="Register" />
            <form className="flex flex-col gap-6 w-full max-w-2xl mx-auto" onSubmit={submit}>
                <div className="grid gap-6">

                    {/* Section label */}
                    <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-zinc-800" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Personal Intel</span>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-zinc-800" />
                    </div>

                    {/* Names Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="first_name">First Name</Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-lime-400 text-zinc-500 transition-colors z-10">
                                    <User className="w-5 h-5" />
                                </div>
                                <Input
                                    id="first_name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="given-name"
                                    value={data.first_name}
                                    onChange={(e) => setData('first_name', e.target.value)}
                                    disabled={processing}
                                    className="pl-12 tracking-widest uppercase font-bold"
                                    placeholder="FIRST"
                                />
                            </div>
                            <InputError message={errors.first_name} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="middle_name">Middle Name</Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-lime-400 text-zinc-500 transition-colors z-10">
                                    <UserCircle className="w-5 h-5" />
                                </div>
                                <Input
                                    id="middle_name"
                                    type="text"
                                    tabIndex={2}
                                    autoComplete="additional-name"
                                    value={data.middle_name}
                                    onChange={(e) => setData('middle_name', e.target.value)}
                                    disabled={processing}
                                    className="pl-12 tracking-widest uppercase font-bold"
                                    placeholder="MIDDLE"
                                />
                            </div>
                            <InputError message={errors.middle_name} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="last_name">Last Name</Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-lime-400 text-zinc-500 transition-colors z-10">
                                    <User className="w-5 h-5" />
                                </div>
                                <Input
                                    id="last_name"
                                    type="text"
                                    required
                                    tabIndex={3}
                                    autoComplete="family-name"
                                    value={data.last_name}
                                    onChange={(e) => setData('last_name', e.target.value)}
                                    disabled={processing}
                                    className="pl-12 tracking-widest uppercase font-bold"
                                    placeholder="LAST"
                                />
                            </div>
                            <InputError message={errors.last_name} />
                        </div>
                    </div>

                    {/* Section label */}
                    <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-zinc-800" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Demographics</span>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-zinc-800" />
                    </div>

                    {/* Demographics Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="birthdate">Date of Birth</Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none group-focus-within:text-lime-400 text-zinc-500 transition-colors z-10 w-10">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <Input
                                    id="birthdate"
                                    type="date"
                                    required
                                    tabIndex={4}
                                    value={data.birthdate}
                                    onChange={(e) => setData('birthdate', e.target.value)}
                                    disabled={processing}
                                    className="pl-12 font-bold uppercase tracking-widest text-lime-400 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                                />
                            </div>
                            <InputError message={errors.birthdate} />
                        </div>

                        <div className="grid gap-2">
                            <Label>Age</Label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-lime-400/50 z-10">
                                    <Hash className="w-5 h-5" />
                                </div>
                                <div className="flex h-14 w-full border-2 border-zinc-800 bg-black/50 px-4 pl-12 py-2 font-bold items-center tracking-widest text-zinc-500 backdrop-blur-sm">
                                    {currentAge !== null ? (
                                        <span className="text-lime-400 drop-shadow-[0_0_8px_rgba(163,230,53,0.3)]">{currentAge}</span>
                                    ) : '--'}
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="gender">Biological Gender</Label>
                            <div className="flex bg-black border-2 border-zinc-800 h-14">
                                <label className={`flex-1 flex items-center justify-center cursor-pointer transition-all text-xs font-black uppercase tracking-widest ${data.gender === 'male' ? 'bg-lime-400 text-black shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]' : 'text-zinc-500 hover:text-white hover:bg-zinc-900/50'}`}>
                                    <input type="radio" name="gender" value="male" className="hidden" tabIndex={5} checked={data.gender === 'male'} onChange={(e) => setData('gender', e.target.value)} />
                                    Male
                                </label>
                                <div className="w-0.5 h-full bg-zinc-800" />
                                <label className={`flex-1 flex items-center justify-center cursor-pointer transition-all text-xs font-black uppercase tracking-widest ${data.gender === 'female' ? 'bg-lime-400 text-black shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]' : 'text-zinc-500 hover:text-white hover:bg-zinc-900/50'}`}>
                                    <input type="radio" name="gender" value="female" className="hidden" tabIndex={6} checked={data.gender === 'female'} onChange={(e) => setData('gender', e.target.value)} />
                                    Female
                                </label>
                            </div>
                            <InputError message={errors.gender} />
                        </div>
                    </div>

                    {/* Section label */}
                    <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-zinc-800" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Credentials</span>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-zinc-800" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-lime-400 text-zinc-500 transition-colors z-10">
                                <Mail className="w-5 h-5" />
                            </div>
                            <Input
                                id="email"
                                type="email"
                                required
                                tabIndex={7}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={processing}
                                className="pl-12 tracking-widest uppercase font-bold"
                                placeholder="YOUREMAIL@GENSANTOS.GOV.PH"
                            />
                        </div>
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-lime-400 text-zinc-500 transition-colors z-10">
                                    <KeySquare className="w-5 h-5" />
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={8}
                                    autoComplete="new-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    disabled={processing}
                                    className="pl-12 font-mono tracking-[0.5em] text-lg text-lime-400"
                                    placeholder="••••••••"
                                />
                            </div>
                            <InputError message={errors.password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">Confirm Password</Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-lime-400 text-zinc-500 transition-colors z-10">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={9}
                                    autoComplete="new-password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    disabled={processing}
                                    className="pl-12 font-mono tracking-[0.5em] text-lg text-lime-400"
                                    placeholder="••••••••"
                                />
                            </div>
                            <InputError message={errors.password_confirmation} />
                        </div>
                    </div>

                    <Button type="submit" className="mt-4 w-full flex items-center justify-center gap-3 transition-all duration-300 group" tabIndex={10} disabled={processing}>
                        {processing ? <LoaderCircle className="h-5 w-5 animate-spin mx-auto text-black" /> : (
                            <>
                                <Zap className="w-5 h-5 fill-black group-hover:animate-pulse -ml-2" />
                                REGISTER NOW
                            </>
                        )}
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-[10px] mt-2 tracking-widest font-black uppercase">
                    Already have an account?{' '}
                    <TextLink href={route('login')} tabIndex={11} className="text-lime-400 ml-1 hover:text-white">
                        Login Now
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
