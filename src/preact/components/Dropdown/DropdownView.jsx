import React from 'react';
import { CheckIcon } from '@heroicons/react/solid';

const SELECTION_MARK_CLASSES = 'w-5 h-5 mr-2 mt-0.5';
const SELECTED_COMPONENT_MAP = {
  [true]: <CheckIcon className={SELECTION_MARK_CLASSES} />,
  [false]: <div className={SELECTION_MARK_CLASSES} />,
};

export default function DropdownView({
  selectedName, selectedDescription, optionList,
}) {
  return (
    <div className="dropdown w-full">
      <div
        tabIndex="0"
        className={
          'items-center select select-bordered '
          + 'w-full truncate grid grid-cols-6 gap-4'
        }
      >
        <div className="col-start-1 col-end-2">
          {selectedName}
        </div>
        <div className="truncate col-start-2 col-end-7">
          <span className="text-sm opacity-50 whitespace-nowrap font-normal">
            {selectedDescription}
          </span>
        </div>
      </div>
      <ul
        tabIndex="0"
        className={
          'p-2 shadow menu dropdown-content '
          + 'bg-base-100 rounded-box w-96'
        }
      >
        {optionList.map(({
          value, name, description, selected, onClick,
        }) => (
          <li key={value}>
            <a role="button" tabIndex="0" onClick={onClick} onKeyUp={onClick}>
              <div className="items-start inline-flex">
                {SELECTED_COMPONENT_MAP[selected]}
                <div className="items-start flex-col">
                  <div className="">
                    {name}
                  </div>
                  <div className="text-sm opacity-50 whitespace-normal">
                    {description}
                  </div>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
