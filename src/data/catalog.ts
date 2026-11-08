import type { Lang } from "@/lib/lang-store";

export type L = { fr: string; zh: string };

export type CategoryId = "telephones" | "montres" | "lunettes" | "parfums";

export type Spec = { label: L; value: L };

export type Product = {
  slug: string;
  sku: string;
  name: string;
  category: CategoryId;
  blurb: L;
  story: L;
  note?: L;
  specs: Spec[];
  image: string;
  /** Full image set: main image first, remaining are thumbnails. */
  gallery?: string[];
  moq: number;
  carton: number;
  tiers: { min: number; gnf: number }[];
  stock: "stock" | "arrivage";
  stockLabel: L;
};

export const SHOWROOM = {
  wa: "224622184055",
  tel: "+224622184055",
  telDisplay: "+224 622 18 40 55",
};

export const categories: {
  id: CategoryId;
  label: L;
  line: L;
  image: string;
}[] = [
  {
    id: "telephones",
    label: { fr: "Téléphones", zh: "手机" },
    line: { fr: "Double SIM, grosse batterie.", zh: "双卡，大电池。" },
    image: "/catalog/telephones/01/01-main.webp",
  },
  {
    id: "montres",
    label: { fr: "Montres", zh: "腕表" },
    line: { fr: "Acier et maille, quartz.", zh: "钢带与米兰尼斯，石英。" },
    image: "/catalog/montres/01-main.webp",
  },
  {
    id: "lunettes",
    label: { fr: "Lunettes", zh: "太阳镜" },
    line: { fr: "UV400, monture métal.", zh: "UV400，金属框。" },
    image: "/catalog/lunettes/02/02-main.webp",
  },
  {
    id: "parfums",
    label: { fr: "Parfums", zh: "香水" },
    line: { fr: "100 ml, flacon maison.", zh: "100 毫升，自家瓶型。" },
    image: "/catalog/parfums/01/01-main.webp",
  },
];

export const cities: { id: string; label: L }[] = [
  { id: "kaloum", label: { fr: "Conakry — Kaloum", zh: "科纳克里 — 卡卢姆" } },
  { id: "madina", label: { fr: "Conakry — Madina", zh: "科纳克里 — 马迪纳" } },
  { id: "matoto", label: { fr: "Conakry — Matoto", zh: "科纳克里 — 马托托" } },
  { id: "ratoma", label: { fr: "Conakry — Ratoma", zh: "科纳克里 — 拉托马" } },
  { id: "dixinn", label: { fr: "Conakry — Dixinn", zh: "科纳克里 — 迪克辛" } },
  { id: "matam", label: { fr: "Conakry — Matam", zh: "科纳克里 — 马塔姆" } },
  { id: "kindia", label: { fr: "Kindia", zh: "金迪亚" } },
  { id: "boke", label: { fr: "Boké", zh: "博凯" } },
  { id: "mamou", label: { fr: "Mamou", zh: "马木" } },
  { id: "labe", label: { fr: "Labé", zh: "拉贝" } },
  { id: "kankan", label: { fr: "Kankan", zh: "康康" } },
  { id: "faranah", label: { fr: "Faranah", zh: "法拉纳" } },
  { id: "siguiri", label: { fr: "Siguiri", zh: "锡吉里" } },
  { id: "nzerekore", label: { fr: "Nzérékoré", zh: "恩泽雷科雷" } },
  { id: "autre", label: { fr: "Autre ville", zh: "其他城市" } },
];

