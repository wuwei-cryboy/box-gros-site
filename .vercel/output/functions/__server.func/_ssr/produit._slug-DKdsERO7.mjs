import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Minus, r as Plus } from "../_libs/lucide-react.mjs";
import { _ as useHydratedLang, d as formatUsd, f as getProduct, g as unitUsd, h as ui, l as cn, m as t, n as Route, p as products, s as categoryById, u as formatGnfFromUsd, v as useQuote, y as useStoresReady } from "./router-DwUEE1jl.mjs";
import { t as Button } from "./button-DKyrl4X8.mjs";
import { n as ProductCard, t as CatalogPhoto } from "./product-card-DA31sThW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/produit._slug-DKdsERO7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductPage() {
	const { slug } = Route.useParams();
	const product = getProduct(slug);
	const lang = useHydratedLang();
	const copy = ui[lang];
	const ready = useStoresReady();
	const line = useQuote((state) => state.lines.find((item) => item.slug === slug));
	const add = useQuote((state) => state.add);
	const [qty, setQty] = (0, import_react.useState)(product?.moq ?? 1);
	const [text, setText] = (0, import_react.useState)(String(product?.moq ?? 1));
	const [added, setAdded] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!product) return;
		const next = ready && line ? line.qty : product.moq;
		setQty(next);
		setText(String(next));
	}, [
		slug,
		ready,
		line?.qty,
		product,
		line
	]);
	(0, import_react.useEffect)(() => {
		if (!added) return;
		const id = window.setTimeout(() => setAdded(false), 1600);
		return () => window.clearTimeout(id);
	}, [added]);
	if (!product) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: copy.missing }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			search: {
				cat: "tous",
				q: "",
				vue: "grille"
			},
			className: "mt-4 inline-flex h-11 items-center text-sm",
			children: copy.back
		})]
	});
	const category = categoryById(product.category);
	const unit = unitUsd(product, qty);
	const related = products.filter((item) => item.category === product.category && item.slug !== product.slug);
	function commit(next) {
		const clamped = Math.max(product.moq, Math.floor(next));
		setQty(clamped);
		setText(String(clamped));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-6 sm:py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				search: {
					cat: product.category,
					q: "",
					vue: "grille"
				},
				className: "inline-flex h-11 items-center text-sm text-muted",
				children: copy.back
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 grid gap-8 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CatalogPhoto, {
					src: product.image,
					alt: product.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: cn("text-xs text-muted", lang === "fr" && "tracking-widest uppercase"),
						children: [
							t(lang, category.label),
							" · ",
							product.sku
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl leading-none sm:text-5xl",
						children: product.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-muted",
						children: t(lang, product.story)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm",
						children: t(lang, product.stockLabel)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 font-display text-4xl tabular-nums text-primary",
						children: formatUsd(unit, lang)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted tabular-nums",
						children: [
							copy.about,
							" ",
							formatGnfFromUsd(unit, lang),
							" ",
							copy.perPiece
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 border border-line",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 px-3 py-2 text-xs text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copy.qtyCol }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-right",
								children: copy.priceCol
							})]
						}), product.tiers.map((tier) => {
							const active = unit === tier.usd;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("grid grid-cols-2 border-t border-line px-3 py-2 text-sm tabular-nums", active && "bg-fg/5"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									tier.min,
									"+ ",
									copy.pieces
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-right",
									children: formatUsd(tier.usd, lang)
								})]
							}, tier.min);
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center border border-line bg-surface",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "inline-flex size-11 items-center justify-center",
									"aria-label": copy.decrease,
									onClick: () => commit(qty - 1),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									inputMode: "numeric",
									"aria-label": copy.qty,
									value: text,
									onChange: (event) => setText(event.target.value.replace(/[^\d]/g, "")),
									onBlur: () => commit(Number(text)),
									className: "w-16 bg-transparent text-center text-base tabular-nums outline-none"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "inline-flex size-11 items-center justify-center",
									"aria-label": copy.increase,
									onClick: () => commit(qty + 1),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							disabled: !ready,
							onClick: () => {
								add(product.slug, qty);
								setAdded(true);
							},
							children: added ? copy.added : copy.addToQuote
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm text-muted",
						children: [
							copy.moqShort,
							" ",
							product.moq,
							" · ",
							copy.cartonOf,
							" ",
							product.carton
						]
					}),
					product.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: t(lang, product.note)
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-8 font-display text-2xl",
						children: copy.specs
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "mt-3",
						children: product.specs.map((spec) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3 border-t border-line py-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: t(lang, spec.label)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-right",
								children: t(lang, spec.value)
							})]
						}, spec.label.fr))
					})
				] })]
			}),
			related.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: copy.related
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid gap-3 sm:grid-cols-2",
					children: related.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
						product: item,
						layout: "row"
					}, item.slug))
				})]
			}) : null
		]
	});
}
//#endregion
export { ProductPage as component };
