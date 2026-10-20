import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { E as Check, b as Eye, x as EyeOff } from "../_libs/lucide-react.mjs";
import { n as CheckboxIndicator, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { L as cn } from "./router-VYkCRKPL.mjs";
import { n as RadioGroupItem, t as RadioGroup } from "../_libs/radix-ui__react-radio-group.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/field-C15Y9Fi1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var fieldClass = "min-h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink outline-none placeholder:text-ink-soft focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30 disabled:opacity-60";
function Label({ htmlFor, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		htmlFor,
		className: cn("text-sm font-medium text-ink", className),
		children
	});
}
function Field({ label, htmlFor, error, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor,
				children: label
			}),
			children,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				id: `${htmlFor}-error`,
				className: "text-sm text-danger",
				role: "alert",
				children: error
			}) : hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				id: `${htmlFor}-hint`,
				className: "text-sm text-ink-soft",
				children: hint
			}) : null
		]
	});
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn(fieldClass, className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn(fieldClass, "min-h-28 resize-y py-2 leading-6", className),
		...props
	});
}
function Select({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		className: cn(fieldClass, className),
		...props,
		children
	});
}
function PasswordInput({ id, className, ...props }) {
	const [visible, setVisible] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			id,
			className: cn(fieldClass, "pr-12", className),
			type: visible ? "text" : "password",
			...props
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "absolute top-1/2 right-1 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-md text-ink-soft hover:text-ink",
			onClick: () => setVisible((value) => !value),
			"aria-label": visible ? "Hide password" : "Show password",
			"aria-pressed": visible,
			children: visible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
		})]
	});
}
function Checkbox({ checked, onCheckedChange, label, id }) {
	const autoId = (0, import_react.useId)();
	const fieldId = id ?? autoId;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		htmlFor: fieldId,
		className: "flex items-start gap-3 text-sm leading-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
			id: fieldId,
			checked,
			onCheckedChange: (value) => onCheckedChange(value === true),
			className: "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-sm border border-line bg-surface data-[state=checked]:border-brand data-[state=checked]:bg-brand",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 text-brand-foreground" }) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
	});
}
function RadioCards({ value, onValueChange, name, options }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup, {
		name,
		value,
		onValueChange,
		className: "grid gap-3",
		"aria-label": name,
		children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: cn("flex cursor-pointer gap-3 rounded-lg border bg-surface p-4", value === option.value ? "border-brand ring-2 ring-brand/20" : "border-line"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
				value: option.value,
				className: "mt-1 size-4 shrink-0 rounded-full border border-line bg-surface data-[state=checked]:border-accent data-[state=checked]:bg-accent"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block font-medium",
				children: option.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 block text-sm text-ink-soft",
				children: option.body
			})] })]
		}, option.value))
	});
}
//#endregion
export { RadioCards as a, PasswordInput as i, Field as n, Select as o, Input as r, Textarea as s, Checkbox as t };
