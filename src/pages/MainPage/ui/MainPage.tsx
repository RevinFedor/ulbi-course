import { useState } from 'react';

import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';
import { Page } from '@/widgets/Page';
import { Listbox } from '@/shared/ui/Popups';
import { RatingCard } from '@/entities/Rating';

const MainPage = () => {
  const [value, setValue] = useState('input the');
  return (
    <Page>
      <Text />
      <Input placeholder="The place" value={value} onChange={setValue} />
      <Listbox />
      это то что мы не сохраняли
    </Page>
  );
};

export default MainPage;
