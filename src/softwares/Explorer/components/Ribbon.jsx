import { memo } from 'react';
import { GrCopy, GrDocument } from 'react-icons/gr';
import { MdContentPaste } from 'react-icons/md';
import { IoIosCut } from 'react-icons/io';
import { ImCross } from 'react-icons/im';
import { BiRename } from 'react-icons/bi';
import { BsGrid, BsGridFill } from 'react-icons/bs';
import { GoPencil } from 'react-icons/go';

import './Ribbon.scss';
import { useState } from 'react';


const CategoryClipboard = () => (
  <div className='Explorer-ribbon-category'>
    <div className='Explorer-ribbon-category-buttons'>

      <div className='Explorer-ribbon-category-item'>
        <div className='Explorer-ribbon-category-item-icon'>
          <GrCopy />
        </div>
        <div className='Explorer-ribbon-category-item-label'>
          Copy
        </div>
      </div>

      <div className='Explorer-ribbon-category-item'>
        <div className='Explorer-ribbon-category-item-icon'>
          <MdContentPaste fill='firebrick' />
        </div>
        <div className='Explorer-ribbon-category-item-label'>
          Paste
        </div>
      </div>

      <div className='Explorer-ribbon-category-item'>
        <div className='Explorer-ribbon-category-item-icon'>
          <IoIosCut />
        </div>
        <div className='Explorer-ribbon-category-item-label'>
          Cut
        </div>
      </div>

    </div>
    <div className='Explorer-ribbon-category-label'>
      Clipboard
    </div>
  </div>
);


const CategoryOrganize = ({ onDeleteItem, onRenameItem, ...props }) => (
  <div className='Explorer-ribbon-category' {...props}>
    <div className='Explorer-ribbon-category-buttons'>
      <div className='Explorer-ribbon-category-item' onClick={onDeleteItem}>
        <div className='Explorer-ribbon-category-item-icon'>
          <ImCross fill='crimson' />
        </div>
        <div className='Explorer-ribbon-category-item-label'>
          Delete
        </div>
      </div>
      <div className='Explorer-ribbon-category-item' onClick={onRenameItem}>
        <div className='Explorer-ribbon-category-item-icon'>
          <BiRename fill='blue' />
        </div>
        <div className='Explorer-ribbon-category-item-label'>
          Rename
        </div>
      </div>
    </div>
    <div className='Explorer-ribbon-category-label'>
      Organize
    </div>
  </div>
);



const CategoryNew = ({ onCreate }) => (
  <div className='Explorer-ribbon-category'>
    <div className='Explorer-ribbon-category-buttons'>
      <div className='Explorer-ribbon-category-item' onClick={() => onCreate(true)}>
        <div className='Explorer-ribbon-category-item-icon'>
          <img src={process.env.PUBLIC_URL + '/icons/MiFolder.svg'} />
        </div>
        <div className='Explorer-ribbon-category-item-label'>
          New Folder
        </div>
      </div>
      <div className='Explorer-ribbon-category-item' onClick={() => onCreate(false)}>
        <div className='Explorer-ribbon-category-item-icon'>
          <GrDocument />
        </div>
        <div className='Explorer-ribbon-category-item-label'>
          New Item
        </div>
      </div>
    </div>
    <div className='Explorer-ribbon-category-label'>
      New
    </div>
  </div>
);


const CategoryOpen = () => (
  <div className='Explorer-ribbon-category'>
    <div className='Explorer-ribbon-category-buttons'>
      <div className='Explorer-ribbon-category-item'>
        <div className='Explorer-ribbon-category-item-icon'>
          <GoPencil />
        </div>
        <div className='Explorer-ribbon-category-item-label'>
          Open
        </div>
      </div>
    </div>
    <div className='Explorer-ribbon-category-label'>
      Open
    </div>
  </div>
);


const CategorySelect = () => (
  <div className='Explorer-ribbon-category'>
    <div className='Explorer-ribbon-category-buttons'>
      <div className='Explorer-ribbon-category-item'>
        <div className='Explorer-ribbon-category-item-icon'>
          <BsGridFill fill='mediumblue' />
        </div>
        <div className='Explorer-ribbon-category-item-label'>
          Select all
        </div>
      </div>
      <div className='Explorer-ribbon-category-item'>
        <div className='Explorer-ribbon-category-item-icon'>
          <BsGrid stroke='mediumblue' />
        </div>
        <div className='Explorer-ribbon-category-item-label'>
          Select none
        </div>
      </div>
    </div>
    <div className='Explorer-ribbon-category-label'>
      Select
    </div>
  </div>
);


const ExplorerRibbon = ({
  disableAll,
  currentDir,
  selectedItems,
  onCreateItem,
  onRenameItem,
  onDeleteItem,
}) => {

  console.log(selectedItems)

  return (
    <div className='Explorer-ribbon' disabled={disableAll}>
      <CategoryClipboard />

      <CategoryOrganize
        disabled={
          selectedItems.length === 0
          || (selectedItems.length === 1 && selectedItems[0] === '_new')
        }
        onDeleteItem={onDeleteItem}
        onRenameItem={onRenameItem} />

      <CategoryNew
        onCreate={(isDir) => onCreateItem(isDir)} />

      <CategoryOpen />
      <CategorySelect />
    </div>
  );
};


export default ExplorerRibbon;