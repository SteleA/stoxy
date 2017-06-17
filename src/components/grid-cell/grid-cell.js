import React from 'react';

export default ({size, children}) => {
  return <div className={`demo-cell mdc-layout-grid__cell mdc-layout-grid__cell--span-${size}`}>{children}</div>
}
