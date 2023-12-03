import { Fragment } from 'react';
import { Listbox as HListbox, Transition } from '@headlessui/react';

import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import cls from './Listbox.module.scss';
import { mapDirectionClass } from '../../styles/consts';
import { DropDownDirection } from '@/shared/types/ui';
import { classNames } from '@/shared/lib/classNames/classNames';

//! аналог селектора - выпадающий список
export interface ListBoxItem<T extends string> {
  value: T;
  content: string;
}

//! value как динамическое значение
interface ListBoxProps<T extends string> {
  className?: string;
  label?: string;
  options?: ListBoxItem<T>[];
  value?: T;
  onChange?: (value: T) => void;
  readonly?: boolean;
  direction?: DropDownDirection;
}

//! джинерики хуенерики я сам не ебу че эт
export const Listbox = <T extends string>(props: ListBoxProps<T>) => {
  const { className, label, options, value, onChange, readonly, direction = 'bottom' } = props;

  const optionsClasses = [mapDirectionClass[direction]];

  return (
    <div className={classNames(cls.Top, {}, [className])}>
      {label && <span className="mr-2">{`${label}>`}</span>}
      <HListbox value={value} onChange={onChange} disabled={readonly}>
        <div className="relative mt-1">
          <HListbox.Button className={cls.hitbox_btn}>
            <span className={cls.hitbox_btn_value}>{value}</span>
            <span className={cls.hitbox_btn_arrows}>
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </HListbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <HListbox.Options className={`${optionsClasses} ${cls.listbox_options}`}>
              {options?.map((opt, optIdx) => (
                <HListbox.Option
                  key={optIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`}
                  value={opt.value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate  ${selected ? 'font-medium' : 'font-normal'}`}
                      >
                        {opt.content}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </HListbox.Option>
              ))}
            </HListbox.Options>
          </Transition>
        </div>
      </HListbox>
    </div>
  );
};
