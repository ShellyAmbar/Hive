import {useEffect, useState} from 'react';
import {Item} from '../interfaces';

const usePicker = (defaultSelectedItemIndex: number, data: Item[]) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  useEffect(() => {
    console.log('defaultSelectedItemIndex --', defaultSelectedItemIndex);

    setSelectedItem(data[defaultSelectedItemIndex]);
  }, [defaultSelectedItemIndex]);

  return {
    isOpen,
    setIsOpen,

    selectedItem,
    setSelectedItem,
  };
};

export default usePicker;
