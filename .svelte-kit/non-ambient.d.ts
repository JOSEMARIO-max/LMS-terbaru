
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
		RouteId(): "/" | "/assignments" | "/assignments/[id]" | "/class" | "/class/[id]" | "/courses" | "/courses/[id]" | "/dashboard" | "/lesson" | "/login" | "/profile" | "/schedule";
		RouteParams(): {
			"/assignments/[id]": { id: string };
			"/class/[id]": { id: string };
			"/courses/[id]": { id: string }
		};
		LayoutParams(): {
			"/": { id?: string };
			"/assignments": { id?: string };
			"/assignments/[id]": { id: string };
			"/class": { id?: string };
			"/class/[id]": { id: string };
			"/courses": { id?: string };
			"/courses/[id]": { id: string };
			"/dashboard": Record<string, never>;
			"/lesson": Record<string, never>;
			"/login": Record<string, never>;
			"/profile": Record<string, never>;
			"/schedule": Record<string, never>
		};
		Pathname(): "/" | "/assignments" | "/assignments/" | `/assignments/${string}` & {} | `/assignments/${string}/` & {} | "/class" | "/class/" | `/class/${string}` & {} | `/class/${string}/` & {} | "/courses" | "/courses/" | `/courses/${string}` & {} | `/courses/${string}/` & {} | "/dashboard" | "/dashboard/" | "/lesson" | "/lesson/" | "/login" | "/login/" | "/profile" | "/profile/" | "/schedule" | "/schedule/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/foto it.jpg" | "/robots.txt" | string & {};
	}
}