export const products: Product[] = [
  {
    slug: "i17-promax",
    sku: "KG-TL-101",
    name: "i17 Pro Max",
    category: "telephones",
    image: "/catalog/telephones/01/01-main.webp",
    gallery: [
      "/catalog/telephones/01/01-main.webp",
      "/catalog/telephones/01/01-d04.jpg",
      "/catalog/telephones/01/01-d05.jpg",
    ],
    blurb: { fr: "Android · double SIM · 5G", zh: "安卓 · 双卡 · 5G" },
    story: {
      fr: "Référence i17 Pro Max. Double SIM, réseau 5G, batterie longue. Boîte neutre, référence maison.",
      zh: "i17 Pro Max 型号。双卡，5G 网络，电池持久。中性包装，自家型号。",
    },
    specs: [
      { label: { fr: "SIM", zh: "卡" }, value: { fr: "Double SIM + 5G", zh: "双卡 + 5G" } },
      { label: { fr: "Système", zh: "系统" }, value: { fr: "Android", zh: "安卓" } },
      { label: { fr: "Batterie", zh: "电池" }, value: { fr: "Longue autonomie", zh: "长续航" } },
    ],
    moq: 10,
    carton: 10,
    tiers: [
      { min: 10, gnf: 2801000 },
      { min: 40, gnf: 2587000 },
      { min: 100, gnf: 2350000 },
    ],
    stock: "stock",
    stockLabel: { fr: "En stock · Kaloum", zh: "现货 · 卡卢姆" },
  },
  {
    slug: "m17-promax",
    sku: "KG-TL-102",
    name: "M17 Pro Max",
    category: "telephones",
    image: "/catalog/telephones/02/02-main.webp",
    gallery: [
      "/catalog/telephones/02/02-main.webp",
      "/catalog/telephones/02/02-d16.jpg",
      "/catalog/telephones/02/02-v6.webp",
    ],
    blurb: { fr: "8 cœurs · Android · grande batterie", zh: "八核 · 安卓 · 大电池" },
    story: {
      fr: "M17 Pro Max, puce 8 cœurs, double SIM. Conçu pour les réseaux denses de Conakry et l'intérieur.",
      zh: "M17 Pro Max，八核芯片，双卡。为科纳克里及内地密集网络设计。",
    },
    specs: [
      { label: { fr: "CPU", zh: "处理器" }, value: { fr: "8 cœurs", zh: "八核" } },
      { label: { fr: "SIM", zh: "卡" }, value: { fr: "Double SIM", zh: "双卡" } },
      { label: { fr: "Système", zh: "系统" }, value: { fr: "Android", zh: "安卓" } },
    ],
    moq: 10,
    carton: 10,
    tiers: [
      { min: 10, gnf: 2801000 },
      { min: 40, gnf: 2587000 },
      { min: 100, gnf: 2350000 },
    ],
    stock: "stock",
    stockLabel: { fr: "En stock · Kaloum", zh: "现货 · 卡卢姆" },
  },
  {
    slug: "x200-pro",
    sku: "KG-TL-103",
    name: "X200 Pro",
    category: "telephones",
    image: "/catalog/telephones/03/03-main.webp",
    gallery: [
      "/catalog/telephones/03/03-main.webp",
      "/catalog/telephones/03/03-d12.jpg",
      "/catalog/telephones/03/03-d13.jpg",
      "/catalog/telephones/03/03-d14.jpg",
    ],
    blurb: { fr: "Écran 1080p · MTK6789 · 1 To", zh: "1080p 屏 · MTK6789 · 1 TB" },
    story: {
      fr: "X200 Pro, puce MTK6789, 1 To de stockage, écran plat et cadre renforcé. La référence jeu de la gamme.",
      zh: "X200 Pro，MTK6789 芯片，1 TB 存储，直角屏加固机身。游戏款代表。",
    },
    specs: [
      { label: { fr: "CPU", zh: "处理器" }, value: { fr: "MTK6789", zh: "MTK6789" } },
      { label: { fr: "Stockage", zh: "存储" }, value: { fr: "1 To", zh: "1 TB" } },
      { label: { fr: "Écran", zh: "屏幕" }, value: { fr: "1080p, cadre renforcé", zh: "1080p，加固边框" } },
    ],
    moq: 10,
    carton: 10,
    tiers: [
      { min: 10, gnf: 2801000 },
      { min: 40, gnf: 2587000 },
      { min: 100, gnf: 2350000 },
    ],
    stock: "stock",
    stockLabel: { fr: "En stock · Kaloum", zh: "现货 · 卡卢姆" },
  },
  {
    slug: "s26-ultra",
    sku: "KG-TL-104",
    name: "S26 Ultra",
    category: "telephones",
    image: "/catalog/telephones/04/04-main.webp",
    gallery: [
      "/catalog/telephones/04/04-main.webp",
      "/catalog/telephones/04/04-d15.jpg",
      "/catalog/telephones/04/04-v1.webp",
    ],
    blurb: { fr: "Écran 6,1″ · 16 Go + 1 To", zh: "6.1″ 屏 · 16 GB + 1 TB" },
    story: {
      fr: "S26 Ultra, écran 6,1″, 16 Go de mémoire + 1 To. Le haut de gamme de la gamme téléphones.",
      zh: "S26 Ultra，6.1 英寸屏，16 GB 内存 + 1 TB 存储。手机里的高端款。",
    },
    specs: [
      { label: { fr: "Écran", zh: "屏幕" }, value: { fr: "6,1″", zh: "6.1″" } },
      { label: { fr: "Mémoire", zh: "内存" }, value: { fr: "16 + 1 To", zh: "16 + 1 TB" } },
      { label: { fr: "SIM", zh: "卡" }, value: { fr: "Double SIM", zh: "双卡" } },
    ],
    moq: 10,
    carton: 10,
    tiers: [
      { min: 10, gnf: 1887000 },
      { min: 40, gnf: 1743000 },
      { min: 100, gnf: 1583000 },
    ],
    stock: "stock",
    stockLabel: { fr: "En stock · Kaloum", zh: "现货 · 卡卢姆" },
  },
  {
    slug: "amxge",
    sku: "KG-TL-105",
    name: "AMXGE",
    category: "telephones",
    image: "/catalog/telephones/05/05-main.webp",
    gallery: [
      "/catalog/telephones/05/05-main.webp",
      "/catalog/telephones/05/05-d12.jpg",
      "/catalog/telephones/05/05-d13.jpg",
      "/catalog/telephones/05/05-d14.jpg",
    ],
    blurb: { fr: "Android · double SIM · 4G/5G", zh: "安卓 · 双卡 · 4G/5G" },
    story: {
      fr: "AMXGE, Android, double SIM, batterie longue. La référence milieu de gamme qui tourne.",
      zh: "AMXGE，安卓，双卡，电池持久。走量的中端款。",
    },
    specs: [
      { label: { fr: "Système", zh: "系统" }, value: { fr: "Android", zh: "安卓" } },
      { label: { fr: "SIM", zh: "卡" }, value: { fr: "Double SIM", zh: "双卡" } },
      { label: { fr: "Réseau", zh: "网络" }, value: { fr: "4G / 5G", zh: "4G / 5G" } },
    ],
    moq: 20,
    carton: 10,
    tiers: [
      { min: 20, gnf: 2436000 },
      { min: 80, gnf: 2207000 },
      { min: 200, gnf: 1979000 },
    ],
    stock: "stock",
    stockLabel: { fr: "En stock · Kaloum", zh: "现货 · 卡卢姆" },
  },
  {
    slug: "s26-plus-ultra",
    sku: "KG-TL-106",
    name: "S26+ Ultra",
    category: "telephones",
    image: "/catalog/telephones/06/06-main.webp",
    gallery: [
      "/catalog/telephones/06/06-main.webp",
      "/catalog/telephones/06/06-d05.jpg",
      "/catalog/telephones/06/06-d13.jpg",
    ],
    blurb: { fr: "Écran 6,9″ · 16 Go + 512 Go", zh: "6.9″ 屏 · 16 GB + 512 GB" },
    story: {
      fr: "S26+ Ultra, grand écran 6,9″, 16 Go + 512 Go, double SIM. La version large de la gamme S26.",
      zh: "S26+ Ultra，6.9 英寸大屏，16 GB + 512 GB，双卡。S26 系列的大屏版。",
    },
    specs: [
      { label: { fr: "Écran", zh: "屏幕" }, value: { fr: "6,9″", zh: "6.9″" } },
      { label: { fr: "Mémoire", zh: "内存" }, value: { fr: "16 + 512 Go", zh: "16 + 512 GB" } },
      { label: { fr: "SIM", zh: "卡" }, value: { fr: "Double SIM", zh: "双卡" } },
    ],
    moq: 10,
    carton: 10,
    tiers: [
      { min: 10, gnf: 1418000 },
      { min: 40, gnf: 1310000 },
      { min: 100, gnf: 1190000 },
    ],
    stock: "stock",
    stockLabel: { fr: "En stock · Kaloum", zh: "现货 · 卡卢姆" },
  },
  {
    slug: "h25-sport",
    sku: "KG-MT-201",
    name: "H25 Sport",
    category: "montres",
    image: "/catalog/montres/01-main.webp",
    gallery: [
      "/catalog/montres/01-main.webp",
      "/catalog/montres/01-t02.webp",
      "/catalog/montres/01-t03.webp",
      "/catalog/montres/01-t04.webp",
      "/catalog/montres/01-t05.webp",
    ],
    blurb: { fr: "Smartwatch · IP67 · 42 mm", zh: "智能运动表 · IP67 · 42 mm" },
    story: {
      fr: "H25 Sport, IP67, écran 42 mm. Référence sport qui se vend dans les vitrines.",
      zh: "H25 Sport，IP67 防水，42 mm 屏。运动款，橱窗里走得快。",
    },
    specs: [
      { label: { fr: "Étanchéité", zh: "防水" }, value: { fr: "IP67", zh: "IP67" } },
      { label: { fr: "Écran", zh: "屏幕" }, value: { fr: "42 mm", zh: "42 mm" } },
      { label: { fr: "Usage", zh: "用途" }, value: { fr: "Sport", zh: "运动" } },
    ],
    moq: 12,
    carton: 6,
    tiers: [
      { min: 12, gnf: 519000 },
      { min: 48, gnf: 460000 },
      { min: 96, gnf: 413000 },
    ],
    stock: "stock",
    stockLabel: { fr: "En stock · Kaloum", zh: "现货 · 卡卢姆" },
  },
  {
    slug: "mini-focus",
    sku: "KG-MT-202",
    name: "Mini Focus",
    category: "montres",
    image: "/catalog/montres/缩略图2/02-main.webp",
    gallery: [
      "/catalog/montres/缩略图2/02-main.webp",
      "/catalog/montres/缩略图2/02-t02.webp",
      "/catalog/montres/缩略图2/02-t03.webp",
      "/catalog/montres/缩略图2/02-t04.webp",
      "/catalog/montres/缩略图2/02-t05.webp",
      "/catalog/montres/缩略图2/02-t06.webp",
      "/catalog/montres/缩略图2/02-t07.webp",
    ],    blurb: { fr: "38 mm · acier · quartz", zh: "38 mm · 钢 · 石英" },
    story: {
      fr: "Mini Focus, acier, quartz. Le petit qui se glisse sous la manchette.",
      zh: "Mini Focus，钢壳石英。小尺寸，能塞进袖口里。",
    },
    specs: [
      { label: { fr: "Boîtier", zh: "表壳" }, value: { fr: "38 mm acier", zh: "38 mm 钢" } },
      { label: { fr: "Mouvement", zh: "机芯" }, value: { fr: "Quartz", zh: "石英" } },
      { label: { fr: "Étanchéité", zh: "防水" }, value: { fr: "3 ATM", zh: "3 ATM" } },
    ],
    moq: 12,
    carton: 6,
    tiers: [
      { min: 12, gnf: 519000 },
      { min: 48, gnf: 460000 },
      { min: 96, gnf: 413000 },
    ],
    stock: "stock",
    stockLabel: { fr: "En stock · Kaloum", zh: "现货 · 卡卢姆" },
  },
  {
    slug: "t99max-smart",
    sku: "KG-MT-203",
    name: "T99 Max",
    category: "montres",
    image: "/catalog/montres/缩略图3/03-main.webp",
    gallery: [
      "/catalog/montres/缩略图3/03-main.webp",
      "/catalog/montres/缩略图3/03-t02.webp",
      "/catalog/montres/缩略图3/03-t03.webp",
      "/catalog/montres/缩略图3/03-t04.webp",
      "/catalog/montres/缩略图3/03-t05.webp",
      "/catalog/montres/缩略图3/03-t06.webp",
    ],
    blurb: { fr: "Smartwatch · Bluetooth · 1,85″", zh: "智能表 · 蓝牙 · 1.85″" },
    story: {
      fr: "T99 Max, écran 1,85″, Bluetooth, notification. La référence connectée du rayon.",
      zh: "T99 Max，1.85 英寸屏，蓝牙通知。智能表里的走量款。",
    },
    specs: [
      { label: { fr: "Écran", zh: "屏幕" }, value: { fr: "1,85″", zh: "1.85″" } },
      { label: { fr: "Connectivité", zh: "连接" }, value: { fr: "Bluetooth", zh: "蓝牙" } },
      { label: { fr: "Étanchéité", zh: "防水" }, value: { fr: "IP67", zh: "IP67" } },
    ],
    moq: 12,
    carton: 6,
    tiers: [
      { min: 12, gnf: 176000 },
      { min: 48, gnf: 156000 },
      { min: 96, gnf: 140000 },
    ],
    stock: "stock",
    stockLabel: { fr: "En stock · Kaloum", zh: "现货 · 卡卢姆" },
  },
  {
    slug: "plongee-rubis",
    sku: "KG-MT-204",
    name: "Plongée Rubis",
    category: "montres",
    image: "/catalog/montres/缩略图4/04-main.webp",
    gallery: [
      "/catalog/montres/缩略图4/04-main.webp",
      "/catalog/montres/缩略图4/04-t02.webp",
      "/catalog/montres/缩略图4/04-t03.webp",
      "/catalog/montres/缩略图4/04-t04.webp",
    ],
    blurb: { fr: "Plongée 100 m · acier · quartz", zh: "潜水 100 m · 钢 · 石英" },
    story: {
      fr: "Plongée Rubis, 100 m, acier. La montre de bain qui tient la mer.",
      zh: "Plongée Rubis，100 米防水，钢壳。能下水的潜水款。",
    },
    specs: [
      { label: { fr: "Étanchéité", zh: "防水" }, value: { fr: "10 ATM", zh: "10 ATM" } },
      { label: { fr: "Mouvement", zh: "机芯" }, value: { fr: "Quartz", zh: "石英" } },
      { label: { fr: "Boîtier", zh: "表壳" }, value: { fr: "Acier", zh: "钢" } },
    ],
    moq: 24,
    carton: 12,
    tiers: [
      { min: 24, gnf: 532000 },
      { min: 72, gnf: 468000 },
      { min: 144, gnf: 413000 },
    ],
    stock: "stock",
    stockLabel: { fr: "En stock · Kaloum", zh: "现货 · 卡卢姆" },
  },
  {
    slug: "jade-bangle",
    sku: "KG-MT-205",
    name: "Jade Bangle",
    category: "montres",
    image: "/catalog/montres/缩略图5/05-t01.webp",
    gallery: [
      "/catalog/montres/缩略图5/05-t01.webp",
      "/catalog/montres/缩略图5/05-t02.webp",
    ],
    blurb: { fr: "40 mm · acier · quartz", zh: "40 mm · 钢 · 石英" },
    story: {
      fr: "Jade Bangle, acier, quartz. La référence qui tient dans la main.",
      zh: "Jade Bangle，钢壳石英。上手就有的那款。",
    },
    specs: [
      { label: { fr: "Boîtier", zh: "表壳" }, value: { fr: "40 mm acier", zh: "40 mm 钢" } },
      { label: { fr: "Mouvement", zh: "机芯" }, value: { fr: "Quartz", zh: "石英" } },
      { label: { fr: "Étanchéité", zh: "防水" }, value: { fr: "3 ATM", zh: "3 ATM" } },
    ],
    moq: 12,
    carton: 6,
    tiers: [
      { min: 12, gnf: 176000 },
      { min: 48, gnf: 156000 },
      { min: 96, gnf: 140000 },
    ],
    stock: "stock",
    stockLabel: { fr: "En stock · Kaloum", zh: "现货 · 卡卢姆" },
  },
  {
    slug: "champagne-mech",
    sku: "KG-MT-206",
    name: "Champagne Mech",
    category: "montres",
    image: "/catalog/montres/缩略图6/06-main.webp",
    gallery: [
      "/catalog/montres/缩略图6/06-main.webp",
      "/catalog/montres/缩略图6/06-t02.webp",
      "/catalog/montres/缩略图6/06-t03.webp",
      "/catalog/montres/缩略图6/06-t04.webp",
      "/catalog/montres/缩略图6/06-t06.webp",
      "/catalog/montres/缩略图6/06-t07.webp",
    ],
    blurb: { fr: "42 mm · acier · mécanique", zh: "42 mm · 钢 · 机械" },
    story: {
      fr: "Champagne Mech, acier, automatique. La pièce cadeau qui tient la main.",
      zh: "Champagne Mech，钢壳自动机械。送礼款，上手有分量。",
    },
    specs: [
      { label: { fr: "Boîtier", zh: "表壳" }, value: { fr: "42 mm acier", zh: "42 mm 钢" } },
      { label: { fr: "Mouvement", zh: "机芯" }, value: { fr: "Mécanique automatique", zh: "自动机械" } },
      { label: { fr: "Étanchéité", zh: "防水" }, value: { fr: "3 ATM", zh: "3 ATM" } },
    ],
    moq: 24,
    carton: 12,
    tiers: [
      { min: 24, gnf: 532000 },
      { min: 72, gnf: 468000 },
      { min: 144, gnf: 413000 },
    ],
    stock: "stock",
    stockLabel: { fr: "En stock · Kaloum", zh: "现货 · 卡卢姆" },
  },
  {
    slug: "champagne-quartz",
    sku: "KG-MT-207",
    name: "Champagne Quartz",
    category: "montres",
    image: "/catalog/montres/缩略图7/07-t01.webp",
    gallery: [
      "/catalog/montres/缩略图7/07-t01.webp",
      "/catalog/montres/缩略图7/07-t02.webp",
      "/catalog/montres/缩略图7/07-t03.webp",
      "/catalog/montres/缩略图7/07-t04.webp",
    ],
    blurb: { fr: "38 mm · acier · quartz", zh: "38 mm · 钢 · 石英" },
    story: {
      fr: "Champagne Quartz, acier, quartz. Le petit carré qui se glisse sous la manchette.",
      zh: "Champagne Quartz，钢壳石英。小方盘，塞袖口那种。",
    },
    specs: [
      { label: { fr: "Boîtier", zh: "表壳" }, value: { fr: "38 mm acier", zh: "38 mm 钢" } },
      { label: { fr: "Mouvement", zh: "机芯" }, value: { fr: "Quartz", zh: "石英" } },
      { label: { fr: "Étanchéité", zh: "防水" }, value: { fr: "3 ATM", zh: "3 ATM" } },
    ],
    moq: 12,
    carton: 6,
    tiers: [
      { min: 12, gnf: 322000 },
      { min: 48, gnf: 285000 },
      { min: 96, gnf: 256000 },
    ],
    stock: "stock",
    stockLabel: { fr: "En stock · Kaloum", zh: "现货 · 卡卢姆" },
  },
  {
    slug: "aviateur-k",
    sku: "KG-LN-011",
    name: "Aviateur K",
    category: "lunettes",
    image: "/catalog/lunettes/01/01-main.webp",
    gallery: [
      "/catalog/lunettes/01/01-main.webp",
      "/catalog/lunettes/01/01-t02.webp",
      "/catalog/lunettes/01/01-t03.webp",
      "/catalog/lunettes/01/01-t04.webp",
      "/catalog/lunettes/01/01-t05.webp",
      "/catalog/lunettes/01/01-t06.webp",
      "/catalog/lunettes/01/01-t07.webp",
    ],
    blurb: { fr: "Métal · verres brun · UV400", zh: "金属 · 茶片 · UV400" },
    story: {
      fr: "L'aviateur de la semaine. Monture métal légère, verres UV400. On contrôle les paires au déballage.",
      zh: "本周的飞行员款。轻金属框，UV400 茶片。开箱时逐副验。",
    },
    note: {
      fr: "Le carré et le rond partent selon l'arrivage. Demandez la photo sur WhatsApp.",
      zh: "方框和圆框视到货而定，可在 WhatsApp 上要实拍。",
    },
    specs: [
      { label: { fr: "Monture", zh: "镜框" }, value: { fr: "Métal doré", zh: "金色金属" } },
      { label: { fr: "Verres", zh: "镜片" }, value: { fr: "Brun, UV400", zh: "茶色，UV400" } },
      { label: { fr: "Public", zh: "客群" }, value: { fr: "Mixte", zh: "男女皆可" } },
      { label: { fr: "Conditionnement", zh: "包装" }, value: { fr: "Pochette + carton", zh: "袋装 + 外箱" } },
    ],
    moq: 48,
    carton: 24,
    tiers: [
      { min: 48, gnf: 241000 },
      { min: 144, gnf: 207000 },
      { min: 360, gnf: 178000 },
    ],
    stock: "stock",
    stockLabel: { fr: "En stock · Kaloum", zh: "现货 · 卡卢姆" },
  },
  {
    slug: "pc-square",
    sku: "KG-LN-201",
    name: "PC Square",
    category: "lunettes",
    image: "/catalog/lunettes/02/02-main.webp",
    gallery: ["/catalog/lunettes/02/02-main.webp", "/catalog/lunettes/02/02-t02.webp"],
    blurb: { fr: "PC · verres UV400", zh: "PC · UV400 镜片" },
    story: {
      fr: "PC Square, monture PC légère, verres UV400. La référence qui se glisse dans le sac.",
      zh: "PC Square，轻便 PC 框，UV400 镜片。能塞进随身包的那款。",
    },
    specs: [
      { label: { fr: "Monture", zh: "镜框" }, value: { fr: "PC", zh: "PC" } },
      { label: { fr: "Verres", zh: "镜片" }, value: { fr: "UV400", zh: "UV400" } },
      { label: { fr: "Public", zh: "客群" }, value: { fr: "Femme", zh: "女款" } },
    ],
    moq: 48,
    carton: 24,
    tiers: [
      { min: 48, gnf: 241000 },
      { min: 144, gnf: 207000 },
      { min: 360, gnf: 178000 },
    ],
    stock: "stock",
    stockLabel: { fr: "En stock · Kaloum", zh: "现货 · 卡卢姆" },
  },
  {
    slug: "large-face",
    sku: "KG-LN-202",
    name: "Large Face",
    category: "lunettes",
    image: "/catalog/lunettes/03/03-main.webp",
    gallery: [
      "/catalog/lunettes/03/03-main.webp",
      "/catalog/lunettes/03/03-t02.webp",
      "/catalog/lunettes/03/03-t03.webp",
      "/catalog/lunettes/03/03-t04.webp",
      "/catalog/lunettes/03/03-t05.webp",
    ],
    blurb: { fr: "Grande monture · UV400", zh: "大脸显瘦 · UV400" },
    story: {
      fr: "Large Face, monture XXL qui amincit le visage. Verres UV400, référence viral.",
      zh: "Large Face，加大版镜框显脸小。UV400 镜片，网红爆款。",
    },
    specs: [
      { label: { fr: "Taille", zh: "尺寸" }, value: { fr: "XXL", zh: "加大" } },
      { label: { fr: "Verres", zh: "镜片" }, value: { fr: "UV400", zh: "UV400" } },
      { label: { fr: "Public", zh: "客群" }, value: { fr: "Mixte", zh: "男女皆可" } },
    ],
    moq: 48,
    carton: 24,
    tiers: [
      { min: 48, gnf: 241000 },
      { min: 144, gnf: 207000 },
      { min: 360, gnf: 178000 },
    ],
    stock: "stock",
    stockLabel: { fr: "En stock · Kaloum", zh: "现货 · 卡卢姆" },
  },
  {
    slug: "polar-sun",
    sku: "KG-LN-203",
    name: "Polar Sun",
    category: "lunettes",
    image: "/catalog/lunettes/04/04-main.webp",
    gallery: [
      "/catalog/lunettes/04/04-main.webp",
      "/catalog/lunettes/04/04-t02.webp",
      "/catalog/lunettes/04/04-t03.webp",
      "/catalog/lunettes/04/04-t04.webp",
      "/catalog/lunettes/04/04-t05.webp",
    ],
    blurb: { fr: "Polarisé · UV400", zh: "偏光 · UV400" },
    story: {
      fr: "Polar Sun, verres polarisés, protection UV400. La référence qui évite les reflets au volant.",
      zh: "Polar Sun，偏光镜片，UV400 防护。开车防反光那款。",
    },
    specs: [
      { label: { fr: "Verres", zh: "镜片" }, value: { fr: "Polarisés, UV400", zh: "偏光，UV400" } },
      { label: { fr: "Usage", zh: "用途" }, value: { fr: "Conduite, sport", zh: "驾车、运动" } },
      { label: { fr: "Public", zh: "客群" }, value: { fr: "Femme", zh: "女款" } },
    ],
    moq: 48,
    carton: 24,
    tiers: [
      { min: 48, gnf: 203000 },
      { min: 144, gnf: 174000 },
      { min: 360, gnf: 150000 },
    ],
    stock: "stock",
    stockLabel: { fr: "En stock · Kaloum", zh: "现货 · 卡卢姆" },
  },
  {
    slug: "cat-eye",
    sku: "KG-LN-204",
    name: "Cat Eye",
    category: "lunettes",
    image: "/catalog/lunettes/05/05-main.webp",
    gallery: [
      "/catalog/lunettes/05/05-main.webp",
      "/catalog/lunettes/05/05-d03.jpg",
      "/catalog/lunettes/05/05-d04.jpg",
      "/catalog/lunettes/05/05-d05.jpg",
      "/catalog/lunettes/05/05-d06.jpg",
    ],
    blurb: { fr: "Chat · strass · UV400", zh: "猫眼 · 镶钻 · UV400" },
    story: {
      fr: "Cat Eye, strass, UV400. La pièce tendance des vitrines de Conakry.",
      zh: "Cat Eye，镶钻，UV400。科纳克里橱窗里的时尚款。",
    },
    specs: [
      { label: { fr: "Monture", zh: "镜框" }, value: { fr: "Strass", zh: "镶钻" } },
      { label: { fr: "Verres", zh: "镜片" }, value: { fr: "UV400", zh: "UV400" } },
      { label: { fr: "Public", zh: "客群" }, value: { fr: "Femme", zh: "女款" } },
    ],
    moq: 48,
    carton: 24,
    tiers: [
      { min: 48, gnf: 309000 },
      { min: 144, gnf: 265000 },
      { min: 360, gnf: 228000 },
    ],
    stock: "stock",
    stockLabel: { fr: "En stock · Kaloum", zh: "现货 · 卡卢姆" },
  },
  {
    slug: "fine-mesh",
    sku: "KG-LN-205",
    name: "Fine Mesh",
    category: "lunettes",
    image: "/catalog/lunettes/06/06-main.webp",
    gallery: [
      "/catalog/lunettes/06/06-main.webp",
      "/catalog/lunettes/06/06-t02.webp",
      "/catalog/lunettes/06/06-t03.webp",
      "/catalog/lunettes/06/06-t04.webp",
      "/catalog/lunettes/06/06-t05.webp",
      "/catalog/lunettes/06/06-t06.webp",
      "/catalog/lunettes/06/06-t07.webp",
      "/catalog/lunettes/06/06-t08.webp",
    ],
    blurb: { fr: "Métal fin · dégradé · UV400", zh: "细金属框 · 渐变 · UV400" },
    story: {
      fr: "Fine Mesh, métal fin, verres dégradés UV400. La référence qui passe du jour à la nuit.",
      zh: "Fine Mesh，细金属框，渐变 UV400 镜片。从白天到夜晚都能戴的那款。",
    },
    specs: [
      { label: { fr: "Monture", zh: "镜框" }, value: { fr: "Métal fin", zh: "细金属" } },
      { label: { fr: "Verres", zh: "镜片" }, value: { fr: "Dégradé, UV400", zh: "渐变，UV400" } },
      { label: { fr: "Public", zh: "客群" }, value: { fr: "Mixte", zh: "男女皆可" } },
    ],
    moq: 48,
    carton: 24,
    tiers: [
      { min: 48, gnf: 322000 },
      { min: 144, gnf: 276000 },
      { min: 360, gnf: 238000 },
    ],
    stock: "stock",
    stockLabel: { fr: "En stock · Kaloum", zh: "现货 · 卡卢姆" },
  },
  {
    slug: "sadoer-sandal",
    sku: "KG-PR-301",
    name: "SADOER Sandal",
    category: "parfums",
    image: "/catalog/parfums/01/01-main.webp",
    gallery: [
      "/catalog/parfums/01/01-main.webp",
    ],
    blurb: { fr: "SADOER · bois de santal · 100 ml", zh: "SADOER · 檀香 · 100 ml" },
    story: {
      fr: "SADOER Sandal, haute gamme. Bois de santal, sent tenace, coffret luxe.",
      zh: "SADOER Sandal，高端款。檀香调，持久留香，高奢礼盒。",
    },
    specs: [
      { label: { fr: "Contenance", zh: "容量" }, value: { fr: "100 ml", zh: "100 ml" } },
      { label: { fr: "Famille", zh: "香调" }, value: { fr: "Bois de santal", zh: "檀香" } },
      { label: { fr: "Public", zh: "客群" }, value: { fr: "Mixte, cadeau", zh: "男女、礼品" } },
    ],
    moq: 24,
    carton: 12,
    tiers: [
      { min: 24, gnf: 142000 },
      { min: 72, gnf: 126000 },
      { min: 144, gnf: 113000 },
    ],
    stock: "stock",
    stockLabel: { fr: "En stock · Kaloum", zh: "现货 · 卡卢姆" },
  },
  {
    slug: "retro-paris",
    sku: "KG-PR-302",
    name: "Retro Paris",
    category: "parfums",
    image: "/catalog/parfums/02/02-main.webp",
    gallery: [
      "/catalog/parfums/02/02-main.webp",
      "/catalog/parfums/02/02-t03.webp",
      "/catalog/parfums/02/02-t04.webp",
      "/catalog/parfums/02/02-t05.webp",
      "/catalog/parfums/02/02-t06.webp",
      "/catalog/parfums/02/02-t07.webp",
      "/catalog/parfums/02/02-t08.webp",
      "/catalog/parfums/02/02-t09.webp",
      "/catalog/parfums/02/02-t10.webp",
      "/catalog/parfums/02/02-t11.webp",
      "/catalog/parfums/02/02-t12.webp",
      "/catalog/parfums/02/02-t13.webp",
      "/catalog/parfums/02/02-t14.webp",
      "/catalog/parfums/02/02-t15.webp",
      "/catalog/parfums/02/02-t16.webp",
    ],
    blurb: { fr: "50 ml · senteur legere · femme", zh: "50 ml · 淡香 · 女款" },
    story: {
      fr: "Retro Paris, 50 ml. La senteur fine qui se porte au quotidien, reference etudiante et etalage.",
      zh: "Retro Paris，50 ml。日常淡香款，学生档和橱窗都走。",
    },
    specs: [
      { label: { fr: "Contenance", zh: "容量" }, value: { fr: "50 ml", zh: "50 ml" } },
      { label: { fr: "Famille", zh: "香调" }, value: { fr: "Leger, floral", zh: "清新花香" } },
      { label: { fr: "Public", zh: "客群" }, value: { fr: "Femme", zh: "女款" } },
    ],
    moq: 48,
    carton: 24,
    tiers: [
      { min: 48, gnf: 155000 },
      { min: 144, gnf: 134000 },
      { min: 360, gnf: 113000 },
    ],
    stock: "stock",
    stockLabel: { fr: "En stock · Kaloum", zh: "现货 · 卡卢姆" },
  },
  {
    slug: "flower-story",
    sku: "KG-PR-303",
    name: "Flower Story",
    category: "parfums",
    image: "/catalog/parfums/03/03-main.webp",
    gallery: [
      "/catalog/parfums/03/03-main.webp",
      "/catalog/parfums/03/03-t02.webp",
    ],
    blurb: { fr: "3 pieces · noir opium · cadeau", zh: "三件套 · 黑鸦片 · 礼品" },
    story: {
      fr: "Flower Story, coffret 3 pieces, reference noir opium. La piece cadeau de fin de saison.",
      zh: "Flower Story，三件套礼盒，黑鸦片款。季末礼品款。",
    },
    specs: [
      { label: { fr: "Contenu", zh: "内容" }, value: { fr: "3 pieces", zh: "三件套" } },
      { label: { fr: "Famille", zh: "香调" }, value: { fr: "Noir opium", zh: "黑鸦片" } },
      { label: { fr: "Public", zh: "客群" }, value: { fr: "Cadeau, homme", zh: "礼品、男款" } },
    ],
    moq: 24,
    carton: 12,
    tiers: [
      { min: 24, gnf: 232000 },
      { min: 72, gnf: 203000 },
      { min: 144, gnf: 175000 },
    ],
    stock: "stock",
    stockLabel: { fr: "En stock · Kaloum", zh: "现货 · 卡卢姆" },
  },
  {
    slug: "mejisoo",
    sku: "KG-PR-304",
    name: "MEJISOO",
    category: "parfums",
    image: "/catalog/parfums/04/04-main.webp",
    gallery: [
      "/catalog/parfums/04/04-main.webp",
      "/catalog/parfums/04/04-t02.webp",
      "/catalog/parfums/04/04-t03.webp",
    ],
    blurb: { fr: "Fleur et fruit · tenue", zh: "花果调 · 持久" },
    story: {
      fr: "MEJISOO, senteur florale et fruite qui tient. La reference mixte qui se vend dans les vitrines.",
      zh: "MEJISOO，花果调，留香持久。橱窗里走量的男女通用款。",
    },
    specs: [
      { label: { fr: "Famille", zh: "香调" }, value: { fr: "Fleur, fruit", zh: "花果" } },
      { label: { fr: "Tenue", zh: "持久度" }, value: { fr: "Tenace", zh: "持久" } },
      { label: { fr: "Public", zh: "客群" }, value: { fr: "Mixte", zh: "男女皆可" } },
    ],
    moq: 24,
    carton: 12,
    tiers: [
      { min: 24, gnf: 146000 },
      { min: 72, gnf: 127000 },
      { min: 144, gnf: 113000 },
    ],
    stock: "stock",
    stockLabel: { fr: "En stock · Kaloum", zh: "现货 · 卡卢姆" },
  },
  {
    slug: "udclub-sweet",
    sku: "KG-PR-305",
    name: "UDCLUB Sweet",
    category: "parfums",
    image: "/catalog/parfums/05/05-main.webp",
    gallery: [
      "/catalog/parfums/05/05-main.webp",
      "/catalog/parfums/05/05-t02.webp",
      "/catalog/parfums/05/05-t03.webp",
      "/catalog/parfums/05/05-t04.webp",
    ],
    blurb: { fr: "Fleuve et sucre · francais", zh: "花漾甜心 · 法式" },
    story: {
      fr: "UDCLUB Sweet, senteur francaise fleur et sucre, tenue longue. La reference feminine qui part le plus vite.",
      zh: "UDCLUB Sweet，法式花果甜心调，持久。女款里走得最快的那支。",
    },
    specs: [
      { label: { fr: "Famille", zh: "香调" }, value: { fr: "Floral sucre, francais", zh: "法式花果甜" } },
      { label: { fr: "Tenue", zh: "持久度" }, value: { fr: "Tenace", zh: "持久" } },
      { label: { fr: "Public", zh: "客群" }, value: { fr: "Femme", zh: "女款" } },
    ],
    moq: 24,
    carton: 12,
    tiers: [
      { min: 24, gnf: 148000 },
      { min: 72, gnf: 128000 },
      { min: 144, gnf: 113000 },
    ],
    stock: "stock",
    stockLabel: { fr: "En stock · Kaloum", zh: "现货 · 卡卢姆" },
  },
  {
    slug: "body-spray",
    sku: "KG-PR-306",
    name: "Body Spray 250",
    category: "parfums",
    image: "/catalog/parfums/06/06-main.webp",
    gallery: [
      "/catalog/parfums/06/06-main.webp",
      "/catalog/parfums/06/06-t02.webp",
      "/catalog/parfums/06/06-t03.webp",
    ],
    blurb: { fr: "250 ml · brume corporelle", zh: "250 ml · 身体喷雾" },
    story: {
      fr: "Body Spray 250, brume parfumee 250 ml. La reference volume qui se vend par carton.",
      zh: "Body Spray 250，250 ml 香氛喷雾。走量的大瓶款，按箱出货。",
    },
    specs: [
      { label: { fr: "Contenance", zh: "容量" }, value: { fr: "250 ml", zh: "250 ml" } },
      { label: { fr: "Type", zh: "类型" }, value: { fr: "Brume corporelle", zh: "身体喷雾" } },
      { label: { fr: "Public", zh: "客群" }, value: { fr: "Mixte", zh: "男女皆可" } },
    ],
    moq: 48,
    carton: 24,
    tiers: [
      { min: 48, gnf: 152000 },
      { min: 144, gnf: 130000 },
      { min: 360, gnf: 112000 },
    ],
    stock: "stock",
    stockLabel: { fr: "En stock · Kaloum", zh: "现货 · 卡卢姆" },
  },
];

export function t(lang: Lang, copy: L): string {
  return copy[lang];
}

export function getProduct(slug: string): Product | undefined {
  return products.find((item) => item.slug === slug);
}

export function categoryById(id: CategoryId) {
  const found = categories.find((item) => item.id === id);
  if (!found) throw new Error(`Unknown category ${id}`);
  return found;
}

export function unitGnf(product: Product, qty: number): number {
  let price = product.tiers[0]?.gnf ?? 0;
  for (const tier of product.tiers) {
    if (qty >= tier.min) price = tier.gnf;
  }
  return price;
}
