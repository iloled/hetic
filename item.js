
export class Inventory
{
  constructor()
  {
    this.maxSlots = 50;
    this.slots = new Array(this.maxSlots).fill(null);
  }

  getItem(position)
  {
    return this.slots[position];
  }

  removeItemByName(name, quantity)
  {
    for (let i = 0; i < this.slots.length; i++)
    {
      let item = this.slots[i];
      if ( item != null && item.name == name)
      {
        this.slots[i] = null;
        quantity --;
      }

      if( quantity == 0 )
        return;
    }

    console.warn("quantity bigger than items in inventory")
  }

  removeItemById(itemId)
  {
    for(let i = 0; i < this.slots.length; i++ )
    {
      let item = this.slots[i];

      if ( item != null && item.id == itemId )
      {
        this.slots[i] = null;
        return;
      }
    }
    
    throw new Error(`Item ${itemId} not found`);
  }

  addItem(item)
  {
    for (let index in this.slots)
    {
      let slot = this.slots[index];

      if (slot == null )
      {
        this.slots[index] = item;
        return;
      }
    }



    throw new Error(`Inventory full`);
  }

  swapItems(index1, index2)
  {
    let tmp = this.slots[index1];
    this.slots[index1] = this.slots[index2];
    this.slots[index2] = tmp;
  }
  
  countItemByName(name)
  {
    let count = 0;

    for( let i = 0; i < this.slots.length; i++ )
    {
      if(this.slots[i] != null && name == this.slots[i].name) 
      {
        count ++;
      }
    }
    return count;
  }

  getItemsCount()
  {
    let result = {};
    for( let i = 0; i < this.slots.length; i++ )
    {
      let item = this.slots[i];

      if ( item == null )
      {
        continue;
      }
      
      if( result[item.name] == null) 
      {
        result[item.name] = 1;
      }
      else
      {
         result[item.name] ++;
      }
    }

    return result;
  }
}

export class Item
{
  constructor(id, name)
  {
    this.id = id;
    this.name = name;
  }
}

