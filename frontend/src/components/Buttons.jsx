import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

export const Buttons = ({name}) => {
    const [active, setActive] = useState(false);

    const handleClick = () => {
      setActive(!active);
    };

  return (
    <Button type="button"
        onClick={handleClick}
        variant={active ? "secondary" : "light" }
        className="w-100 rounded-0 text-start ">
        <span class="me-1">#</span>
        {name}
     </Button>
  )
}










 /*<ul class="nav flex-column nav-pills nav-fill px-2">
 {channels.map((channel)=>  
 <li key={channel.id}
 class="nav-item w-100">
      <Button type="button"
       onClick={handleClick}

       variant={active ? "secondary" : "light" }
      
       className="w-100 rounded-0 text-start ">
        <span class="me-1">#</span>
        {channel.name}
        </Button>
        </li>
        )}
          </ul>*/
