import { Popover as HPopover, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropDownDirection } from '@/shared/types/ui';
import cls from './Popover.module.scss';
import popupCls from '../../styles/popup.module.scss';
import { mapDirectionClass } from '../../styles/consts';

interface PopoverProps {
  className?: string;
  direction?: DropDownDirection;
  trigger: ReactNode;
  children: ReactNode;
}

export function Popover(props: PopoverProps) {
  const { className, trigger, direction = 'bottom', children } = props;

  const menuClasses = [mapDirectionClass[direction]];

  return (
    <HPopover
      className={classNames(cls.Popover, {}, [className, popupCls.popup])}
    >
      <HPopover.Button as="div" className={popupCls.trigger}>
        {trigger}
      </HPopover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <HPopover.Panel className={classNames(cls.panel, {}, menuClasses)}>
          {children}
        </HPopover.Panel>
      </Transition>
    </HPopover>
  );
}

// export function Popover(props: PopoverProps) {
//     const { className, trigger, direction = 'bottom', children } = props;

//     const menuClasses = [mapDirectionClass[direction]];

//     return (
//         <div className="top-16 px-4">
//             <HPopover className="relative">
//                 <HPopover.Button
//                     className={` group inline-flex items-center rounded-md  px-3 py-2 outline-none`}
//                 >
//                     <span>{trigger}</span>
//                 </HPopover.Button>
//                 <Transition
//                     as={Fragment}
//                     enter="transition ease-out duration-200"
//                     enterFrom="opacity-0 translate-y-1"
//                     enterTo="opacity-100 translate-y-0"
//                     leave="transition ease-in duration-150"
//                     leaveFrom="opacity-100 translate-y-0"
//                     leaveTo="opacity-0 translate-y-1"
//                 >
//                     <HPopover.Panel
//                         className={`absolute z-10 mt-3 px-4 ${menuClasses}`}
//                     >
//                         <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
//                             <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
//                                 {children}
//                             </div>
//                         </div>
//                     </HPopover.Panel>
//                 </Transition>
//             </HPopover>
//         </div>
//     );
// }
