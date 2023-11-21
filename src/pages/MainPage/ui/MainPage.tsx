import  { useState } from 'react';

import { Input } from '@/shared/ui/Input/Input';
import {Text} from "@/shared/ui/Text/Text.tsx";
import { Page } from '@/widgets/Page/Page';

const MainPage = () => {
    const [value, setValue] = useState('input the')
    return (
        <Page>
            <div>MainPage</div>
            <Text />
            <Input placeholder="The place" value={value} onChange={setValue} />
        </Page>
    );
};

export default MainPage;




