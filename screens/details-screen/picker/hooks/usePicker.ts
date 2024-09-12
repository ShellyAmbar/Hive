import {useEffect, useState} from 'react';
import {Item} from '../interfaces';

const usePicker = (defaultSelectedItemIndex: number, data: Item[]) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  useEffect(() => {
    data?.length > 0 &&
      data[defaultSelectedItemIndex] &&
      setSelectedItem(data[defaultSelectedItemIndex]);
  }, [data, defaultSelectedItemIndex]);

  return {
    isOpen,
    setIsOpen,

    selectedItem,
    setSelectedItem,
  };
};

export default usePicker;
