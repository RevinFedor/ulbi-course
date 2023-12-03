import { DropDownDirection } from '../../../types/ui';

//! динамически задаем направление выпадающего списка, полчуаея ключ из props
export const mapDirectionClass: Record<DropDownDirection, string> = {
  bottom: '',
  top: ' bottom-full',
  'bottom left': 'right-0 top-full',
  'bottom right': 'left-0 top-full',
  'top right': 'left-0 bottom-full',
  'top left': 'right-0 bottom-full',
};
