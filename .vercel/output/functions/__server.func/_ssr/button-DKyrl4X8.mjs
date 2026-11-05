import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as cn } from "./router-DwUEE1jl.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-DKyrl4X8.js
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex h-11 items-center justify-center gap-2 px-4 text-sm font-medium transition-colors duration-200 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary", {
	variants: { variant: {
		primary: "bg-primary text-primary-fg hover:bg-primary/90",
		outline: "border border-line bg-surface text-fg hover:border-fg/30",
		ghost: "bg-transparent text-fg hover:bg-fg/5"
	} },
	defaultVariants: { variant: "primary" }
});
function Button({ className, variant, asChild = false, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({ variant }), className),
		type: asChild ? void 0 : type ?? "button",
		...props
	});
}
//#endregion
export { Button as t };
