import React from 'react';

export default function SiderBar(props:any) {
  return (
    <div>
      <h2>Welcome to Main Content</h2>
      {props.children}
    </div>
  );
}
