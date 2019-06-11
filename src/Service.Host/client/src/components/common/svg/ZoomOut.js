﻿import React from 'react';

const style = {
    stroke: '#337ab7',
    fill: '#337ab7'
};

export class ZoomOut extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style={style}>
                <path d="M13 10h-8v-2h8v2zm8.172 14l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z" />
            </svg>
        );
    }
}