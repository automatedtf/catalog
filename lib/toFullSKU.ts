import { EconItem, parseEconItem, schema } from "tf2-item-format";
import { toBaseSKU } from "./toBaseSKU";
import { getSheenEnum } from "./enums/Sheen";
import { getKillstreakerEnum } from "./enums/Killstreaker";
import { SKUPrefix } from "./enums/SKUPrefix";
import { getSpellDefindex } from "./enums/Spell";
import { getPartDefindex } from "./enums/Part";

/**
 * Return full SKU of EconItem
 */
export function toFullSKU(econItem: EconItem): string {
	const { paint, parts, spells, sheen, killstreaker, tradable } = parseEconItem(econItem, true, true);
	let sku = toBaseSKU(econItem);

	function attachToSKU(component) {
		sku = `${sku};${component}`;
	}
    
	if (paint != null) attachToSKU(`${SKUPrefix.Paint}${schema.getDefindex(paint)}`);

	if (parts != null) {
		const partsDefindices = [];
		for (const part of parts) partsDefindices.push(getPartDefindex(`Strange Part: ${part}`));
		partsDefindices.sort();
		for (const partDefindex of partsDefindices) {
			if (partDefindex == null) continue; // skip default parts
			attachToSKU(`${SKUPrefix.Part}${partDefindex}`);
		}
	}

	if (spells != null) {
		const spellsDefindices = [];
		for (const spell of spells) spellsDefindices.push(getSpellDefindex(`Halloween Spell: ${spell}`));
		spellsDefindices.sort();
		for (const spellDefindex of spellsDefindices) attachToSKU(`${SKUPrefix.Spell}${spellDefindex}`);
	}

	if (sheen != null) attachToSKU(`${SKUPrefix.Sheen}${getSheenEnum(sheen)}`);
	if (killstreaker != null) attachToSKU(`${SKUPrefix.Killstreaker}${getKillstreakerEnum(killstreaker)}`);

	if (!tradable) attachToSKU("untradable");

	return sku;
}