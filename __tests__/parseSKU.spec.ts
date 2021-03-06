import { parseSKU } from "../lib/parseSKU";

test("parse a tradable unsual sku", () => {
	const sku = "30187;5;u14;uncraftable";
	const parsed = parseSKU(sku);

	expect(parsed).toEqual({
		defindex: 30187,
		quality: 5,
		craftable: false,
		effect: 14,
		tradable: true
	});
});

test("parse an untradable unusual sku", () => {
	const sku = "30187;5;u14;uncraftable;untradable";
	const parsed = parseSKU(sku);

	expect(parsed).toEqual({
		defindex: 30187,
		quality: 5,
		craftable: false,
		effect: 14,
		tradable: false
	});
});

test("parse an untradable non-unusual sku", () => {
	const sku = "5936;6;untradable";
	const parsed = parseSKU(sku);

	expect(parsed).toEqual({
		defindex: 5936,
		craftable: true,
		quality: 6,
		tradable: false
	});
});