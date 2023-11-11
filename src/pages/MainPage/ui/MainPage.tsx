import  { useState } from 'react';

import { Input } from '@/shared/ui/Input/Input';
import {Text} from "@/shared/ui/Text/Text.tsx";

const MainPage = () => {
    const [value, setValue] = useState('input the')
    return (
        <>
            <div>MainPage</div>
            <Text />
            <Input placeholder="The place" value={value} onChange={setValue} />
        </>
    );
};

export default MainPage;




