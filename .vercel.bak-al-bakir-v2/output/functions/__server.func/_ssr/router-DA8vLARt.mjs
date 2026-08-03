import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { c as HeadContent, d as Outlet, f as lazyRouteComponent, g as useRouter, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Route } from "./gallery._slug-XHFTLsJ6.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DA8vLARt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DVOttmXh.css";
var WHATSAPP_NUMBER = "923347402123";
function WhatsAppButton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: `https://wa.me/${WHATSAPP_NUMBER}`,
		target: "_blank",
		rel: "noopener noreferrer",
		"aria-label": "Chat with us on WhatsApp",
		className: "whatsapp-float fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 transition-transform hover:scale-110",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			viewBox: "0 0 32 32",
			className: "relative h-7 w-7",
			fill: "currentColor",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16.004 2.667c-7.36 0-13.333 5.973-13.333 13.333 0 2.353.615 4.66 1.782 6.687L2.667 29.333l6.804-1.756a13.28 13.28 0 0 0 6.533 1.756h.006c7.36 0 13.333-5.973 13.333-13.333S23.364 2.667 16.004 2.667Zm0 24.4h-.005a11.06 11.06 0 0 1-5.64-1.543l-.405-.24-4.037 1.043 1.078-3.934-.264-.404a11.04 11.04 0 0 1-1.694-5.876c0-6.11 4.973-11.083 11.084-11.083 2.96 0 5.744 1.153 7.837 3.246a11.01 11.01 0 0 1 3.245 7.842c-.002 6.11-4.975 11.083-11.088 11.083ZM22.06 18.6c-.334-.167-1.98-.977-2.287-1.088-.307-.11-.53-.166-.752.167-.223.334-.865 1.088-1.06 1.312-.196.223-.39.25-.724.083-.334-.167-1.41-.52-2.685-1.657-.993-.885-1.663-1.978-1.858-2.312-.196-.334-.02-.514.147-.68.15-.15.334-.39.5-.585.168-.196.223-.334.335-.557.11-.223.055-.418-.028-.585-.083-.167-.752-1.813-1.03-2.484-.27-.652-.545-.564-.752-.574l-.64-.012c-.223 0-.585.083-.891.418-.307.334-1.17 1.144-1.17 2.79 0 1.645 1.198 3.234 1.365 3.457.167.223 2.357 3.6 5.71 5.05.798.344 1.42.55 1.905.704.8.254 1.53.218 2.106.132.642-.096 1.98-.81 2.26-1.592.28-.782.28-1.452.196-1.592-.083-.14-.307-.223-.64-.39Z" })
		})]
	});
}
var EMAP_URL = "https://emap.pk/multi-garden-islamabad-map";
function EmapButton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: EMAP_URL,
		target: "_blank",
		rel: "noopener noreferrer",
		"aria-label": "View Multi Gardens Islamabad on eMap",
		className: "glass-dark fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-black shadow-lg shadow-black/30 transition-transform hover:-translate-y-0.5 hover:scale-105",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 24 24",
			className: "h-5 w-5 text-blue-bright",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M12 21s7-6.1 7-11a7 7 0 10-14 0c0 4.9 7 11 7 11z",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "12",
				cy: "10",
				r: "2.4"
			})]
		}), "eMap"]
	});
}
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$1 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Al Bakir Pvt Ltd, Design, Construction & Real Estate, Islamabad" },
			{
				name: "description",
				content: "Al Bakir Pvt Ltd: architecture, construction and real estate in B-17 Islamabad. Where dreams become true."
			},
			{
				property: "og:title",
				content: "Al Bakir Pvt Ltd, Design, Construction & Real Estate, Islamabad"
			},
			{
				property: "og:description",
				content: "Al Bakir Pvt Ltd: architecture, construction and real estate in B-17 Islamabad. Where dreams become true."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			},
			{
				name: "twitter:title",
				content: "Al Bakir Pvt Ltd, Design, Construction & Real Estate, Islamabad"
			},
			{
				name: "twitter:description",
				content: "Al Bakir Pvt Ltd: architecture, construction and real estate in B-17 Islamabad. Where dreams become true."
			},
			{
				property: "og:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/bb0427b7-8ada-4f36-bd28-0dc5fe9b0457/id-preview-60af8f20--b55a4b32-a40d-4bb2-96b4-890e1355fc67.lovable.app-1782408689555.png"
			},
			{
				name: "twitter:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/bb0427b7-8ada-4f36-bd28-0dc5fe9b0457/id-preview-60af8f20--b55a4b32-a40d-4bb2-96b4-890e1355fc67.lovable.app-1782408689555.png"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Manrope:wght@300;400;500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$1.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppButton, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmapButton, {})
		]
	});
}
var $$splitComponentImporter = () => import("./routes-C7iuO_xx.mjs");
var rootRouteChildren = {
	IndexRoute: createFileRoute("/")({
		head: () => ({ meta: [
			{ title: "Al Bakir Pvt Ltd, Construction, Architecture & Real Estate, Islamabad" },
			{
				name: "description",
				content: "Integrated construction, architectural design, engineering, interior design and real estate in B-17 Islamabad. 50+ projects delivered, 4.8 on Google."
			},
			{
				property: "og:title",
				content: "Al Bakir Pvt Ltd, Where Dreams Become True"
			},
			{
				property: "og:description",
				content: "Design, construction and real estate services in Islamabad. One trusted team from concept to handover."
			}
		] }),
		component: lazyRouteComponent($$splitComponentImporter, "component")
	}).update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$1
	}),
	GallerySlugRoute: Route.update({
		id: "/gallery/$slug",
		path: "/gallery/$slug",
		getParentRoute: () => Route$1
	})
};
var routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
