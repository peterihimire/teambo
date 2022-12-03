import { useState } from 'react';

const useToggle = () => {
    const [on, setToggle] = useState(false)

    const toggle = ()  => setToggle(prev => !prev)

    return {on, toggle}

}

export default useToggle
