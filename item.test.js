import { RLE } from './rle.js';
import { Inventory, Item } from './item.js';
import { describe, it, expect, beforeAll, beforeEach } from 'vitest'

describe('Inventory', () => {


	it("Init ", () => {
		let inventory = new Inventory();
		let item = new Item(1,"Potion");
		inventory.addItem(item);
		expect(inventory.maxSlots).toBe(50);
		expect(inventory.slots[0]).toEqual(item);
	})

	it("add item with full inventory", () => {
		let inventory = new Inventory();
		inventory.maxSlots = 2;
		for(let i = 0 ; i < 50; i++ ){
			let item = new Item(1 + i, "Potion");
			inventory.addItem(item)
		}
		
		let item2 = new Item(2, "Epee");

		expect(() => { 
			inventory.addItem(item2)
		}).toThrow('Inventory full');


	})

	it("remove item by id", () => {
		let inventory = new Inventory();

		expect(() => { 
			inventory.removeItemById(10);
		}).toThrow();

		let item  = new Item(1, "Potion");
		inventory.addItem(item);
		inventory.removeItemById(1);

		expect(inventory.slots[0]).toBeNull();

		expect(() => { 
			inventory.removeItemById(1);
		}).toThrow();
		
	})

	it("get item", () => {
		let inventory = new Inventory();


		let item  = new Item(1, "Potion");
		inventory.addItem(item);

		expect(inventory.getItem(0)).toEqual(item);

		expect(inventory.getItem(5)).toBeNull();
		
	})

	it("remove item by name", () => {
		let inventory = new Inventory();


		let item  = new Item(1, "Potion");
		inventory.removeItemByName("Potion", 1);

		expect(inventory.getItem(0)).toBeNull();

		item = new Item(4, "Potion")
		inventory.addItem( new Item(2, "Potion"))
		inventory.addItem( new Item(3, "Potion"))
		inventory.addItem(item )

		inventory.removeItemByName("Potion", 2);
		expect(inventory.getItem(1)).toBeNull();
		expect(inventory.getItem(2)).toEqual(item);
	})

	it("swap item", () => {
		let inventory = new Inventory();


		let item  = new Item(1, "Potion");
		let item2  = new Item(2, "Epee");
		inventory.addItem(item);
		inventory.addItem(item2);

		inventory.swapItems(0,1);

		expect(inventory.getItem(0)).toEqual(item2);
		expect(inventory.getItem(1)).toEqual(item);

		inventory.swapItems(2,1);

		expect(inventory.getItem(2)).toEqual(item);
		expect(inventory.getItem(1)).toBeNull();
	})

	it("count ", () => {
		let inventory = new Inventory();


		let item  = new Item(1, "Potion");
		let item2  = new Item(2, "Epee");
		inventory.addItem(item);
		inventory.addItem(new Item(3, "Potion"));
		inventory.addItem(item2);

		expect(inventory.countItemByName("Potion")).toEqual(2);
		expect(inventory.countItemByName("Epee")).toEqual(1);
		expect(inventory.countItemByName("Bouclier")).toEqual(0);
	})

	it("count items ", () => {
		let inventory = new Inventory();


		let item  = new Item(1, "Potion");
		let item2  = new Item(2, "Epee");
		inventory.addItem(item);
		inventory.addItem(new Item(3, "Potion"));
		inventory.addItem(item2);


		expect(inventory.getItemsCount()).toEqual({
			"Potion" : 2,
			"Epee" : 1
		});
	})

});
