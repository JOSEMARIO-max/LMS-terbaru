
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/assignments" | "/courses" | "/courses/[id]" | "/dashboard" | "/login" | "/profile" | "/schedule";
		RouteParams(): {
			"/courses/[id]": { id: string }
		};
		LayoutParams(): {
			"/": { id?: string };
			"/assignments": Record<string, never>;
			"/courses": { id?: string };
			"/courses/[id]": { id: string };
			"/dashboard": Record<string, never>;
			"/login": Record<string, never>;
			"/profile": Record<string, never>;
			"/schedule": Record<string, never>
		};
		Pathname(): "/" | "/assignments" | "/assignments/" | "/courses" | "/courses/" | `/courses/${string}` & {} | `/courses/${string}/` & {} | "/dashboard" | "/dashboard/" | "/login" | "/login/" | "/profile" | "/profile/" | "/schedule" | "/schedule/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/foto it.jpg" | "/robots.txt" | string & {};
	}
}