import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useMotionValue, c as AnimatePresence, i as useTransform, n as useVelocity, o as useScroll, r as useSpring, t as useReducedMotion } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C7iuO_xx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BackgroundCanvas({ logoSrc }) {
	const canvasRef = (0, import_react.useRef)(null);
	const scrollRef = (0, import_react.useRef)(0);
	const logoParticlesRef = (0, import_react.useRef)([]);
	(0, import_react.useEffect)(() => {
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
		const resize = () => {
			w = window.innerWidth;
			h = window.innerHeight;
			canvas.width = w * dpr;
			canvas.height = h * dpr;
			canvas.style.width = w + "px";
			canvas.style.height = h + "px";
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};
		resize();
		window.addEventListener("resize", resize);
		const img = new Image();
		img.crossOrigin = "anonymous";
		img.src = logoSrc;
		img.onload = () => {
			const off = document.createElement("canvas");
			const size = 220;
			off.width = size;
			off.height = size;
			const octx = off.getContext("2d");
			octx.drawImage(img, 0, 0, size, size);
			const data = octx.getImageData(0, 0, size, size).data;
			const iconMaxY = Math.floor(size * .55);
			const colorAt = (x, y) => {
				const i = (y * size + x) * 4;
				if (data[i + 3] < 120) return null;
				const r = data[i], g = data[i + 1], b = data[i + 2];
				if (r > 180 && g < 130) return "rgba(255,159,10,0.85)";
				if (g > 140 && r < 160 && b < 160) return "rgba(48,209,88,0.85)";
				if (r < 90 && g < 90 && b < 90) return "rgba(29,29,31,0.85)";
				return "rgba(10,132,255,0.85)";
			};
			const targets = [];
			const step = 3;
			for (let y = 0; y < iconMaxY; y += step) for (let x = 0; x < size; x += step) {
				const c = colorAt(x, y);
				if (c) targets.push({
					tx: x,
					ty: y,
					c
				});
			}
			logoParticlesRef.current = targets.map((t) => ({
				tx: t.tx,
				ty: t.ty,
				sx: (Math.random() - .5) * 2,
				sy: (Math.random() - .5) * 2,
				c: t.c,
				delay: Math.random() * .5
			}));
		};
		const particleCount = Math.min(70, Math.floor(w * h / 24e3));
		const accentColors = [
			"rgba(21,23,28,0.30)",
			"rgba(21,23,28,0.26)",
			"rgba(21,23,28,0.20)",
			"rgba(10,132,255,0.30)",
			"rgba(48,209,88,0.28)",
			"rgba(255,159,10,0.28)"
		];
		const particles = Array.from({ length: particleCount }, () => ({
			x: Math.random() * w,
			y: Math.random() * h,
			vx: (Math.random() - .5) * .18,
			vy: (Math.random() - .5) * .18,
			r: Math.random() * 1.3 + .4,
			color: accentColors[Math.floor(Math.random() * accentColors.length)]
		}));
		const onScroll = () => {
			const max = document.documentElement.scrollHeight - window.innerHeight;
			scrollRef.current = max > 0 ? window.scrollY / max : 0;
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		let raf = 0;
		let t = 0;
		const draw = () => {
			t += .005;
			ctx.clearRect(0, 0, w, h);
			const grad = ctx.createRadialGradient(w / 2, 0, 0, w / 2, 0, h * .9);
			grad.addColorStop(0, "rgba(10,132,255,0.05)");
			grad.addColorStop(.5, "rgba(0,0,0,0.02)");
			grad.addColorStop(1, "rgba(0,0,0,0)");
			ctx.fillStyle = grad;
			ctx.fillRect(0, 0, w, h);
			if (!reduced) particles.forEach((p) => {
				p.x += p.vx;
				p.y += p.vy;
				if (p.x < 0) p.x = w;
				if (p.x > w) p.x = 0;
				if (p.y < 0) p.y = h;
				if (p.y > h) p.y = 0;
			});
			ctx.lineWidth = .5;
			for (let i = 0; i < particles.length; i++) for (let j = i + 1; j < particles.length; j++) {
				const a = particles[i], b = particles[j];
				const dx = a.x - b.x, dy = a.y - b.y;
				const d2 = dx * dx + dy * dy;
				if (d2 < 14400) {
					ctx.strokeStyle = `rgba(21,23,28,${.1 * (1 - d2 / 14400)})`;
					ctx.beginPath();
					ctx.moveTo(a.x, a.y);
					ctx.lineTo(b.x, b.y);
					ctx.stroke();
				}
			}
			particles.forEach((p) => {
				ctx.fillStyle = p.color;
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
				ctx.fill();
			});
			const lp = logoParticlesRef.current;
			if (lp.length) {
				const progress = Math.min(1, Math.max(0, (scrollRef.current - .02) * 1.4));
				const logoSize = Math.min(w * .95, h * .9, 880);
				const scale = logoSize / 220;
				const cx = w / 2 - logoSize / 2;
				const cy = h / 2 - logoSize / 2;
				const scatterX = w * .6;
				const scatterY = h * .5;
				const centerX = w / 2;
				const centerY = h / 2;
				ctx.save();
				const ease = (x) => 1 - Math.pow(1 - x, 3);
				for (let i = 0; i < lp.length; i++) {
					const p = lp[i];
					const k = ease(Math.min(1, Math.max(0, (progress - p.delay) / (1 - p.delay))));
					const startX = centerX + p.sx * scatterX;
					const startY = centerY + p.sy * scatterY;
					const endX = cx + p.tx * scale;
					const endY = cy + p.ty * scale;
					const drift = (1 - k) * 6;
					const ox = Math.sin(t * 1.5 + i) * drift;
					const oy = Math.cos(t * 1.5 + i * .7) * drift;
					const x = startX + (endX - startX) * k + ox;
					const y = startY + (endY - startY) * k + oy;
					ctx.globalAlpha = .18 + .55 * k;
					ctx.fillStyle = p.c;
					ctx.beginPath();
					ctx.arc(x, y, 1.2 + .5 * k, 0, Math.PI * 2);
					ctx.fill();
				}
				ctx.restore();
			}
			raf = requestAnimationFrame(draw);
		};
		raf = requestAnimationFrame(draw);
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("resize", resize);
			window.removeEventListener("scroll", onScroll);
		};
	}, [logoSrc]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref: canvasRef,
		className: "fixed inset-0 -z-10 h-full w-full",
		style: { background: "#fcfcfd" },
		"aria-hidden": true
	});
}
var architecture_design_thumb_default = "/assets/architecture-design-thumb-aSxCJK6d.png";
var construction_thumb_default = "/assets/construction-thumb-BZX7okun.jpg";
/** Writes cursor position as CSS custom properties for spotlight-on-hover cards. Direct DOM write, no re-render. */
function trackSpotlight(e) {
	const r = e.currentTarget.getBoundingClientRect();
	e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
	e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}
