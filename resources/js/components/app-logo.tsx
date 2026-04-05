import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-lime-400/10 border border-lime-400/30 text-lime-400 dark:bg-lime-400/10 dark:border-lime-400/30 dark:text-lime-400">
                <AppLogoIcon className="size-5" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="truncate leading-none font-black tracking-tight text-neutral-900 dark:text-white">
                    Sports<span className="text-lime-500 dark:text-lime-400">City</span>
                </span>
                <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-neutral-400 dark:text-zinc-500 mt-0.5">GenSan Portal</span>
            </div>
        </>
    );
}
