import { Menu, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { AppLink } from '../../../AppLink/AppLink';
import cls from './DropMenu.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import popusCls from '../../styles/popup.module.scss';
import { DropDownDirection } from '@/shared/types/ui';

interface DropMenuItem {
  disabled?: boolean;
  content?: ReactNode;
  onClick?: () => void;
  href?: string;
}
interface DropMenuProps {
  className?: string;
  items: DropMenuItem[];
  direction?: DropDownDirection;
  trigger: ReactNode;
}
export const DropMenu = (props: DropMenuProps) => {
  const { items, trigger, className, direction } = props;

  return (
    <div className="ml-auto">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            {trigger}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            {items.map((item, index) => (
              <div className="px-1 py-1" key={`menu index - ${index}`}>
                <Menu.Item>
                  {({ active }) => {
                    const content = (
                      <button
                        type="button"
                        disabled={item.disabled}
                        onClick={item.onClick}
                        className={classNames(cls.item, {
                          [popusCls.active]: active,
                        })}
                      >
                        {item.content}
                      </button>
                    );
                    //! если это ссылка, то будет AppLink
                    if (item.href) {
                      return (
                        <Menu.Item
                          as={AppLink}
                          to={item.href}
                          disabled={item.disabled}
                        >
                          {content}
                        </Menu.Item>
                      );
                    }
                    //! если не ссылка то просто кнопка ()
                    return (
                      <Menu.Item as={Fragment} disabled={item.disabled}>
                        {content}
                      </Menu.Item>
                    );
                  }}
                </Menu.Item>
              </div>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
