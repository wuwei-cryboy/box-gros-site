import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Minus, r as Plus } from "../_libs/lucide-react.mjs";
import { _ as useHydratedLang, a as USD_TO_GNF, c as cities, d as formatUsd, f as getProduct, g as unitUsd, h as ui, i as useConfirmClear, m as t, u as formatGnfFromUsd, v as useQuote, y as useStoresReady } from "./router-DwUEE1jl.mjs";
import { t as Button } from "./button-DKyrl4X8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/devis-ha_uml7r.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function buildQuoteMessage(input) {
	const { lang, lines, boutique, cityId, tel, note } = input;
	const city = cities.find((item) => item.id === cityId);
	const cityLabel = city ? t(lang, city.label) : cityId;
	const rows = lines.map((line) => {
		const unit = unitUsd(line.product, line.qty);
		const total = unit * line.qty;
		return `- ${line.product.name} (${line.product.sku}) × ${line.qty} — ${formatUsd(unit, lang)} — ${formatUsd(total, lang)}`;
	});
	const grand = lines.reduce((sum, line) => sum + unitUsd(line.product, line.qty) * line.qty, 0);
	const noteLine = note.trim();
	if (lang === "zh") return [
		"你好，Kaloum Gros，",
		"询价。",
		`店铺：${boutique.trim()}`,
		`城市：${cityLabel}`,
		`电话：${tel.trim()}`,
		"",
		"明细：",
		...rows,
		"",
		`参考合计：${formatUsd(grand, lang)}`,
		`约 ${formatGnfFromUsd(grand, lang)}（展厅汇率 1 USD = ${USD_TO_GNF.toLocaleString("zh-CN")} GNF，不作结算承诺）。`,
		noteLine ? "" : null,
		noteLine ? `备注：${noteLine}` : null
	].filter((line) => line !== null).join("\n");
	return [
		"Bonjour Kaloum Gros,",
		"Demande de devis.",
		`Boutique : ${boutique.trim()}`,
		`Ville : ${cityLabel}`,
		`Téléphone : ${tel.trim()}`,
		"",
		"Références :",
		...rows,
		"",
		`Total indicatif : ${formatUsd(grand, lang)}`,
		`Soit environ ${formatGnfFromUsd(grand, lang)} (taux showroom 1 USD = ${USD_TO_GNF.toLocaleString("fr-FR")} GNF, non contractuel).`,
		noteLine ? "" : null,
		noteLine ? `Note : ${noteLine}` : null
	].filter((line) => line !== null).join("\n");
}
function waHref(message) {
	return `https://wa.me/224622184055?text=${encodeURIComponent(message)}`;
}
function DevisPage() {
	const lang = useHydratedLang();
	const copy = ui[lang];
	const ready = useStoresReady();
	const lines = useQuote((state) => state.lines);
	const setQty = useQuote((state) => state.setQty);
	const remove = useQuote((state) => state.remove);
	const clear = useQuote((state) => state.clear);
	const { armed, setArmed } = useConfirmClear();
	const [boutique, setBoutique] = (0, import_react.useState)("");
	const [cityId, setCityId] = (0, import_react.useState)(cities[0]?.id ?? "kaloum");
	const [tel, setTel] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	const [sig, setSig] = (0, import_react.useState)("");
	const [copied, setCopied] = (0, import_react.useState)(false);
	const resolved = (0, import_react.useMemo)(() => lines.flatMap((line) => {
		const product = getProduct(line.slug);
		if (!product) return [];
		const unit = unitUsd(product, line.qty);
		return [{
			...line,
			product,
			unit,
			total: unit * line.qty
		}];
	}), [lines]);
	const grand = resolved.reduce((sum, line) => sum + line.total, 0);
	const signature = JSON.stringify({
		lines: resolved.map((line) => [line.slug, line.qty]),
		boutique,
		cityId,
		tel,
		note,
		lang
	});
	const stale = message.length > 0 && sig !== signature;
	function prepare() {
		if (!boutique.trim() || !tel.trim()) {
			setError(copy.required);
			return;
		}
		if (tel.replace(/\D/g, "").length < 8) {
			setError(copy.badPhone);
			return;
		}
		setError("");
		const next = buildQuoteMessage({
			lang,
			lines: resolved.map((line) => ({
				product: line.product,
				qty: line.qty
			})),
			boutique,
			cityId,
			tel,
			note
		});
		setMessage(next);
		setSig(signature);
		setCopied(false);
	}
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { className: "mx-auto max-w-3xl px-4 py-10" });
	if (resolved.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl",
				children: copy.quoteTitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: copy.emptyQuote
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					search: {
						cat: "tous",
						q: "",
						vue: "grille"
					},
					children: copy.emptyQuoteCta
				})
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-8 sm:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl",
				children: copy.quoteTitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: copy.quoteLead
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-8 grid gap-3",
				children: resolved.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid grid-cols-[4.5rem_1fr] gap-3 border border-line bg-surface p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: line.product.image,
						alt: "",
						className: "aspect-square w-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-xl leading-tight",
									children: line.product.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: line.product.sku
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "h-11 text-sm text-muted",
									onClick: () => remove(line.slug),
									children: copy.remove
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm tabular-nums text-muted",
								children: [
									formatUsd(line.unit, lang),
									" ",
									copy.perPiece
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center border border-line",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "inline-flex size-11 items-center justify-center",
											"aria-label": copy.decrease,
											onClick: () => {
												if (line.qty - 1 < line.product.moq) remove(line.slug);
												else setQty(line.slug, line.qty - 1);
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-12 text-center text-base tabular-nums",
											children: line.qty
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "inline-flex size-11 items-center justify-center",
											"aria-label": copy.increase,
											onClick: () => setQty(line.slug, line.qty + 1),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-xl tabular-nums",
									children: formatUsd(line.total, lang)
								})]
							})
						]
					})]
				}, line.slug))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex items-end justify-between gap-3 border-t border-line pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: copy.subtotal
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl tabular-nums text-primary",
						children: formatUsd(grand, lang)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted tabular-nums",
						children: [
							copy.about,
							" ",
							formatGnfFromUsd(grand, lang)
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-11 text-sm text-muted",
					onClick: () => {
						if (!armed) {
							setArmed(true);
							return;
						}
						clear();
						setArmed(false);
						setMessage("");
					},
					children: armed ? copy.confirmClear : copy.clear
				})]
			}),
			grand < 500 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-primary",
				children: copy.underMin
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: copy.mixNote
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-8 grid gap-4",
				onSubmit: (event) => {
					event.preventDefault();
					prepare();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm",
						children: [copy.boutique, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: boutique,
							onChange: (event) => setBoutique(event.target.value),
							required: true,
							className: "h-11 border border-line bg-surface px-3 text-base outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm",
						children: [copy.city, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: cityId,
							onChange: (event) => setCityId(event.target.value),
							className: "h-11 border border-line bg-surface px-3 text-base outline-none",
							children: cities.map((city) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: city.id,
								children: t(lang, city.label)
							}, city.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm",
						children: [copy.phone, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: tel,
							onChange: (event) => setTel(event.target.value),
							inputMode: "tel",
							autoComplete: "tel",
							required: true,
							className: "h-11 border border-line bg-surface px-3 text-base outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm",
						children: [copy.note, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: note,
							onChange: (event) => setNote(event.target.value),
							placeholder: copy.notePlaceholder,
							rows: 3,
							className: "border border-line bg-surface px-3 py-2 text-base outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
						})]
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-primary",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						children: copy.prepare
					})
				]
			}),
			message ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: copy.preview
					}),
					stale ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-primary",
						children: copy.stale
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						readOnly: true,
						value: message,
						rows: 10,
						className: "mt-2 w-full border border-line bg-surface p-3 text-sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: waHref(message),
								target: "_blank",
								rel: "noreferrer",
								children: copy.sendWa
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => {
								navigator.clipboard.writeText(message).then(() => setCopied(true));
							},
							children: copied ? copy.copied : copy.copyMsg
						})]
					})
				]
			}) : null
		]
	});
}
//#endregion
export { DevisPage as component };
