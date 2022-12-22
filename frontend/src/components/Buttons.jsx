import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const Buttons = ({ name }) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      variant={active ? 'secondary' : 'light'}
      className="w-100 rounded-0 text-start "
    >
      <span className="me-1">#</span>
      {name}
    </Button>
  );
};

export default Buttons;