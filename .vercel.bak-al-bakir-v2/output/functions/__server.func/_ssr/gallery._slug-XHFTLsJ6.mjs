import { A as notFound, f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gallery._slug-XHFTLsJ6.js
var DISCIPLINES = {
	"architecture-design": {
		title: "Architecture & Design",
		desc: "Bespoke residential and commercial design rooted in context, climate and craft.",
		accent: "text-blue-bright"
	},
	construction: {
		title: "Construction",
		desc: "End to end build delivery with disciplined timelines and material integrity.",
		accent: "text-orange"
	},
	"real-estate": {
		title: "Real Estate",
		desc: "Curated property opportunities across B-17 Islamabad and surrounding sectors.",
		accent: "text-green"
	}
};
var $$splitComponentImporter = () => import("./gallery._slug-DyzQSE0E.mjs");
var Route = createFileRoute("/gallery/$slug")({
	head: ({ params }) => {
		const d = DISCIPLINES[params.slug];
		const title = d ? `${d.title}, Gallery | Al Bakir` : "Gallery | Al Bakir";
		const description = d?.desc ?? "Project gallery.";
		return { meta: [
			{ title },
			{
				name: "description",
				content: description
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: description
			}
		] };
	},
	beforeLoad: ({ params }) => {
		if (!DISCIPLINES[params.slug]) throw notFound();
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as n, DISCIPLINES as t };
