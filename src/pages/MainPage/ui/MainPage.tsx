import  { useState } from 'react';
import { Link } from 'react-router-dom';
import { Counter } from '@/entities/Counter';
import { Input } from '@/shared/ui/Input/Input';
import {Text} from "@/shared/ui/Text/Text.tsx";

const MainPage = () => {
    const [value, setValue] = useState('input the')
    return (
        <>
            <div>MainPage</div>
            <Counter />
            <Text />
            <Input placeholder="The place" value={value} onChange={setValue} />
        </>
    );
};

export default MainPage;




