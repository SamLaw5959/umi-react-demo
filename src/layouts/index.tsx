import React from 'react';
import { IProps } from '@/types'
function layouts(props: IProps) {
    return <div>{props.children}</div>;
}
export default layouts;
