import React from 'react';
import { IProps } from '@/types';
import './index.less';
import { NavLink } from 'umi';
function PageIndex(props: IProps) {
  return <div className="index-page" >
    <ul className="bg-bubbles">
      {new Array(10).fill(null).map((item: any, index: any) => <li key={index}></li>)}
    </ul>
    <NavLink to="/home" activeClassName="active" className='home-btn'>点击进入 Home</NavLink>
    {props.children}
  </div>;
}

export default PageIndex;
