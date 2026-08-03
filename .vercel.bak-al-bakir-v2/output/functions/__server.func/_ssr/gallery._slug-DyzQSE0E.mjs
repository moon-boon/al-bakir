import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Route, t as DISCIPLINES } from "./gallery._slug-XHFTLsJ6.mjs";
import { c as AnimatePresence, t as useReducedMotion } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gallery._slug-DyzQSE0E.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Lightbox({ title, images, onClose }) {
	const [index, setIndex] = (0, import_react.useState)(0);
	const reduce = useReducedMotion();
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "";
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
			if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
			if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [images.length, onClose]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md",
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: { duration: reduce ? 0 : .25 },
		onClick: onClose,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				"aria-label": "Close",
				onClick: onClose,
				className: "glass-dark absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full text-white transition hover:scale-110",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					viewBox: "0 0 24 24",
					className: "h-5 w-5",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "1.8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M6 6l12 12M18 6L6 18",
						strokeLinecap: "round"
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-5 text-center text-sm font-medium uppercase tracking-[0.2em] text-white/70",
				children: [
					title,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-white/40",
						children: [
							index + 1,
							" / ",
							images.length
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex w-full max-w-5xl flex-1 items-center justify-center px-6",
				onClick: (e) => e.stopPropagation(),
				children: [
					images.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						"aria-label": "Previous image",
						onClick: () => setIndex((i) => (i - 1 + images.length) % images.length),
						className: "glass-dark absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white transition hover:scale-110 sm:left-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							viewBox: "0 0 24 24",
							className: "h-5 w-5",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "1.8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M15 18l-6-6 6-6",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex max-h-[75vh] w-full items-center justify-center overflow-hidden rounded-2xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
							mode: "wait",
							initial: false,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
								src: images[index],
								alt: `${title}, photo ${index + 1}`,
								className: "max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl",
								initial: reduce ? { opacity: 0 } : {
									opacity: 0,
									scale: .94,
									y: 12
								},
								animate: {
									opacity: 1,
									scale: 1,
									y: 0
								},
								exit: reduce ? { opacity: 0 } : {
									opacity: 0,
									scale: .96,
									y: -8
								},
								transition: {
									duration: reduce ? .01 : .35,
									ease: [
										.16,
										1,
										.3,
										1
									]
								}
							}, index)
						})
					}),
					images.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						"aria-label": "Next image",
						onClick: () => setIndex((i) => (i + 1) % images.length),
						className: "glass-dark absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white transition hover:scale-110 sm:right-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							viewBox: "0 0 24 24",
							className: "h-5 w-5",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "1.8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M9 6l6 6-6 6",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							})
						})
					})
				]
			}),
			images.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 flex items-center gap-2",
				children: images.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					"aria-label": `Go to photo ${i + 1}`,
					onClick: (e) => {
						e.stopPropagation();
						setIndex(i);
					},
					className: `h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60"}`
				}, i))
			})
		]
	});
}
var galleryProjects = {
	"architecture-design": [
		{
			id: "1-kanal-designer-house",
			title: "1 Kanal Designer House",
			images: ["/assets/project-1kanal-designer-house-1-DcNvRg6Y.jpg", "/assets/project-1kanal-designer-house-2-TRY-Z7vH.jpg"]
		},
		{
			id: "2-kanal-designer-house",
			title: "2 Kanal Designer House, Modern Grandeur",
			images: [
				"/assets/project-2kanal-designer-house-1-CR6TVVwq.jpg",
				"/assets/project-2kanal-designer-house-2-Bt7eN8pM.jpg",
				"/assets/project-2kanal-designer-house-3-DN5b4Gvi.jpg"
			]
		},
		{
			id: "roof-top-cafe",
			title: "Roof Top Cafe",
			images: [
				"/assets/project-rooftop-cafe-1-mX4jyPUM.jpg",
				"/assets/project-rooftop-cafe-2-bDaUGaHo.jpg",
				"/assets/project-rooftop-cafe-3-ROrmzFyy.jpg"
			]
		}
	],
	construction: [{
		id: "1-kanal-designer-house-corner",
		title: "1 Kanal Designer House Corner",
		images: [
			"/assets/project-1kanal-corner-1-I4Gcj3fE.jpg",
			"/assets/project-1kanal-corner-2-C8aCiFYw.jpg",
			"/assets/project-1kanal-corner-3-EdcYvPnO.jpg",
			"/assets/project-1kanal-corner-4-JuYRqI0E.jpg",
			"/assets/project-1kanal-corner-5-BV1bbttK.jpg",
			"/assets/project-1kanal-corner-6-DSmZM9dt.jpg",
			"/assets/project-1kanal-corner-7-VSoPi2d0.jpg",
			"/assets/project-1kanal-corner-8-K_eDbnrY.jpg"
		]
	}]
};
function GalleryPage() {
	const { slug } = Route.useParams();
	const d = DISCIPLINES[slug];
	const storageKey = `gallery:${slug}`;
	const projects = galleryProjects[slug] ?? [];
	const [openProject, setOpenProject] = (0, import_react.useState)(null);
	const [items, setItems] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(storageKey);
			if (raw) setItems(JSON.parse(raw));
		} catch {}
	}, [storageKey]);
	const persist = (next) => {
		setItems(next);
		try {
			localStorage.setItem(storageKey, JSON.stringify(next));
		} catch {}
	};
	const removeItem = (id) => persist(items.filter((i) => i.id !== id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-bg px-6 py-16 md:py-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "text-sm text-ink-dim hover:text-ink",
					children: "← Back home"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
					className: "mt-8 mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `mb-3 text-[11px] font-medium uppercase tracking-[0.2em] ${d.accent}`,
							children: "Gallery"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl font-semibold leading-[1.05] text-ink md:text-6xl",
							children: d.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-xl text-base leading-relaxed text-ink-dim",
							children: d.desc
						})
					] })
				}),
				projects.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
					children: projects.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setOpenProject(i),
						className: "surface-card group relative block overflow-hidden text-left transition hover:-translate-y-1 hover:shadow-lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative aspect-[4/3] w-full overflow-hidden bg-bg-elev",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: p.images[0],
									alt: p.title,
									className: "h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "glass-dark absolute left-3 top-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium text-white",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											viewBox: "0 0 24 24",
											className: "h-3 w-3",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" })
										}),
										p.images.length,
										" photos"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "glass-dark flex h-12 w-12 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:scale-110",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											viewBox: "0 0 24 24",
											className: "h-5 w-5",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "1.8",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M4 8V5a1 1 0 011-1h3M20 8V5a1 1 0 00-1-1h-3M4 16v3a1 1 0 001 1h3M20 16v3a1 1 0 01-1 1h-3",
												strokeLinecap: "round",
												strokeLinejoin: "round"
											})
										})
									})
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xl font-semibold text-ink",
								children: p.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 text-xs uppercase tracking-[0.2em] text-ink-dim opacity-0 transition group-hover:opacity-100",
								children: "View photos →"
							})]
						})]
					}, p.id))
				}),
				items.length === 0 && projects.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "surface-card flex min-h-[40vh] flex-col items-center justify-center p-12 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-ink-dim",
						children: "No items yet."
					})
				}) : items.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
					children: items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "surface-card group relative overflow-hidden",
						children: [
							it.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "aspect-[4/3] w-full overflow-hidden bg-bg-elev",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: it.image,
									alt: it.title,
									className: "h-full w-full object-cover transition duration-700 group-hover:scale-105"
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-[4/3] w-full bg-bg-elev" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-xl font-semibold text-ink",
									children: it.title
								}), it.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-ink-dim",
									children: it.description
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => removeItem(it.id),
								className: "absolute right-3 top-3 rounded-full bg-bg/80 px-3 py-1 text-xs text-ink-dim opacity-0 backdrop-blur transition group-hover:opacity-100",
								children: "Remove"
							})
						]
					}, it.id))
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: openProject !== null && projects[openProject] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbox, {
			title: projects[openProject].title,
			images: projects[openProject].images,
			onClose: () => setOpenProject(null)
		}) })]
	});
}
//#endregion
export { GalleryPage as component };
