import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { S as require_jsx_runtime, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, x as useRouter, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ClipboardList, t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cn-wbTmdq-a.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var SHOWROOM = {
	wa: "224622184055",
	tel: "+224622184055",
	telDisplay: "+224 622 18 40 55"
};
var categories = [
	{
		id: "telephones",
		label: {
			fr: "Téléphones",
			zh: "手机"
		},
		line: {
			fr: "Double SIM, grosse batterie.",
			zh: "双卡，大电池。"
		},
		image: "/catalog/orion-n7.jpg"
	},
	{
		id: "montres",
		label: {
			fr: "Montres",
			zh: "腕表"
		},
		line: {
			fr: "Acier et maille, quartz.",
			zh: "钢带与米兰尼斯，石英。"
		},
		image: "/catalog/lune-dor.jpg"
	},
	{
		id: "lunettes",
		label: {
			fr: "Lunettes",
			zh: "太阳镜"
		},
		line: {
			fr: "UV400, monture métal.",
			zh: "UV400，金属框。"
		},
		image: "/catalog/aviateur.jpg"
	},
	{
		id: "parfums",
		label: {
			fr: "Parfums",
			zh: "香水"
		},
		line: {
			fr: "100 ml, flacon maison.",
			zh: "100 毫升，自家瓶型。"
		},
		image: "/catalog/laterite.jpg"
	}
];
var cities = [
	{
		id: "kaloum",
		label: {
			fr: "Conakry — Kaloum",
			zh: "科纳克里 — 卡卢姆"
		}
	},
	{
		id: "madina",
		label: {
			fr: "Conakry — Madina",
			zh: "科纳克里 — 马迪纳"
		}
	},
	{
		id: "matoto",
		label: {
			fr: "Conakry — Matoto",
			zh: "科纳克里 — 马托托"
		}
	},
	{
		id: "ratoma",
		label: {
			fr: "Conakry — Ratoma",
			zh: "科纳克里 — 拉托马"
		}
	},
	{
		id: "dixinn",
		label: {
			fr: "Conakry — Dixinn",
			zh: "科纳克里 — 迪克辛"
		}
	},
	{
		id: "matam",
		label: {
			fr: "Conakry — Matam",
			zh: "科纳克里 — 马塔姆"
		}
	},
	{
		id: "kindia",
		label: {
			fr: "Kindia",
			zh: "金迪亚"
		}
	},
	{
		id: "boke",
		label: {
			fr: "Boké",
			zh: "博凯"
		}
	},
	{
		id: "mamou",
		label: {
			fr: "Mamou",
			zh: "马木"
		}
	},
	{
		id: "labe",
		label: {
			fr: "Labé",
			zh: "拉贝"
		}
	},
	{
		id: "kankan",
		label: {
			fr: "Kankan",
			zh: "康康"
		}
	},
	{
		id: "faranah",
		label: {
			fr: "Faranah",
			zh: "法拉纳"
		}
	},
	{
		id: "siguiri",
		label: {
			fr: "Siguiri",
			zh: "锡吉里"
		}
	},
	{
		id: "nzerekore",
		label: {
			fr: "Nzérékoré",
			zh: "恩泽雷科雷"
		}
	},
	{
		id: "autre",
		label: {
			fr: "Autre ville",
			zh: "其他城市"
		}
	}
];
var products = [
	{
		slug: "orion-n7",
		sku: "KG-TL-014",
		name: "Orion N7",
		category: "telephones",
		image: "/catalog/orion-n7.jpg",
		blurb: {
			fr: "6,78″ · 8+256 Go · 5 200 mAh",
			zh: "6.78″ · 8+256 GB · 5200 mAh"
		},
		story: {
			fr: "Le haut du rayon téléphones. Double SIM, batterie prévue pour les coupures, boîte neutre. Référence maison Orion, pas une marque tierce.",
			zh: "手机里的高价款。双卡，电池按停电来设计，中性包装。Orion 是自家型号，不是第三方品牌。"
		},
		specs: [
			{
				label: {
					fr: "Écran",
					zh: "屏幕"
				},
				value: {
					fr: "6,78″",
					zh: "6.78″"
				}
			},
			{
				label: {
					fr: "Mémoire",
					zh: "内存"
				},
				value: {
					fr: "8 + 256 Go",
					zh: "8 + 256 GB"
				}
			},
			{
				label: {
					fr: "Batterie",
					zh: "电池"
				},
				value: {
					fr: "5 200 mAh",
					zh: "5200 mAh"
				}
			},
			{
				label: {
					fr: "SIM",
					zh: "卡"
				},
				value: {
					fr: "Double SIM + microSD",
					zh: "双卡 + 存储卡"
				}
			}
		],
		moq: 10,
		carton: 10,
		tiers: [
			{
				min: 10,
				usd: 118
			},
			{
				min: 40,
				usd: 109
			},
			{
				min: 100,
				usd: 99
			}
		],
		stock: "stock",
		stockLabel: {
			fr: "En stock · Kaloum",
			zh: "现货 · 卡卢姆"
		}
	},
	{
		slug: "orion-a3",
		sku: "KG-TL-008",
		name: "Orion A3",
		category: "telephones",
		image: "/catalog/orion-a3.jpg",
		blurb: {
			fr: "6,6″ · 4+128 Go · 5 000 mAh",
			zh: "6.6″ · 4+128 GB · 5000 mAh"
		},
		story: {
			fr: "L'entrée de gamme qui tourne. Assez de mémoire pour WhatsApp et la photo, prix de carton serré.",
			zh: "走量的入门款。内存够用 WhatsApp 和拍照，箱价压得紧。"
		},
		specs: [
			{
				label: {
					fr: "Écran",
					zh: "屏幕"
				},
				value: {
					fr: "6,6″",
					zh: "6.6″"
				}
			},
			{
				label: {
					fr: "Mémoire",
					zh: "内存"
				},
				value: {
					fr: "4 + 128 Go",
					zh: "4 + 128 GB"
				}
			},
			{
				label: {
					fr: "Batterie",
					zh: "电池"
				},
				value: {
					fr: "5 000 mAh",
					zh: "5000 mAh"
				}
			},
			{
				label: {
					fr: "SIM",
					zh: "卡"
				},
				value: {
					fr: "Double SIM",
					zh: "双卡"
				}
			}
		],
		moq: 20,
		carton: 10,
		tiers: [
			{
				min: 20,
				usd: 64
			},
			{
				min: 80,
				usd: 58
			},
			{
				min: 200,
				usd: 52
			}
		],
		stock: "stock",
		stockLabel: {
			fr: "En stock · Kaloum",
			zh: "现货 · 卡卢姆"
		}
	},
	{
		slug: "terra-r1",
		sku: "KG-TL-021",
		name: "Terra R1",
		category: "telephones",
		image: "/catalog/terra-r1.jpg",
		blurb: {
			fr: "6,5″ · 6+128 Go · 6 000 mAh",
			zh: "6.5″ · 6+128 GB · 6000 mAh"
		},
		story: {
			fr: "Châssis renforcé pour la route de l'intérieur. Grip caoutchouc, batterie longue, moins joli, plus dur.",
			zh: "给内地公路用的加固机身。橡胶握持，电池更持久，不好看，但耐造。"
		},
		specs: [
			{
				label: {
					fr: "Écran",
					zh: "屏幕"
				},
				value: {
					fr: "6,5″ protégé",
					zh: "6.5″ 带保护"
				}
			},
			{
				label: {
					fr: "Mémoire",
					zh: "内存"
				},
				value: {
					fr: "6 + 128 Go",
					zh: "6 + 128 GB"
				}
			},
			{
				label: {
					fr: "Batterie",
					zh: "电池"
				},
				value: {
					fr: "6 000 mAh",
					zh: "6000 mAh"
				}
			},
			{
				label: {
					fr: "Usage",
					zh: "用途"
				},
				value: {
					fr: "Chantier et intérieur",
					zh: "工地与内地"
				}
			}
		],
		moq: 10,
		carton: 5,
		tiers: [
			{
				min: 10,
				usd: 86
			},
			{
				min: 40,
				usd: 79
			},
			{
				min: 100,
				usd: 73
			}
		],
		stock: "arrivage",
		stockLabel: {
			fr: "Arrivage · 10 jours",
			zh: "在途 · 10 天"
		}
	},
	{
		slug: "quai-40",
		sku: "KG-MT-040",
		name: "Quai 40",
		category: "montres",
		image: "/catalog/quai-40.jpg",
		blurb: {
			fr: "40 mm · acier · quartz",
			zh: "40 mm · 钢 · 石英"
		},
		story: {
			fr: "La montre de vitrine qui se vend sans discours. Cadran sombre, bracelet acier, mouvement quartz.",
			zh: "橱窗里不用多讲就能卖的表。深色盘，钢带，石英机芯。"
		},
		specs: [
			{
				label: {
					fr: "Boîtier",
					zh: "表壳"
				},
				value: {
					fr: "40 mm acier",
					zh: "40 mm 钢"
				}
			},
			{
				label: {
					fr: "Mouvement",
					zh: "机芯"
				},
				value: {
					fr: "Quartz",
					zh: "石英"
				}
			},
			{
				label: {
					fr: "Bracelet",
					zh: "表带"
				},
				value: {
					fr: "Acier brossé",
					zh: "拉丝钢带"
				}
			},
			{
				label: {
					fr: "Étanchéité",
					zh: "防水"
				},
				value: {
					fr: "3 ATM",
					zh: "3 ATM"
				}
			}
		],
		moq: 24,
		carton: 12,
		tiers: [
			{
				min: 24,
				usd: 16.5
			},
			{
				min: 72,
				usd: 14.5
			},
			{
				min: 144,
				usd: 12.8
			}
		],
		stock: "stock",
		stockLabel: {
			fr: "En stock · Kaloum",
			zh: "现货 · 卡卢姆"
		}
	},
	{
		slug: "lune-dor",
		sku: "KG-MT-022",
		name: "Lune d'Or",
		category: "montres",
		image: "/catalog/lune-dor.jpg",
		blurb: {
			fr: "36 mm · maille milanaise · quartz",
			zh: "36 mm · 米兰尼斯 · 石英"
		},
		story: {
			fr: "La pièce cadeau. Maille fine, cadran clair, boîte unitaire. Les boutiques la sortent pour les fêtes.",
			zh: "送礼款。细网带，浅色盘，独立盒。节日档口会把它摆出来。"
		},
		specs: [
			{
				label: {
					fr: "Boîtier",
					zh: "表壳"
				},
				value: {
					fr: "36 mm doré",
					zh: "36 mm 金色"
				}
			},
			{
				label: {
					fr: "Mouvement",
					zh: "机芯"
				},
				value: {
					fr: "Quartz",
					zh: "石英"
				}
			},
			{
				label: {
					fr: "Bracelet",
					zh: "表带"
				},
				value: {
					fr: "Maille milanaise",
					zh: "米兰尼斯网带"
				}
			},
			{
				label: {
					fr: "Public",
					zh: "客群"
				},
				value: {
					fr: "Cadeau, vitrine",
					zh: "礼品、橱窗"
				}
			}
		],
		moq: 12,
		carton: 6,
		tiers: [
			{
				min: 12,
				usd: 22
			},
			{
				min: 48,
				usd: 19.5
			},
			{
				min: 96,
				usd: 17.5
			}
		],
		stock: "stock",
		stockLabel: {
			fr: "En stock · Kaloum",
			zh: "现货 · 卡卢姆"
		}
	},
	{
		slug: "aviateur-k",
		sku: "KG-LN-011",
		name: "Aviateur K",
		category: "lunettes",
		image: "/catalog/aviateur.jpg",
		blurb: {
			fr: "Métal · verres brun · UV400",
			zh: "金属 · 茶片 · UV400"
		},
		story: {
			fr: "L'aviateur de la semaine. Monture métal légère, verres UV400. On contrôle les paires au déballage.",
			zh: "本周的飞行员款。轻金属框，UV400 茶片。开箱时逐副验。"
		},
		note: {
			fr: "Le carré et le rond partent selon l'arrivage. Demandez la photo sur WhatsApp.",
			zh: "方框和圆框视到货而定，可在 WhatsApp 上要实拍。"
		},
		specs: [
			{
				label: {
					fr: "Monture",
					zh: "镜框"
				},
				value: {
					fr: "Métal doré",
					zh: "金色金属"
				}
			},
			{
				label: {
					fr: "Verres",
					zh: "镜片"
				},
				value: {
					fr: "Brun, UV400",
					zh: "茶色，UV400"
				}
			},
			{
				label: {
					fr: "Public",
					zh: "客群"
				},
				value: {
					fr: "Mixte",
					zh: "男女皆可"
				}
			},
			{
				label: {
					fr: "Conditionnement",
					zh: "包装"
				},
				value: {
					fr: "Pochette + carton",
					zh: "袋装 + 外箱"
				}
			}
		],
		moq: 48,
		carton: 24,
		tiers: [
			{
				min: 48,
				usd: 4.2
			},
			{
				min: 144,
				usd: 3.6
			},
			{
				min: 360,
				usd: 3.1
			}
		],
		stock: "stock",
		stockLabel: {
			fr: "En stock · Kaloum",
			zh: "现货 · 卡卢姆"
		}
	},
	{
		slug: "laterite",
		sku: "KG-PR-108",
		name: "Latérite",
		category: "parfums",
		image: "/catalog/laterite.jpg",
		blurb: {
			fr: "100 ml · bois chaud, musc",
			zh: "100 ml · 暖木、麝香"
		},
		story: {
			fr: "Le jus qu'on retient. Bergamote courte, puis bois chaud et musc — proche de la terre rouge, pas un copie-coller de comptoir.",
			zh: "记得住的那支。佛手柑很快过去，然后是暖木和麝香，靠近红土，不是柜台仿香。"
		},
		note: {
			fr: "Fleuve (frais) et Nuit (plus lourd) : même flacon, sur demande.",
			zh: "河风（清新）和夜（更浓）同瓶型，需另询。"
		},
		specs: [
			{
				label: {
					fr: "Contenance",
					zh: "容量"
				},
				value: {
					fr: "100 ml",
					zh: "100 ml"
				}
			},
			{
				label: {
					fr: "Famille",
					zh: "香调"
				},
				value: {
					fr: "Boisé musqué",
					zh: "木质麝香"
				}
			},
			{
				label: {
					fr: "Flacon",
					zh: "瓶"
				},
				value: {
					fr: "Verre ambré, bouchon métal",
					zh: "琥珀玻璃，金属盖"
				}
			},
			{
				label: {
					fr: "Public",
					zh: "客群"
				},
				value: {
					fr: "Mixte, cadeau",
					zh: "男女、礼品"
				}
			}
		],
		moq: 24,
		carton: 12,
		tiers: [
			{
				min: 24,
				usd: 7.4
			},
			{
				min: 72,
				usd: 6.6
			},
			{
				min: 144,
				usd: 5.9
			}
		],
		stock: "stock",
		stockLabel: {
			fr: "En stock · Kaloum",
			zh: "现货 · 卡卢姆"
		}
	}
];
function t(lang, copy) {
	return copy[lang];
}
function getProduct(slug) {
	return products.find((item) => item.slug === slug);
}
function categoryById(id) {
	const found = categories.find((item) => item.id === id);
	if (!found) throw new Error(`Unknown category ${id}`);
	return found;
}
function unitUsd(product, qty) {
	let price = product.tiers[0]?.usd ?? 0;
	for (const tier of product.tiers) if (qty >= tier.min) price = tier.usd;
	return price;
}
var ui = {
	fr: {
		eyebrow: "Grossiste · Conakry",
		heroTitle: "Le prix du carton, affiché.",
		heroLead: "Téléphones, montres, lunettes et parfums pour les boutiques de Guinée. Vous repartez de Kaloum avec un tarif, pas avec une discussion.",
		heroAlt: "Téléphone, montre, lunettes et parfum posés sur du lin.",
		ctaCatalog: "Voir les prix",
		ctaQuote: "Mon devis",
		statMoqValue: "10",
		statMoqLabel: "pièces, seuil bas",
		statCityValue: "48 h",
		statCityLabel: "dans Conakry",
		statMinValue: "500 USD",
		statMinLabel: "commande mixte",
		familiesTitle: "Quatre familles",
		thisWeek: "Au showroom cette semaine",
		countLabel: "références",
		catalogTitle: "Tarif",
		searchLabel: "Rechercher une référence",
		searchPlaceholder: "Nom ou SKU",
		filterAll: "Tout",
		viewGrid: "Grille",
		viewList: "Liste",
		from: "dès",
		moqShort: "Seuil",
		add: "Ajouter",
		addMore: "+ carton",
		emptyCatalog: "Aucune référence pour cette recherche.",
		howTitle: "Comment on travaille",
		step1t: "Montez le devis",
		step1b: "Quantités au carton. Le palier de prix suit tout seul.",
		step2t: "Confirmation le jour même",
		step2b: "Du lundi au samedi, réponse WhatsApp depuis le showroom.",
		step3t: "Retrait ou livraison",
		step3b: "Kaloum sur rendez-vous, ou tournée vers votre boutique.",
		zoneTitle: "Où ça part",
		zoneConakryT: "Conakry",
		zoneConakryB: "Kaloum, Madina, Matoto, Ratoma, Dixinn, Matam. 24 à 48 heures.",
		zoneInteriorT: "Intérieur",
		zoneInteriorB: "Kindia, Boké, Mamou, Labé, Kankan, Faranah, Siguiri, Nzérékoré. 3 à 7 jours. Le transport est annoncé avant le départ.",
		termsTitle: "Conditions",
		term1: "Commande mixte minimum 500 USD, toutes familles confondues.",
		term2: "Prix départ showroom Kaloum. Le transport intérieur est en plus.",
		term3: "Téléphones : échange 7 jours pour défaut d'usine. Écran cassé après livraison : pas d'échange.",
		term4: "Montres, lunettes, parfums : contrôle au déballage. Pas de reprise d'invendu.",
		payTitle: "Règlement",
		pay1: "Virement — Ecobank, Vista Bank, UBA ou BICIGUI.",
		pay2: "Espèces au showroom, sur rendez-vous.",
		pay3: "Acompte Orange Money, solde avant enlèvement.",
		footerNote: "Références maison. Les photos sont des visuels catalogue, pas une marque tierce.",
		rateNote: "Taux indicatif du showroom : 1 USD = 8 830 GNF, au 3 novembre 2026. Non contractuel.",
		address: "Showroom sur rendez-vous · Kaloum, Conakry",
		hours: "Lundi–samedi, 9h–18h",
		quote: "Devis",
		back: "Retour au tarif",
		tiersTitle: "Paliers",
		qtyCol: "Quantité",
		priceCol: "Prix unitaire",
		qty: "Quantité",
		cartonOf: "Carton de",
		specs: "Fiche",
		related: "Dans la même famille",
		addToQuote: "Mettre au devis",
		added: "Ajouté au devis",
		perPiece: "/ pièce",
		about: "environ",
		quoteTitle: "Devis",
		quoteLead: "Relisez les quantités, puis préparez le message. On répond depuis Kaloum.",
		emptyQuote: "Rien dans le devis.",
		emptyQuoteCta: "Voir le tarif",
		boutique: "Boutique",
		city: "Ville",
		phone: "Téléphone",
		note: "Note",
		notePlaceholder: "Quai, horaire, autre coloris…",
		subtotal: "Total indicatif",
		underMin: "Sous les 500 USD. Vous pouvez quand même envoyer : on dira si on groupe ou si on attend.",
		prepare: "Préparer le message",
		sendWa: "Ouvrir WhatsApp",
		copyMsg: "Copier le message",
		copied: "Copié",
		clear: "Vider",
		confirmClear: "Vider vraiment",
		remove: "Retirer",
		required: "Indiquez la boutique et un téléphone.",
		badPhone: "Le numéro semble trop court.",
		preview: "Message",
		stale: "Les quantités ont changé. Préparez le message à nouveau.",
		refs: "références",
		seeQuote: "Voir le devis",
		missing: "Cette référence n'est pas au tarif.",
		mixNote: "Le minimum de 500 USD se calcule sur tout le devis, pas famille par famille.",
		decrease: "Diminuer",
		increase: "Augmenter",
		pieces: "pièces"
	},
	zh: {
		eyebrow: "批发 · 科纳克里",
		heroTitle: "箱价写在明处。",
		heroLead: "手机、腕表、太阳镜、香水，供给几内亚的店铺。从卡卢姆带走的是价目，不是一场讨价还价。",
		heroAlt: "麻布上的手机、腕表、太阳镜和香水。",
		ctaCatalog: "看批发价",
		ctaQuote: "我的报价单",
		statMoqValue: "10",
		statMoqLabel: "件起，最低门槛",
		statCityValue: "48 小时",
		statCityLabel: "科纳克里市内",
		statMinValue: "500 USD",
		statMinLabel: "混批最低",
		familiesTitle: "四个品类",
		thisWeek: "本周展厅在售",
		countLabel: "个型号",
		catalogTitle: "价目",
		searchLabel: "搜索型号",
		searchPlaceholder: "名称或编号",
		filterAll: "全部",
		viewGrid: "图示",
		viewList: "清单",
		from: "起",
		moqShort: "起订",
		add: "加入",
		addMore: "+ 一箱",
		emptyCatalog: "没有符合的型号。",
		howTitle: "怎么订",
		step1t: "组报价单",
		step1b: "按箱填数量，单价随阶梯自己变。",
		step2t: "当天确认",
		step2b: "周一到周六，展厅用 WhatsApp 回复。",
		step3t: "自提或配送",
		step3b: "卡卢姆预约自提，或送到你的店。",
		zoneTitle: "发往哪里",
		zoneConakryT: "科纳克里",
		zoneConakryB: "卡卢姆、马迪纳、马托托、拉托马、迪克辛、马塔姆。24 到 48 小时。",
		zoneInteriorT: "内地",
		zoneInteriorB: "金迪亚、博凯、马木、拉贝、康康、法拉纳、锡吉里、恩泽雷科雷。3 到 7 天。运费出发前说清。",
		termsTitle: "条款",
		term1: "全品类混批最低 500 美元。",
		term2: "价格为卡卢姆展厅交货价，内地运费另计。",
		term3: "手机：出厂故障 7 天内换货。送达后屏幕摔坏不换。",
		term4: "腕表、太阳镜、香水：开箱验收。滞销不退。",
		payTitle: "付款",
		pay1: "银行转账 — Ecobank、Vista Bank、UBA 或 BICIGUI。",
		pay2: "展厅现金，需预约。",
		pay3: "Orange Money 付定金，提货前结清。",
		footerNote: "自有型号。图片为目录效果，不代表第三方品牌。",
		rateNote: "展厅参考汇率：1 美元 = 8 830 几内亚法郎（2026年11月3日）。不作结算承诺。",
		address: "展厅需预约 · 科纳克里卡卢姆",
		hours: "周一至周六 9:00–18:00",
		quote: "报价单",
		back: "返回价目",
		tiersTitle: "价格阶梯",
		qtyCol: "数量",
		priceCol: "单价",
		qty: "数量",
		cartonOf: "每箱",
		specs: "参数",
		related: "同品类",
		addToQuote: "加入报价单",
		added: "已加入报价单",
		perPiece: "/ 件",
		about: "约",
		quoteTitle: "报价单",
		quoteLead: "核对数量，再生成报文。卡卢姆展厅会回复。",
		emptyQuote: "报价单是空的。",
		emptyQuoteCta: "去看价目",
		boutique: "店铺名称",
		city: "城市",
		phone: "电话",
		note: "备注",
		notePlaceholder: "档口、时间、其他颜色…",
		subtotal: "参考合计",
		underMin: "还不到 500 美元。仍可发送，我们会告诉你是并单还是再补。",
		prepare: "生成报文",
		sendWa: "打开 WhatsApp",
		copyMsg: "复制内容",
		copied: "已复制",
		clear: "清空",
		confirmClear: "确认清空",
		remove: "移除",
		required: "请填写店铺和电话。",
		badPhone: "电话号码太短。",
		preview: "报文",
		stale: "数量已改，请重新生成报文。",
		refs: "个型号",
		seeQuote: "查看报价单",
		missing: "价目里没有这个型号。",
		mixNote: "500 美元最低额按整张报价单计算，不按品类分开。",
		decrease: "减少",
		increase: "增加",
		pieces: "件"
	}
};
var useLang = create()(persist((set) => ({
	lang: "fr",
	setLang: (lang) => set({ lang })
}), {
	name: "kaloum-gros-lang",
	skipHydration: true
}));
var useQuote = create()(persist((set) => ({
	lines: [],
	add: (slug, qty) => {
		const product = getProduct(slug);
		if (!product || !useQuote.persist.hasHydrated()) return;
		const next = Math.max(product.moq, Math.floor(qty));
		set((state) => {
			if (!state.lines.some((line) => line.slug === slug)) return { lines: [...state.lines, {
				slug,
				qty: next
			}] };
			return { lines: state.lines.map((line) => line.slug === slug ? {
				...line,
				qty: next
			} : line) };
		});
	},
	setQty: (slug, qty) => {
		const product = getProduct(slug);
		if (!product || !useQuote.persist.hasHydrated()) return;
		const next = Math.floor(qty);
		if (next < product.moq) return;
		set((state) => ({ lines: state.lines.map((line) => line.slug === slug ? {
			...line,
			qty: next
		} : line) }));
	},
	remove: (slug) => {
		if (!useQuote.persist.hasHydrated()) return;
		set((state) => ({ lines: state.lines.filter((line) => line.slug !== slug) }));
	},
	clear: () => {
		if (!useQuote.persist.hasHydrated()) return;
		set({ lines: [] });
	}
}), {
	name: "kaloum-gros-devis",
	skipHydration: true
}));
var pending = null;
function hydrateStores() {
	if (typeof window === "undefined") return Promise.resolve();
	if (!pending) pending = Promise.all([useLang.persist.rehydrate(), useQuote.persist.rehydrate()]).then(() => void 0);
	return pending;
}
function useStoresReady() {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let on = true;
		hydrateStores().then(() => {
			if (on) setReady(true);
		});
		return () => {
			on = false;
		};
	}, []);
	return ready;
}
function useHydratedLang() {
	const lang = useLang((state) => state.lang);
	return useStoresReady() ? lang : "fr";
}
var USD_TO_GNF = 8830;
function formatUsd(value, lang) {
	const rounded = Math.round(value * 100) / 100;
	const cents = Math.round(rounded * 100) % 100 !== 0;
	return `${new Intl.NumberFormat(lang === "zh" ? "zh-CN" : "fr-FR", {
		minimumFractionDigits: cents ? 2 : 0,
		maximumFractionDigits: cents ? 2 : 0
	}).format(rounded)} USD`;
}
function formatGnfFromUsd(usd, lang) {
	return `${Math.round(usd * USD_TO_GNF).toLocaleString(lang === "zh" ? "zh-CN" : "fr-FR")} GNF`;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-DwUEE1jl.js
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var homeSearch = {
	cat: "tous",
	q: "",
	vue: "grille"
};
function Shell({ children }) {
	const lang = useHydratedLang();
	const setLang = useLang((state) => state.setLang);
	const copy = ui[lang];
	const ready = useStoresReady();
	const lines = useQuote((state) => state.lines);
	const path = useRouterState({ select: (state) => state.location.pathname });
	const showDock = ready && lines.length > 0 && path !== "/devis";
	(0, import_react.useEffect)(() => {
		document.documentElement.lang = lang === "zh" ? "zh-Hans" : "fr";
		document.title = lang === "zh" ? "Kaloum Gros — 科纳克里批发" : "Kaloum Gros — Grossiste à Conakry";
	}, [lang]);
	const total = lines.reduce((sum, line) => {
		const product = getProduct(line.slug);
		if (!product) return sum;
		return sum + unitUsd(product, line.qty) * line.qty;
	}, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-30 border-b border-line bg-bg/95 backdrop-blur",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						search: homeSearch,
						className: "flex items-baseline gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-xl leading-none",
							children: "Kaloum"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("text-xs text-muted", lang === "fr" && "tracking-widest"),
							children: "GROS"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex h-11 items-center text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: cn("px-2", lang === "fr" ? "font-medium text-fg" : "text-muted"),
									onClick: () => setLang("fr"),
									children: "FR"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted",
									children: "/"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: cn("px-2", lang === "zh" ? "font-medium text-fg" : "text-muted"),
									onClick: () => setLang("zh"),
									children: "中文"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/devis",
							className: "inline-flex h-11 items-center gap-2 px-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "size-5" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline",
									children: copy.quote
								}),
								ready && lines.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-flex h-5 min-w-5 items-center justify-center bg-primary px-1 text-xs tabular-nums text-primary-fg",
									children: lines.length
								}) : null
							]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("flex-1", showDock ? "pb-28" : "pb-8"),
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl",
								children: "Kaloum Gros"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: copy.address
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: copy.hours
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `tel:${SHOWROOM.tel}`,
								className: "mt-3 inline-flex h-11 items-center text-sm",
								children: SHOWROOM.telDisplay
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: copy.pay1 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2",
									children: copy.pay2
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2",
									children: copy.pay3
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: copy.footerNote }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3",
								children: copy.rateNote
							})]
						})
					]
				})
			}),
			showDock ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dock-pad fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm",
						children: [
							lines.length,
							" ",
							copy.refs
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl tabular-nums text-primary",
						children: formatUsd(total, lang)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/devis",
						className: "inline-flex h-11 items-center bg-primary px-4 text-sm font-medium text-primary-fg",
						children: copy.seeQuote
					})]
				})
			}) : null
		]
	});
}
function useConfirmClear() {
	const [armed, setArmed] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!armed) return;
		const id = window.setTimeout(() => setArmed(false), 2500);
		return () => window.clearTimeout(id);
	}, [armed]);
	return {
		armed,
		setArmed
	};
}
var styles_default = "/assets/styles-D2qLOs7W.css";
var Route$3 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Kaloum Gros — Grossiste à Conakry" },
			{
				name: "description",
				content: "Grossiste à Kaloum, Conakry : téléphones, montres, lunettes et parfums. Prix carton, seuil clair, livraison en Guinée."
			},
			{
				name: "theme-color",
				content: "#f3eee6"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
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
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Outfit:wght@400;500;600&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "fr",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$2 = () => import("./routes-BcZV7OsR.mjs");
var CATS = [
	"tous",
	"telephones",
	"montres",
	"lunettes",
	"parfums"
];
var Route$2 = createFileRoute("/")({
	validateSearch: (search) => {
		return {
			cat: CATS.includes(search.cat) ? search.cat : "tous",
			q: typeof search.q === "string" ? search.q : "",
			vue: search.vue === "liste" ? "liste" : "grille"
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./devis-ha_uml7r.mjs");
var Route$1 = createFileRoute("/devis")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./produit._slug-DKdsERO7.mjs");
var Route = createFileRoute("/produit/$slug")({
	head: ({ params }) => {
		const product = getProduct(params.slug);
		return { meta: [{ title: product ? `${product.name} — Kaloum Gros` : "Kaloum Gros" }] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$2.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$3
	}),
	DevisRoute: Route$1.update({
		id: "/devis",
		path: "/devis",
		getParentRoute: () => Route$3
	}),
	ProduitSlugRoute: Route.update({
		id: "/produit/$slug",
		path: "/produit/$slug",
		getParentRoute: () => Route$3
	})
};
var routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { useHydratedLang as _, USD_TO_GNF as a, cities as c, formatUsd as d, getProduct as f, unitUsd as g, ui as h, useConfirmClear as i, cn as l, t as m, Route as n, categories as o, products as p, Route$2 as r, categoryById as s, router_exports as t, formatGnfFromUsd as u, useQuote as v, useStoresReady as y };