/**
* Premium image entrance: the frame un-clips bottom-to-top (curtain wipe)
* while the photo settles from a 1.25x zoom, then drifts with a gentle
* scroll parallax inside its own frame.
*
* The in-view observer lives on an UNCLIPPED wrapper: Chromium reports a
* fully clip-path'ed element as non-intersecting, so observing the clipped
* node directly would never fire. Variants propagate the reveal down.
*/
function CurtainImage({ src, delay = 0, children }) {
	const ref = (0, import_react.useRef)(null);
	const reduce = useReducedMotion();
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"]
	});
	const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-5%", "5%"]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		ref,
		className: "absolute inset-0",
		initial: reduce ? "shown" : "hidden",
		whileInView: "shown",
		viewport: {
			once: true,
			amount: .25
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			className: "absolute inset-0 overflow-hidden",
			variants: {
				hidden: { clipPath: "inset(100% 0 0 0)" },
				shown: {
					clipPath: "inset(0% 0 0 0)",
					transition: {
						duration: 1.1,
						ease: [
							.65,
							0,
							.35,
							1
						],
						delay
					}
				}
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "absolute inset-x-0 -inset-y-[8%]",
				style: { y },
				variants: {
					hidden: { scale: 1.25 },
					shown: {
						scale: 1,
						transition: {
							duration: 1.5,
							ease: [
								.16,
								1,
								.3,
								1
							],
							delay
						}
					}
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src,
					alt: "",
					"aria-hidden": true,
					className: "h-full w-full object-cover transition-[scale] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
				})
			}), children]
		})
	});
}
var TIMEZONE = "Asia/Karachi";
function computeIsOpen(now) {
	return new Intl.DateTimeFormat("en-GB", {
		timeZone: TIMEZONE,
		weekday: "short"
	}).format(now) !== "Fri";
}
function useOpenStatus() {
	const [now, setNow] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const tick = () => setNow(/* @__PURE__ */ new Date());
		tick();
		const id = setInterval(tick, 3e4);
		return () => clearInterval(id);
	}, []);
	return {
		now,
		isOpen: now ? computeIsOpen(now) : false,
		timeZone: TIMEZONE
	};
}
function LocalTime() {
	const [now, setNow] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const tick = () => setNow(/* @__PURE__ */ new Date());
		tick();
		const id = setInterval(tick, 1e3);
		return () => clearInterval(id);
	}, []);
	const fmt = now ? new Intl.DateTimeFormat("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		timeZone: "Asia/Karachi",
		hour12: false
	}).format(now) : "--:--:--";
	const { isOpen } = useOpenStatus();
	const statusColor = isOpen ? "text-green" : "text-orange";
	const statusLabel = isOpen ? "OPEN NOW" : "CLOSED NOW";
	const statusDot = isOpen ? "bg-green" : "bg-orange";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `mb-3 flex items-center gap-2 text-[11px] font-medium tracking-[0.15em] ${statusColor}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "relative flex h-2 w-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute inline-flex h-full w-full animate-ping rounded-full ${statusDot} opacity-70` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `relative inline-flex h-2 w-2 rounded-full ${statusDot}` })]
			}), statusLabel]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-display text-5xl font-semibold tabular-nums text-ink md:text-6xl",
			children: fmt
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 text-xs uppercase tracking-[0.2em] text-ink-dim",
			children: "Islamabad · PKT"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 text-sm text-ink-dim",
			children: "Open 24 hours daily, except Friday"
		})
	] });
}
function Marquee({ children, speed = 30, className = "" }) {
	const reduce = useReducedMotion();
	const { scrollY } = useScroll();
	const skewX = useTransform(useSpring(useVelocity(scrollY), {
		stiffness: 160,
		damping: 40,
		mass: .6
	}), [-1600, 1600], reduce ? [0, 0] : [7, -7]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `group relative w-full overflow-hidden ${className}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			className: "flex w-full",
			style: { skewX },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 items-center gap-12 pr-12 group-hover:[animation-play-state:paused]",
				style: { animation: reduce ? "none" : `marquee ${speed}s linear infinite` },
				children: [children, !reduce && children]
			})
		})
	});
}
var wordVariants = {
	hidden: {
		y: "115%",
		rotateX: 50,
		opacity: 0,
		filter: "blur(6px)"
	},
	shown: {
		y: "0%",
		rotateX: 0,
		opacity: 1,
		filter: "blur(0px)",
		transition: {
			duration: .85,
			ease: [
				.16,
				1,
				.3,
				1
			]
		}
	}
};
/**
* Kinetic statement heading: each word rises out of its own overflow mask,
* un-rotating and un-blurring with a stagger. The in-view trigger lives on the
* PARENT (variants + staggerChildren) - observing each word directly fails
* because they start transformed out of their own mask, so their
* IntersectionObservers never fire.
*/
function RevealHeading({ lines }) {
	const reduce = useReducedMotion();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
		className: "block",
		style: { perspective: 800 },
		initial: reduce ? "shown" : "hidden",
		whileInView: "shown",
		viewport: {
			once: true,
			amount: .4
		},
		variants: {
			hidden: {},
			shown: { transition: { staggerChildren: .08 } }
		},
		children: lines.map((line, li) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `block ${line.dim ? "text-ink-dim" : ""}`,
			children: line.text.split(" ").map((word, wi, arr) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "inline-block overflow-hidden align-bottom",
				style: {
					paddingBottom: "0.14em",
					marginBottom: "-0.14em"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
					className: "inline-block",
					style: {
						transformOrigin: "center bottom",
						willChange: "transform, filter"
					},
					variants: wordVariants,
					children: word
				})
			}), wi < arr.length - 1 ? " " : ""] }, wi))
		}, li))
	});
}
var services = [
	{
		title: "Architecture & Design",
		slug: "architecture-design",
		desc: "Bespoke residential and commercial design rooted in context, climate and craft.",
		accentClass: "text-blue-bright",
		underline: "bg-blue",
		thumb: architecture_design_thumb_default,
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 64 64",
			className: "h-10 w-10",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "32",
				cy: "20",
				r: "4"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M32 24v8M14 56l18-24 18 24M22 44h20",
				strokeLinecap: "round"
			})]
		})
	},
	{
		title: "Construction",
		slug: "construction",
		desc: "End to end build delivery with disciplined timelines and material integrity.",
		accentClass: "text-orange",
		underline: "bg-orange",
		thumb: construction_thumb_default,
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 64 64",
			className: "h-10 w-10",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M8 56V28l24-16 24 16v28",
				strokeLinejoin: "round"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M24 56V40h16v16M8 56h48",
				strokeLinecap: "round"
			})]
		})
	},
	{
		title: "Real Estate",
		slug: "real-estate",
		desc: "Curated property opportunities across B-17 Islamabad and surrounding sectors.",
		accentClass: "text-green",
		underline: "bg-green",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 64 64",
			className: "h-10 w-10",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "22",
				cy: "32",
				r: "8"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M30 32h26l-6 6M50 38v6",
				strokeLinecap: "round"
			})]
		})
	}
];
var capabilities = [
	"BIM",
	"CAD",
	"Project Management",
	"Interior Design",
	"Site Supervision",
	"Real Estate Advisory",
	"Cost Engineering",
	"Sustainable Design"
];
function Bento() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "services",
		className: "relative bg-bg-elev px-6 py-28 md:py-36",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-16 max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "fade-up mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-dim",
						children: "What we do"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-4xl font-semibold leading-[1.05] text-ink md:text-6xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevealHeading, { lines: [{ text: "A single studio." }, {
							text: "Three disciplines.",
							dim: true
						}] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "fade-up mt-5 max-w-[65ch] text-base leading-relaxed text-ink-dim",
						children: "Design, construction and real estate under one roof, accountable from first sketch to handover."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-5 md:grid-cols-12 md:auto-rows-[200px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
						className: "fade-up surface-card group relative overflow-hidden md:col-span-8 md:row-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex h-full flex-col justify-between p-8 md:p-12",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] font-medium uppercase tracking-[0.2em] text-ink-dim",
								children: "Studio manifesto"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-display text-3xl font-semibold leading-[1.1] text-ink md:text-5xl",
								children: [
									"We build from ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-blue-bright",
										children: "first principles"
									}),
									", with a single team accountable to one drawing."
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-6 h-px w-16 bg-ink transition-all duration-500 group-hover:w-32" })] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
						className: "fade-up surface-card relative overflow-hidden md:col-span-4 md:row-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex h-full flex-col justify-between p-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocalTime, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] font-medium uppercase tracking-[0.15em] text-ink-dim",
								children: "Primary office"
							})]
						})
					}),
					services.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/gallery/$slug",
						params: { slug: s.slug },
						onMouseMove: trackSpotlight,
						className: "surface-card group relative block cursor-pointer overflow-hidden active:scale-[0.985] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] md:col-span-4 md:row-span-2",
						children: [
							s.thumb && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurtainImage, {
								src: s.thumb,
								delay: i * .14,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "spotlight-overlay pointer-events-none opacity-0 transition-opacity duration-500 group-hover:opacity-100" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "fade-up relative flex h-full flex-col justify-between p-8",
								style: { transitionDelay: `${i * 140 + 250}ms` },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `glass-light flex h-16 w-16 items-center justify-center rounded-2xl ${s.accentClass} transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:rotate-[6deg]`,
									children: s.icon
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: `font-display text-2xl font-semibold ${s.thumb ? "text-white" : "text-ink"}`,
										children: s.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `my-3 h-0.5 w-8 ${s.underline} transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-16` }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: `mt-2 text-sm leading-relaxed ${s.thumb ? "text-white/80" : "text-ink-dim"}`,
										children: s.desc
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `mt-4 text-xs uppercase tracking-[0.2em] opacity-0 transition group-hover:opacity-100 ${s.thumb ? "text-white/70" : "text-ink-dim"}`,
										children: "View gallery →"
									})
								] })]
							})
						]
					}, s.title)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
						className: "fade-up surface-card relative overflow-hidden md:col-span-12",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marquee, {
							speed: 32,
							className: "py-6",
							children: capabilities.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-12 font-display text-2xl font-medium text-ink-dim md:text-3xl",
								children: [c, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rotate-45 bg-ink-dim" })]
							}, c))
						})
					})
				]
			})]
		})
	});
}
var springConfig = {
	stiffness: 300,
	damping: 22,
	mass: .4
};
var MOTION_TAGS = {
	a: motion.a,
	button: motion.button
};
function MagneticButton({ as, strength = 14, children, onMouseMove, onMouseLeave, ...rest }) {
	const MotionTag = MOTION_TAGS[as || "a"] ?? motion.a;
	const reduce = useReducedMotion();
	const touch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
	const enabled = !reduce && !touch;
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const springX = useSpring(x, springConfig);
	const springY = useSpring(y, springConfig);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MotionTag, {
		...rest,
		style: {
			x: springX,
			y: springY,
			...rest.style
		},
		whileTap: enabled ? { scale: .96 } : void 0,
		onMouseMove: (e) => {
			onMouseMove?.(e);
			if (!enabled) return;
			const r = e.currentTarget.getBoundingClientRect();
			x.set((e.clientX - (r.left + r.width / 2)) / r.width * strength);
			y.set((e.clientY - (r.top + r.height / 2)) / r.height * strength);
		},
		onMouseLeave: (e) => {
			onMouseLeave?.(e);
			x.set(0);
			y.set(0);
		},
		children
	});
}
function Counter({ to, duration = 1600, decimals = 0, suffix = "" }) {
	const [val, setVal] = (0, import_react.useState)(0);
	const ref = (0, import_react.useRef)(null);
	const started = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setVal(to);
			return;
		}
		const io = new IntersectionObserver((entries) => {
			if (started.current) return;
			if (entries.some((e) => e.isIntersecting)) {
				started.current = true;
				const start = performance.now();
				const tick = (t) => {
					const p = Math.min(1, (t - start) / duration);
					const eased = 1 - Math.pow(1 - p, 3);
					setVal(to * eased);
					if (p < 1) requestAnimationFrame(tick);
				};
				requestAnimationFrame(tick);
			}
		}, { threshold: .3 });
		io.observe(el);
		return () => io.disconnect();
	}, [to, duration]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		ref,
		children: [val.toFixed(decimals), suffix]
	});
}
var logo_mark_default = "/assets/logo-mark-CZl7wSp1.png";
/**
* Scroll-scrubbed construction time-lapse hero.
*
* The building assembles as the user scrolls. We drive video.currentTime from a
* spring-smoothed scroll progress inside a single rAF loop (no React state per
* frame, so no re-renders). The source is all-intra H.264, so every seek is
* frame-accurate and instant -> buttery scrubbing.
*/
function ScrollVideoHero() {
	const wrapRef = (0, import_react.useRef)(null);
	const videoRef = (0, import_react.useRef)(null);
	const reduce = useReducedMotion();
	const { scrollYProgress } = useScroll({
		target: wrapRef,
		offset: ["start start", "end end"]
	});
	const progress = useSpring(scrollYProgress, {
		stiffness: 300,
		damping: 34,
		mass: 1,
		restDelta: 1e-4
	});
	const brandY = useTransform(progress, [0, 1], reduce ? [0, 0] : [0, -70]);
	const brandScale = useTransform(progress, [0, .9], reduce ? [1, 1] : [1, .82]);
	const brandOpacity = useTransform(progress, [
		0,
		.55,
		.8
	], [
		1,
		1,
		0
	]);
	const cueOpacity = useTransform(progress, [0, .12], [1, 0]);
	const taglineOpacity = useTransform(progress, [.62, .82], [0, 1]);
	const taglineY = useTransform(progress, [.62, .82], reduce ? [0, 0] : [24, 0]);
	const barScaleX = progress;
	(0, import_react.useEffect)(() => {
		const video = videoRef.current;
		if (!video) return;
		video.pause();
		if (reduce) {
			const showBuilt = () => {
				if (video.duration) video.currentTime = video.duration * .85;
			};
			if (video.readyState >= 1) showBuilt();
			else video.addEventListener("loadedmetadata", showBuilt, { once: true });
			return;
		}
		let raf = 0;
		let lastFrameIndex = -1;
		const supportsFastSeek = typeof video.fastSeek === "function";
		const SOURCE_FPS = 24;
		const loop = () => {
			const dur = video.duration;
			const p = progress.get();
			if (dur && !Number.isNaN(dur)) {
				const totalFrames = Math.floor(dur * SOURCE_FPS) - 1;
				const frameIndex = Math.round(Math.min(p, 1) * totalFrames);
				if (frameIndex !== lastFrameIndex) {
					const t = frameIndex / SOURCE_FPS;
					if (supportsFastSeek) video.fastSeek(t);
					else video.currentTime = t;
					lastFrameIndex = frameIndex;
				}
			}
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, [progress, reduce]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: wrapRef,
		id: "top",
		className: "relative h-[300vh] w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 h-[100dvh] w-full overflow-hidden",
			style: { background: "linear-gradient(180deg, #b4b4b6 0%, #bebec0 52%, #c6c6c8 100%)" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
          .hero-video-stage { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
          .hero-video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            -webkit-mask-image: radial-gradient(130% 118% at 50% 50%, #000 74%, transparent 100%);
            mask-image: radial-gradient(130% 118% at 50% 50%, #000 74%, transparent 100%);
          }
          @media (max-width: 767px) {
            .hero-video {
              width: auto;
              height: auto;
              max-width: 100%;
              max-height: 100%;
              aspect-ratio: 16 / 9;
              -webkit-mask-image: radial-gradient(85% 130% at 50% 50%, #000 55%, transparent 100%);
              mask-image: radial-gradient(85% 130% at 50% 50%, #000 55%, transparent 100%);
            }
          }
        ` }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hero-video-stage",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
						ref: videoRef,
						className: "hero-video",
						src: "/hero-construction.mp4",
						poster: "/hero-construction-poster.jpg",
						muted: true,
						playsInline: true,
						preload: "auto",
						disablePictureInPicture: true,
						"aria-hidden": true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						style: {
							y: brandY,
							scale: brandScale,
							opacity: brandOpacity
						},
						className: "flex flex-col items-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: logo_mark_default,
								alt: "Al Bakir",
								className: "h-16 w-auto object-contain sm:h-20",
								style: { filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.45)) drop-shadow(0 3px 10px rgba(0,0,0,0.3))" }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-6 font-display font-semibold tracking-[0.14em] text-white sm:tracking-[0.22em]",
								style: {
									fontSize: "clamp(2rem, 9vw, 6.5rem)",
									textShadow: "0 1px 1px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.4), 0 4px 14px rgba(0,0,0,0.3)"
								},
								children: "AL BAKIR"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 whitespace-nowrap text-[9.5px] font-medium uppercase tracking-[0.08em] text-white/85 sm:text-sm sm:tracking-[0.3em]",
								style: { textShadow: "0 1px 1px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.35)" },
								children: "Design · Construction · Real Estate"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						style: {
							opacity: taglineOpacity,
							y: taglineY,
							textShadow: "0 1px 1px rgba(0,0,0,0.5), 0 2px 10px rgba(0,0,0,0.35)"
						},
						className: "pointer-events-none absolute bottom-28 left-1/2 w-[90vw] max-w-3xl -translate-x-1/2 font-display text-2xl font-light italic text-white sm:text-3xl md:text-4xl",
						children: "From blueprint to handover, one trusted team."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					style: {
						opacity: cueOpacity,
						textShadow: "0 1px 1px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.35)"
					},
					className: "absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-white/85",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase tracking-[0.3em]",
							children: "Scroll to build"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							width: "18",
							height: "28",
							viewBox: "0 0 24 40",
							className: reduce ? "" : "animate-bounce",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M12 4v28M4 24l8 8 8-8",
								stroke: "currentColor",
								strokeWidth: "1.4",
								fill: "none"
							})
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-x-0 bottom-0 z-10 h-[3px] bg-black/15",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "h-full origin-left bg-white",
						style: { scaleX: barScaleX }
					})
				})
			]
		})
	});
}
var logo_default = "/assets/logo-9mst-APG.png";
var leader_2_default = "/assets/leader-2-B_h408PX.jpg";
var leader_1_default = "/assets/leader-1-BhAb_wa8.jpg";
var leader_3_default = "/assets/leader-3-BSrwIGZG.jpg";
function useReveal() {
	(0, import_react.useEffect)(() => {
		const els = document.querySelectorAll(".fade-up:not(.is-visible)");
		const io = new IntersectionObserver((entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) {
					e.target.classList.add("is-visible");
					io.unobserve(e.target);
				}
			});
		}, {
			threshold: .01,
			rootMargin: "0px 0px -8% 0px"
		});
		els.forEach((el) => io.observe(el));
		return () => io.disconnect();
	}, []);
}
function Nav() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const { isOpen } = useOpenStatus();
	const reduce = useReducedMotion();
	const links = [
		{
			href: "#services",
			label: "Services"
		},
		{
			href: "#values",
			label: "Values"
		},
		{
			href: "#about",
			label: "About"
		},
		{
			href: "#contact",
			label: "Contact"
		}
	];
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = prev;
		};
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/40 text-white backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#top",
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: logo_mark_default,
						alt: "Al Bakir",
						className: "h-8 w-12 object-contain sm:h-9 sm:w-14"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-base font-semibold tracking-tight text-white",
							children: "Al Bakir"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] tracking-[0.2em] text-white/70",
							children: "PVT · LTD"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "hidden items-center gap-8 md:flex",
					children: [links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: l.href,
						className: "text-sm font-medium text-white/80 transition-colors hover:text-white",
						children: l.label
					}, l.href)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "glass-dark ml-2 flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium text-white",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative flex h-1.5 w-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute inline-flex h-full w-full animate-ping rounded-full opacity-70 ${isOpen ? "bg-green" : "bg-orange"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `relative inline-flex h-1.5 w-1.5 rounded-full ${isOpen ? "bg-green" : "bg-orange"}` })]
						}), isOpen ? "Open now" : "Closed now"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					"aria-label": "Open menu",
					"aria-expanded": open,
					onClick: () => setOpen(true),
					className: "glass-dark flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl md:hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block h-px w-6 bg-white" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block h-px w-6 bg-white" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block h-px w-6 bg-white" })
					]
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: "fixed inset-0 z-[60] flex flex-col md:hidden",
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: {
			duration: .28,
			ease: [
				.16,
				1,
				.3,
				1
			]
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "absolute inset-0",
			style: { background: "radial-gradient(ellipse 90% 55% at 25% 15%, rgba(99,52,201,0.5), transparent 60%),radial-gradient(ellipse 80% 55% at 85% 25%, rgba(255,159,10,0.28), transparent 60%),linear-gradient(180deg, #0a0f28 0%, #1a1042 60%, #2a1654 100%)" }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex h-full flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/assets/logo-mark-CZl7wSp1.png",
							alt: "Al Bakir",
							className: "h-8 w-12 object-contain"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-base font-semibold tracking-tight text-white",
							children: "Al Bakir"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						"aria-label": "Close menu",
						onClick: () => setOpen(false),
						className: "glass-dark flex h-10 w-10 items-center justify-center rounded-xl text-white",
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
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex flex-1 flex-col justify-center px-6",
					children: links.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.a, {
						href: l.href,
						onClick: () => setOpen(false),
						className: "flex items-center justify-between border-b border-white/10 py-5 font-display text-3xl font-semibold text-white transition-colors active:text-white/60",
						initial: reduce ? false : {
							opacity: 0,
							y: 24,
							filter: "blur(6px)"
						},
						animate: {
							opacity: 1,
							y: 0,
							filter: "blur(0px)"
						},
						transition: {
							duration: .5,
							delay: reduce ? 0 : .12 + i * .07,
							ease: [
								.16,
								1,
								.3,
								1
							]
						},
						children: [l.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							viewBox: "0 0 24 24",
							className: "h-6 w-6 text-white/30",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "1.6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M9 6l6 6-6 6",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							})
						})]
					}, l.href))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: "space-y-5 px-6 pb-10",
					initial: reduce ? false : {
						opacity: 0,
						y: 16
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .5,
						delay: reduce ? 0 : .45,
						ease: [
							.16,
							1,
							.3,
							1
						]
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-sm font-medium text-white/80",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative flex h-2 w-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute inline-flex h-full w-full animate-ping rounded-full opacity-70 ${isOpen ? "bg-green" : "bg-orange"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `relative inline-flex h-2 w-2 rounded-full ${isOpen ? "bg-green" : "bg-orange"}` })]
							}),
							isOpen ? "Open now" : "Closed now",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-white/40",
								children: "· B-17 Islamabad"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#contact",
						onClick: () => setOpen(false),
						className: "flex w-full items-center justify-center rounded-full bg-white px-6 py-4 font-display text-base font-semibold text-ink transition-transform active:scale-[0.98]",
						children: "Start your project"
					})]
				})
			]
		})]
	}) })] });
}
function TrustStrip() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative bg-bg px-6 py-14",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "fade-up mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 sm:gap-14",
			children: [[{
				num: 4.8,
				dec: 1,
				label: "Google Rating"
			}, {
				num: 24,
				dec: 0,
				label: "Daily Hours"
			}].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-3xl font-semibold leading-none text-ink tabular-nums",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Counter, {
						to: s.num,
						decimals: s.dec
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-ink-dim",
					children: s.label
				})]
			}, s.label)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, {
					as: "a",
					href: "#contact",
					className: "btn-primary",
					children: "Start your project"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#services",
					className: "btn-ghost",
					children: "View our work →"
				})]
			})]
		})
	});
}
var serviceGroups = [
	{
		title: "Construction",
		accentBar: "bg-blue",
		accentText: "text-blue-bright",
		items: [
			"Grey Structure Construction",
			"Turnkey Construction",
			"Renovation & Remodeling"
		]
	},
	{
		title: "Property types",
		accentBar: "bg-orange",
		accentText: "text-orange",
		items: [
			"Residential Homes",
			"Luxury Villas",
			"Farmhouses",
			"Commercial Buildings"
		]
	},
	{
		title: "Project delivery",
		accentBar: "bg-green",
		accentText: "text-green",
		items: [
			"Project Management",
			"Construction Supervision",
			"Cost Estimation",
			"Quantity Surveying"
		]
	}
];
var realEstateGroups = [
	{
		title: "Property services",
		accentBar: "bg-green",
		accentText: "text-green",
		items: [
			"Property Buying",
			"Property Selling",
			"Property Management",
			"Property Rentals"
		]
	},
	{
		title: "Project types",
		accentBar: "bg-blue",
		accentText: "text-blue-bright",
		items: ["Residential Projects", "Commercial Projects"]
	},
	{
		title: "Investment & marketing",
		accentBar: "bg-orange",
		accentText: "text-orange",
		items: [
			"Investment Consultancy",
			"Overseas Investment Guidance",
			"Project Marketing"
		]
	}
];
function ConstructionServices() {
	const reduce = useReducedMotion();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "construction-services",
		className: "relative bg-bg px-6 py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-14 max-w-2xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl font-semibold leading-[1.05] text-ink md:text-5xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevealHeading, { lines: [{ text: "Construction," }, {
						text: "covered end to end.",
						dim: true
					}] })
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "grid gap-10 md:grid-cols-3",
				initial: reduce ? "shown" : "hidden",
				whileInView: "shown",
				viewport: {
					once: true,
					amount: .2
				},
				variants: {
					hidden: {},
					shown: { transition: { staggerChildren: .1 } }
				},
				children: serviceGroups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					variants: {
						hidden: {
							opacity: 0,
							y: 20,
							filter: "blur(10px)"
						},
						shown: {
							opacity: 1,
							y: 0,
							filter: "blur(0px)",
							transition: {
								duration: .6,
								ease: [
									.16,
									1,
									.3,
									1
								]
							}
						}
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `mb-5 h-0.5 w-10 ${g.accentBar}` }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: `font-display text-lg font-semibold ${g.accentText}`,
							children: g.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 flex flex-wrap gap-2",
							children: g.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full border border-black/10 bg-bg-elev px-4 py-2 text-sm text-ink transition-colors hover:border-black/20",
								children: item
							}, item))
						})
					]
				}, g.title))
			})]
		})
	});
}
function RealEstateServices() {
	const reduce = useReducedMotion();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "real-estate-services",
		className: "relative bg-bg-elev px-6 py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-14 max-w-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl font-semibold leading-[1.05] text-ink md:text-5xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevealHeading, { lines: [{ text: "Real estate services." }] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "fade-up mt-5 max-w-[65ch] text-base leading-relaxed text-ink-dim",
					children: "Our professional real estate team provides reliable consultancy and investment solutions, including dedicated support for overseas investment."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "grid gap-10 md:grid-cols-3",
				initial: reduce ? "shown" : "hidden",
				whileInView: "shown",
				viewport: {
					once: true,
					amount: .2
				},
				variants: {
					hidden: {},
					shown: { transition: { staggerChildren: .1 } }
				},
				children: realEstateGroups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					variants: {
						hidden: {
							opacity: 0,
							y: 20,
							filter: "blur(10px)"
						},
						shown: {
							opacity: 1,
							y: 0,
							filter: "blur(0px)",
							transition: {
								duration: .6,
								ease: [
									.16,
									1,
									.3,
									1
								]
							}
						}
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `mb-5 h-0.5 w-10 ${g.accentBar}` }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: `font-display text-lg font-semibold ${g.accentText}`,
							children: g.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 flex flex-wrap gap-2",
							children: g.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full border border-black/10 bg-bg px-4 py-2 text-sm text-ink transition-colors hover:border-black/20",
								children: item
							}, item))
						})
					]
				}, g.title))
			})]
		})
	});
}
function Stats() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative bg-bg px-6 py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-14 max-w-2xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl font-semibold leading-[1.05] text-ink md:text-5xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevealHeading, { lines: [{ text: "A decade of building, measured." }] })
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 divide-x divide-y divide-black/10 border-y border-black/10 md:grid-cols-4 md:divide-y-0",
				children: [
					{
						num: 31,
						suffix: "+",
						label: "Active sites"
					},
					{
						num: 200,
						suffix: "+",
						label: "Design projects"
					},
					{
						num: 75,
						suffix: "+",
						label: "Delivered projects"
					},
					{
						num: 80,
						suffix: "%",
						label: "Business from referrals"
					}
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "fade-up p-8 md:p-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-5xl font-semibold tabular-nums text-ink md:text-6xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Counter, {
							to: s.num,
							decimals: 0,
							suffix: s.suffix
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 text-sm text-ink-dim",
						children: s.label
					})]
				}, s.label))
			})]
		})
	});
}
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "about",
		className: "relative bg-bg px-6 py-28 md:py-36",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "fade-up mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-dim",
						children: "About the studio"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-4xl font-semibold leading-[1.05] text-ink md:text-6xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevealHeading, { lines: [{ text: "Where dreams" }, { text: "become true." }] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "fade-up mt-8 text-xl leading-relaxed text-ink",
						children: "Al Bakir Pvt Ltd is an Islamabad based practice working at the intersection of architecture, construction, engineering, interior design and real estate. We build from first principles, with a single team accountable from the first sketch to the final handover."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "fade-up mt-6 max-w-[65ch] text-base leading-relaxed text-ink-dim",
						children: "Our work is shaped by Pakistani context, modern construction discipline and a refusal to compromise on detail. Open 24 hours a day, every day except Friday."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fade-up mt-10 inline-flex surface-card-elev p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-orange",
						children: "Head office"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-xl font-semibold text-ink",
						children: "Multi Gardens B-17"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm text-ink-dim",
						children: "Islamabad, Pakistan"
					})
				] })
			})]
		})
	});
}
function VisionMission() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative bg-bg px-6 py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl gap-8 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fade-up surface-card-elev relative overflow-hidden p-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-y-0 left-0 w-1 bg-blue" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-3xl font-semibold leading-tight text-ink md:text-4xl",
						children: "Pakistan's most trusted integrated construction, design and real estate company."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-base leading-relaxed text-ink-dim",
						children: "Delivering innovative developments, sustainable solutions and exceptional customer experiences, at home and, in time, across borders."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fade-up surface-card-elev relative overflow-hidden p-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-y-0 left-0 w-1 bg-orange" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mb-5 font-display text-3xl font-semibold leading-tight text-ink md:text-4xl",
						children: "Our mission"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-4",
						children: [
							"Deliver high-quality construction and engineering services.",
							"Create innovative architectural and interior design solutions.",
							"Build long-term relationships based on trust, integrity, and professionalism.",
							"Provide transparent and reliable real estate consultancy.",
							"Maximize value for homeowners, businesses, and investors.",
							"Continuously improve through innovation, technology, and skilled professionals."
						].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								className: "mt-1 h-5 w-5 flex-shrink-0 text-orange",
								viewBox: "0 0 20 20",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M4 10l4 4 8-9",
									strokeLinecap: "round",
									strokeLinejoin: "round"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-base leading-relaxed text-ink",
								children: m
							})]
						}, m))
					})
				]
			})]
		})
	});
}
function CoreValues() {
	const reduce = useReducedMotion();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "values",
		className: "relative bg-bg-elev px-6 py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fade-up mb-14 max-w-2xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl font-semibold leading-[1.05] text-ink md:text-5xl",
					children: "Six values, one standard."
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "grid grid-cols-2 gap-5 md:grid-cols-3",
				initial: reduce ? "shown" : "hidden",
				whileInView: "shown",
				viewport: {
					once: true,
					amount: .2
				},
				variants: {
					hidden: {},
					shown: { transition: { staggerChildren: .08 } }
				},
				children: [
					{
						name: "Integrity",
						desc: "Every project handled with honesty, transparency and ethical practice."
					},
					{
						name: "Excellence",
						desc: "Superior workmanship, attention to detail and continuous improvement."
					},
					{
						name: "Innovation",
						desc: "Modern technology, creative thinking and efficient construction methods."
					},
					{
						name: "Customer commitment",
						desc: "Clients stay at the centre of every decision we make."
					},
					{
						name: "Teamwork",
						desc: "Collaboration and mutual respect that produce exceptional results."
					},
					{
						name: "Sustainability",
						desc: "Responsible construction that adds long-term environmental and economic value."
					}
				].map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: "surface-card p-7",
					variants: {
						hidden: {
							opacity: 0,
							y: 24,
							filter: "blur(10px)"
						},
						shown: {
							opacity: 1,
							y: 0,
							filter: "blur(0px)",
							transition: {
								duration: .6,
								ease: [
									.16,
									1,
									.3,
									1
								]
							}
						}
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-5 font-display text-sm font-medium tabular-nums text-ink-soft",
							children: String(i + 1).padStart(2, "0")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-xl font-semibold text-ink",
							children: v.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-ink-dim",
							children: v.desc
						})
					]
				}, v.name))
			})]
		})
	});
}
var leaders = [
	{
		name: "Fida-ur-Rehman",
		role: "Chief Executive Officer",
		img: leader_2_default,
		desc: "Provides strategic leadership and oversees business growth, project execution, corporate planning, and organizational development."
	},
	{
		name: "Ehsan Frazi",
		role: "Principal Architect",
		img: leader_3_default,
		desc: "Heads the architectural and design department, leading concept development and engineering coordination."
	},
	{
		name: "Atiq-ur-Rehman",
		role: "Construction Head",
		img: leader_1_default,
		desc: "Supervises all on-site operations, ensuring projects meet the highest standards of quality, safety, and efficiency."
	}
];
function Leadership() {
	const reduce = useReducedMotion();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "leadership",
		className: "relative bg-bg px-6 py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-14 max-w-2xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl font-semibold leading-[1.05] text-ink md:text-5xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevealHeading, { lines: [{ text: "The team behind" }, {
						text: "every project.",
						dim: true
					}] })
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "grid gap-8 sm:grid-cols-2 lg:grid-cols-3",
				initial: reduce ? "shown" : "hidden",
				whileInView: "shown",
				viewport: {
					once: true,
					amount: .2
				},
				variants: {
					hidden: {},
					shown: { transition: { staggerChildren: .12 } }
				},
				children: leaders.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.figure, {
					className: "surface-card group flex flex-col overflow-hidden",
					variants: {
						hidden: {
							opacity: 0,
							y: 24,
							filter: "blur(10px)"
						},
						shown: {
							opacity: 1,
							y: 0,
							filter: "blur(0px)",
							transition: {
								duration: .6,
								ease: [
									.16,
									1,
									.3,
									1
								]
							}
						}
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative aspect-[4/5] w-full overflow-hidden bg-bg-elev",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: m.img,
							alt: `${m.name}, ${m.role} at Al Bakir`,
							className: "h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
						className: "p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-orange",
								children: m.role
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-xl font-semibold text-ink",
								children: m.name
							}),
							m.desc && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-relaxed text-ink-dim",
								children: m.desc
							})
						]
					})]
				}, m.name))
			})]
		})
	});
}
function WhyChooseApproach() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative bg-bg px-6 py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl gap-16 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fade-up",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-green",
						children: "Why Al Bakir"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-4xl font-semibold leading-[1.05] text-ink md:text-5xl",
						children: [
							"Ten reasons clients",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"stay with us."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2",
						children: [
							"Complete design-to-construction solutions",
							"Experienced architects & engineers",
							"Professional project management",
							"Transparent business practices",
							"Premium construction quality",
							"Innovative design solutions",
							"Timely project delivery",
							"Strong customer relationships",
							"Competitive pricing",
							"Dedicated after-sales support"
						].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								className: "mt-1 h-4 w-4 flex-shrink-0 text-green",
								viewBox: "0 0 20 20",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2.2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M4 10l4 4 8-9",
									strokeLinecap: "round",
									strokeLinejoin: "round"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm leading-relaxed text-ink",
								children: r
							})]
						}, r))
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fade-up",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "font-display text-4xl font-semibold leading-[1.05] text-ink md:text-5xl",
					children: [
						"Five steps,",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"sketch to keys."
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-10 space-y-6",
					children: [
						{
							title: "Consultation",
							desc: "Understanding client requirements, objectives and project vision."
						},
						{
							title: "Planning",
							desc: "Feasibility analysis, budgeting, scheduling and project planning."
						},
						{
							title: "Design",
							desc: "Architectural, engineering and interior design development."
						},
						{
							title: "Construction",
							desc: "Professional execution with strict quality control and safety."
						},
						{
							title: "Delivery",
							desc: "Timely project completion with comprehensive client support."
						}
					].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start gap-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-ink font-display text-sm font-semibold text-white tabular-nums",
							children: String(i + 1).padStart(2, "0")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-lg font-semibold text-ink",
							children: s.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-sm leading-relaxed text-ink-dim",
							children: s.desc
						})] })]
					}, s.title))
				})]
			})]
		})
	});
}
function RatingMarquee() {
	const items = [
		"4.8 / 5 on Google",
		"Open 24 hours, except Friday",
		"B-17 Islamabad",
		"Since 2012"
	];
	const dotColors = [
		"bg-blue",
		"bg-green",
		"bg-ink",
		"bg-blue"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative bg-bg-elev py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marquee, {
			speed: 28,
			children: items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-10 font-display text-3xl font-medium text-ink md:text-4xl",
				children: [it, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-2 w-2 rotate-45 ${dotColors[i % dotColors.length]}` })]
			}, it))
		})
	});
}
function EmapVerification() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative bg-bg-elev px-6 py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-7xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fade-up surface-card-elev mx-auto max-w-3xl p-10 text-center md:p-14",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-green/10 text-green",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							className: "h-6 w-6",
							viewBox: "0 0 20 20",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M4 10l4 4 8-9",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl font-semibold leading-[1.1] text-ink md:text-5xl",
						children: "Verified on eMap.pk."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-5 max-w-[52ch] text-base leading-relaxed text-ink-dim",
						children: "Al Bakir holds an exclusive eMap.pk subscription. We are the only agency authorized to publish verified listings for these societies."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 flex flex-wrap items-center justify-center gap-3",
						children: [
							"Faisal Hills",
							"Multi Gardens B-17",
							"Faisal Margalla City (FMC)"
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2 rounded-full border border-black/10 bg-bg px-4 py-2 text-sm font-medium text-ink",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								className: "h-3.5 w-3.5 flex-shrink-0 text-green",
								viewBox: "0 0 20 20",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2.4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M4 10l4 4 8-9",
									strokeLinecap: "round",
									strokeLinejoin: "round"
								})
							}), s]
						}, s))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-8 max-w-[48ch] text-sm leading-relaxed text-ink-dim",
						children: "List with Al Bakir and your property reaches buyers already using eMap to research these exact locations."
					})
				]
			})
		})
	});
}
function InvestorOpportunities() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative bg-bg px-6 py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-7xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fade-up surface-card-elev p-10 md:p-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-4xl font-semibold leading-[1.05] text-ink md:text-5xl",
						children: "Investor opportunities."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-[65ch] text-base leading-relaxed text-ink-dim",
						children: "We welcome partnerships with investors, developers, financial institutions and corporate organisations seeking reliable opportunities in Pakistan's growing construction and real estate sectors."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2",
					children: [
						"Transparent reporting & disciplined governance",
						"Rigorous, milestone-driven project management",
						"Quality execution with a referral-led track record",
						"Residential, commercial & mixed-use opportunities"
					].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							className: "mt-1 h-5 w-5 flex-shrink-0 text-blue-bright",
							viewBox: "0 0 20 20",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M4 10l4 4 8-9",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-base leading-relaxed text-ink",
							children: p
						})]
					}, p))
				})]
			})
		})
	});
}
var socials = [
	{
		name: "Facebook",
		href: "https://www.facebook.com/p/Al-Bakir-pvtltd-100075875230679/",
		path: "M13 22v-8h3l1-4h-4V7.5c0-1.1.4-2 2-2h2V2h-3c-3 0-5 1.8-5 5v3H6v4h3v8h4z"
	},
	{
		name: "Instagram",
		href: "https://www.instagram.com/al_bakir_pvt_ltd/",
		path: "M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm5 5a4 4 0 100 8 4 4 0 000-8zm5-1.5a1 1 0 100 2 1 1 0 000-2z"
	},
	{
		name: "YouTube",
		href: "https://www.youtube.com/@al-bakirstudio?app=desktop",
		path: "M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 002.4 7.2 26 26 0 002 12a26 26 0 00.4 4.8 2.5 2.5 0 001.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 001.8-1.8A26 26 0 0022 12a26 26 0 00-.4-4.8zM10 15V9l5 3-5 3z"
	},
	{
		name: "TikTok",
		href: "https://www.tiktok.com/@albakirpvtltd",
		path: "M16 3c.4 2.2 1.8 3.9 4 4.3v3c-1.6 0-3-.4-4.3-1.2v6.4a5.5 5.5 0 11-5.5-5.5c.3 0 .6 0 .9.1v3.1a2.5 2.5 0 102 2.4V3h2.9z"
	},
	{
		name: "Zameen.com",
		href: "https://www.zameen.com/agents/Islamabad/AL-Bakir-pvt-ltd-196777/",
		fillRule: "evenodd",
		path: "M12 2 L22 11 L19 11 L19 22 L5 22 L5 11 L2 11 Z M8 11.5 H16 V12.75 L10.67 18.25 H16 V19.5 H8 V18.25 L13.33 12.75 H8 Z"
	}
];
var FORMSPREE_ENDPOINT = "https://formspree.io/f/mlgyzwdn";
function Contact() {
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		phone: "",
		email: "",
		projectType: "Architecture",
		message: ""
	});
	const handleSubmit = async (e) => {
		e.preventDefault();
		setStatus("sending");
		try {
			const res = await fetch(FORMSPREE_ENDPOINT, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					name: form.name,
					phone: form.phone,
					email: form.email,
					projectType: form.projectType,
					message: form.message
				})
			});
			setStatus(res.ok ? "sent" : "error");
		} catch {
			setStatus("error");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "contact",
		className: "relative bg-bg-elev px-6 py-28 md:py-36",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-16 max-w-2xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl font-semibold leading-[1.05] text-ink md:text-6xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevealHeading, { lines: [{ text: "Start your project." }] })
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-10 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "fade-up space-y-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-dim",
							children: "Head office"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-lg text-ink",
							children: "Multi Gardens B-17, Islamabad"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-dim",
								children: "Phone"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "tel:+92512765184",
								className: "block py-1 text-lg text-ink transition-colors hover:text-blue-bright",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mr-3 text-xs text-ink-dim",
									children: "Landline"
								}), "051 2765184"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "tel:+923347402123",
								className: "block py-1 text-lg text-ink transition-colors hover:text-blue-bright",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mr-3 text-xs text-ink-dim",
									children: "Primary"
								}), "+92 334 7402123"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "tel:+923335116302",
								className: "block py-1 text-lg text-ink transition-colors hover:text-blue-bright",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mr-3 text-xs text-ink-dim",
									children: "Secondary"
								}), "+92 333 5116302"]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-dim",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "mailto:Bakirassociates@gmail.com",
							className: "block text-lg text-ink transition-colors hover:text-blue-bright",
							children: "Bakirassociates@gmail.com"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-dim",
							children: "Follow"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-3",
							children: socials.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: s.href,
								"aria-label": s.name,
								target: "_blank",
								rel: "noopener",
								className: "glass-light flex h-10 w-10 items-center justify-center rounded-full text-ink hover:-translate-y-0.5 hover:text-blue-bright",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									viewBox: "0 0 24 24",
									className: "h-4 w-4",
									fill: "currentColor",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: s.path,
										fillRule: s.fillRule
									})
								})
							}, s.name))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-dim",
							children: "Hours"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "surface-card overflow-hidden",
							children: [
								{
									day: "Monday",
									hours: "Open 24 hours"
								},
								{
									day: "Tuesday",
									hours: "Open 24 hours"
								},
								{
									day: "Wednesday",
									hours: "Open 24 hours"
								},
								{
									day: "Thursday",
									hours: "Open 24 hours"
								},
								{
									day: "Friday",
									hours: "Closed"
								},
								{
									day: "Saturday",
									hours: "Open 24 hours"
								},
								{
									day: "Sunday",
									hours: "Open 24 hours"
								}
							].map(({ day, hours }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-black/5 px-5 py-2.5 last:border-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-ink-dim",
									children: day
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `text-sm font-medium ${hours === "Closed" ? "text-orange" : "text-green"}`,
									children: hours
								})]
							}, day))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, {
							as: "a",
							href: "https://maps.google.com/?q=Al+Bakir+Pvt+Ltd+B-17+Islamabad",
							target: "_blank",
							rel: "noopener",
							className: "btn-primary",
							children: "Open in Google Maps"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
					onSubmit: handleSubmit,
					className: "fade-up space-y-5 surface-card p-8",
					children: status === "sent" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-h-[480px] flex-col items-center justify-center text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								viewBox: "0 0 64 64",
								className: "mb-6 h-20 w-20 text-green",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "32",
									cy: "32",
									r: "28",
									strokeDasharray: "180",
									strokeDashoffset: "0",
									style: { animation: "draw 0.7s ease forwards" }
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M20 33l8 8 16-18",
									strokeLinecap: "round",
									strokeLinejoin: "round"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mb-2 font-display text-3xl font-semibold text-ink",
								children: "Enquiry received"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-ink-dim",
								children: [
									"Thanks, ",
									form.name.split(" ")[0],
									". We will be in touch within 24 hours."
								]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						[
							{
								name: "name",
								label: "Name",
								type: "text"
							},
							{
								name: "phone",
								label: "Phone",
								type: "tel"
							},
							{
								name: "email",
								label: "Email",
								type: "email"
							}
						].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: `contact-${f.name}`,
							className: "mb-2 block text-xs font-medium text-ink-dim",
							children: f.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							id: `contact-${f.name}`,
							type: f.type,
							name: f.name,
							value: form[f.name],
							onChange: (e) => setForm((prev) => ({
								...prev,
								[f.name]: e.target.value
							})),
							className: "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-blue-bright focus:ring-2 focus:ring-blue/20"
						})] }, f.name)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "contact-project-type",
							className: "mb-2 block text-xs font-medium text-ink-dim",
							children: "Project type"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							required: true,
							id: "contact-project-type",
							value: form.projectType,
							onChange: (e) => setForm((prev) => ({
								...prev,
								projectType: e.target.value
							})),
							className: "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-ink outline-none focus:border-blue-bright focus:ring-2 focus:ring-blue/20",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Architecture" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Construction" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Real Estate" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Other" })
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "contact-message",
							className: "mb-2 block text-xs font-medium text-ink-dim",
							children: "Message"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							required: true,
							id: "contact-message",
							rows: 5,
							value: form.message,
							onChange: (e) => setForm((prev) => ({
								...prev,
								message: e.target.value
							})),
							className: "w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-ink outline-none focus:border-blue-bright focus:ring-2 focus:ring-blue/20"
						})] }),
						status === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-orange",
							children: [
								"Something went wrong sending your enquiry. Please try again, or email us directly at",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "mailto:Bakirassociates@gmail.com",
									className: "underline",
									children: "Bakirassociates@gmail.com"
								}),
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, {
							as: "button",
							type: "submit",
							disabled: status === "sending",
							className: "btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60",
							children: status === "sending" ? "Sending…" : "Send Enquiry"
						})
					] })
				})]
			})]
		})
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "relative border-t border-black/10 bg-bg px-6 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl gap-10 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: logo_mark_default,
							alt: "",
							className: "h-10 w-16 object-contain"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-base font-semibold text-ink",
							children: "Al Bakir"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] tracking-[0.2em] text-ink-soft",
							children: "PVT · LTD"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xs text-sm text-ink-dim",
						children: "Where dreams become true. Architecture, construction and real estate based in Islamabad."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 flex items-center gap-2",
						children: socials.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: s.href,
							"aria-label": s.name,
							target: "_blank",
							rel: "noopener",
							className: "glass-light flex h-9 w-9 items-center justify-center rounded-full text-ink-dim hover:-translate-y-0.5 hover:text-blue-bright",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								viewBox: "0 0 24 24",
								className: "h-3.5 w-3.5",
								fill: "currentColor",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: s.path,
									fillRule: s.fillRule
								})
							})
						}, s.name))
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-dim",
					children: "Quick links"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-2 text-sm text-ink",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#services",
							className: "hover:text-blue-bright",
							children: "Services"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#values",
							className: "hover:text-blue-bright",
							children: "Values"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#about",
							className: "hover:text-blue-bright",
							children: "About"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#contact",
							className: "hover:text-blue-bright",
							children: "Contact"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-dim",
					children: "Contact"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-2 text-sm text-ink",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "tel:+92512765184",
							className: "hover:text-blue-bright",
							children: "051 2765184"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "tel:+923347402123",
							className: "hover:text-blue-bright",
							children: "+92 334 7402123"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "tel:+923335116302",
							className: "hover:text-blue-bright",
							children: "+92 333 5116302"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "mailto:Bakirassociates@gmail.com",
							className: "hover:text-blue-bright",
							children: "Bakirassociates@gmail.com"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-ink-dim",
							children: "Head office, Multi Gardens B-17, Islamabad"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-ink-dim",
							children: "Open 24 hours daily"
						})
					]
				})] })
			]
		})
	});
}
function Index() {
	useReveal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: translateY(0);} }
        @keyframes draw { from { stroke-dashoffset: 180; } to { stroke-dashoffset: 0; } }
      ` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackgroundCanvas, { logoSrc: logo_default }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollVideoHero, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustStrip, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bento, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConstructionServices, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RealEstateServices, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stats, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(About, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisionMission, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoreValues, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leadership, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhyChooseApproach, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingMarquee, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmapVerification, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvestorOpportunities, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contact, {})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { Index as component };
