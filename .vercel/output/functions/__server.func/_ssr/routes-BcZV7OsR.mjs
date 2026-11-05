import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Search } from "../_libs/lucide-react.mjs";
import { _ as useHydratedLang, h as ui, l as cn, m as t, o as categories, p as products, r as Route$2 } from "./router-DwUEE1jl.mjs";
import { t as Button } from "./button-DKyrl4X8.mjs";
import { n as ProductCard } from "./product-card-DA31sThW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BcZV7OsR.js
var import_jsx_runtime = require_jsx_runtime();
function CatalogBrowser({ cat, q, vue, onChange }) {
	const lang = useHydratedLang();
	const copy = ui[lang];
	const query = q.trim().toLowerCase();
	const visible = products.filter((product) => {
		if (cat !== "tous" && product.category !== cat) return false;
		if (!query) return true;
		const category = categories.find((item) => item.id === product.category);
		const hay = [
			product.name,
			product.sku,
			product.blurb.fr,
			product.blurb.zh,
			category ? category.label.fr : "",
			category ? category.label.zh : ""
		].join(" ").toLowerCase();
		return query.split(/\s+/).every((word) => hay.includes(word));
	});
	const filters = [{
		id: "tous",
		label: copy.filterAll
	}, ...categories.map((item) => ({
		id: item.id,
		label: t(lang, item.label)
	}))];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "catalogue",
		className: "mx-auto max-w-6xl px-4 py-10 sm:py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl",
					children: copy.catalogTitle
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-11 border border-line",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: cn("px-3 text-sm", vue === "grille" ? "bg-fg text-bg" : "text-muted"),
						onClick: () => onChange({ vue: "grille" }),
						children: copy.viewGrid
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: cn("px-3 text-sm", vue === "liste" ? "bg-fg text-bg" : "text-muted"),
						onClick: () => onChange({ vue: "liste" }),
						children: copy.viewList
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 flex gap-2 overflow-x-auto scroll-clean",
				children: filters.map((filter) => {
					const active = filter.id === cat;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => onChange({ cat: filter.id }),
						className: cn("h-11 shrink-0 border-b-2 px-3 text-sm", active ? "border-primary text-fg" : "border-transparent text-muted"),
						children: filter.label
					}, filter.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "catalog-q",
						className: "sr-only",
						children: copy.searchLabel
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "catalog-q",
						value: q,
						onChange: (event) => onChange({ q: event.target.value }),
						placeholder: copy.searchPlaceholder,
						className: "h-11 w-full border border-line bg-surface pr-3 pl-10 text-base outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
					})
				]
			}),
			visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-muted",
				children: copy.emptyCatalog
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("mt-6 grid gap-3", vue === "grille" ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"),
				children: visible.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
					product,
					layout: vue === "liste" ? "row" : "tile"
				}, product.slug))
			})
		]
	});
}
function Home() {
	const search = Route$2.useSearch();
	const navigate = Route$2.useNavigate();
	const lang = useHydratedLang();
	const copy = ui[lang];
	function setSearch(next) {
		navigate({
			search: {
				...search,
				...next
			},
			resetScroll: false
		});
	}
	function openCategory(cat) {
		setSearch({ cat });
		document.getElementById("catalogue")?.scrollIntoView({ block: "start" });
	}
	const stats = [
		{
			value: copy.statMoqValue,
			label: copy.statMoqLabel
		},
		{
			value: copy.statCityValue,
			label: copy.statCityLabel
		},
		{
			value: copy.statMinValue,
			label: copy.statMinLabel
		}
	];
	const steps = [
		{
			n: "01",
			title: copy.step1t,
			body: copy.step1b
		},
		{
			n: "02",
			title: copy.step2t,
			body: copy.step2b
		},
		{
			n: "03",
			title: copy.step3t,
			body: copy.step3b
		}
	];
	const terms = [
		copy.term1,
		copy.term2,
		copy.term3,
		copy.term4
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-6xl items-end gap-8 px-4 pt-8 sm:pt-14 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: cn("flex items-center gap-3 text-xs text-muted", lang === "fr" && "tracking-widest uppercase"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-primary" }), copy.eyebrow]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 font-display text-4xl leading-none sm:text-6xl",
					children: copy.heroTitle
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-md text-base text-muted",
					children: copy.heroLead
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						onClick: () => openCategory("tous"),
						children: copy.ctaCatalog
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/devis",
							children: copy.ctaQuote
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "mt-8 grid grid-cols-3 border-t border-line",
					children: stats.map((stat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-4 pr-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "font-display text-lg tabular-nums sm:text-2xl",
							children: stat.value
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 text-xs text-muted",
							children: stat.label
						})]
					}, stat.label))
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/catalog/hero.jpg",
				alt: copy.heroAlt,
				className: "aspect-video w-full object-cover"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
				className: "mt-2 text-xs text-muted",
				children: copy.thisWeek
			})] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 pt-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl",
				children: copy.familiesTitle
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4",
				children: categories.map((category) => {
					const count = products.filter((product) => product.category === category.id).length;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => openCategory(category.id),
						className: "text-left",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: category.image,
								alt: t(lang, category.label),
								className: "aspect-square w-full object-cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-display text-xl",
								children: t(lang, category.label)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: [
									count,
									" ",
									copy.countLabel
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: t(lang, category.line)
							})
						]
					}, category.id);
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CatalogBrowser, {
			cat: search.cat,
			q: search.q,
			vue: search.vue,
			onChange: setSearch
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl",
					children: copy.howTitle
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-6 grid gap-5",
					children: steps.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid grid-cols-[3rem_1fr] gap-3 border-t border-line pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-lg text-primary",
							children: step.n
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: step.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: step.body
						})] })]
					}, step.n))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl",
						children: copy.zoneTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 border-t border-line pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: copy.zoneConakryT
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: copy.zoneConakryB
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 border-t border-line pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: copy.zoneInteriorT
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: copy.zoneInteriorB
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-10 font-display text-3xl",
						children: copy.termsTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 grid gap-3",
						children: terms.map((term) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "border-t border-line pt-3 text-sm text-muted",
							children: term
						}, term))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted",
						children: copy.mixNote
					})
				] })]
			})
		})
	] });
}
//#endregion
export { Home as component };
