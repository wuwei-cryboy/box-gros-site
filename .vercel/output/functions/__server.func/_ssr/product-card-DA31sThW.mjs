import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as useHydratedLang, d as formatUsd, g as unitUsd, h as ui, l as cn, m as t, s as categoryById, v as useQuote, y as useStoresReady } from "./router-DwUEE1jl.mjs";
import { t as Button } from "./button-DKyrl4X8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product-card-DA31sThW.js
var import_jsx_runtime = require_jsx_runtime();
function CatalogPhoto({ src, alt, frame = true }) {
	if (!frame) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt,
		className: "h-full w-full object-cover"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative aspect-square overflow-hidden bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt: "",
			"aria-hidden": true,
			className: "absolute inset-0 h-full w-full scale-110 object-cover blur-2xl"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt,
			className: cn("relative h-full w-full object-contain")
		})]
	});
}
function ProductCard({ product, layout }) {
	const lang = useHydratedLang();
	const copy = ui[lang];
	const ready = useStoresReady();
	const line = useQuote((state) => state.lines.find((item) => item.slug === product.slug));
	const add = useQuote((state) => state.add);
	const category = categoryById(product.category);
	const price = unitUsd(product, product.moq);
	const row = layout === "row";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("border border-line bg-surface", row ? "flex gap-3 p-3" : "flex flex-col"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/produit/$slug",
			params: { slug: product.slug },
			className: cn("block shrink-0", row ? "w-24" : ""),
			children: row ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: product.image,
				alt: product.name,
				className: "aspect-square w-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CatalogPhoto, {
				src: product.image,
				alt: product.name
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("flex min-w-0 flex-1 flex-col", row ? "" : "gap-1 p-4"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("text-xs text-muted", lang === "fr" && "tracking-widest uppercase"),
					children: t(lang, category.label)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/produit/$slug",
					params: { slug: product.slug },
					className: "mt-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl leading-tight",
						children: product.name
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: t(lang, product.blurb)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 font-display text-2xl tabular-nums text-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mr-2 text-sm text-muted",
						children: copy.from
					}), formatUsd(price, lang)]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto flex items-end justify-between gap-3 pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted tabular-nums",
						children: [
							copy.moqShort,
							" ",
							product.moq,
							line ? ` · × ${line.qty}` : ""
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: line ? "outline" : "primary",
						disabled: !ready,
						onClick: () => {
							if (!line) add(product.slug, product.moq);
							else add(product.slug, line.qty + product.carton);
						},
						children: line ? copy.addMore : copy.add
					})]
				})
			]
		})]
	});
}
//#endregion
export { ProductCard as n, CatalogPhoto as t };
