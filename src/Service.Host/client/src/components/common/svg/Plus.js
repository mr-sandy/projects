import React from 'react';

const style = {
    stroke: '#4cae4c',
    fill: '#4cae4c',
    marginRight: '4px'
};

export class Plus extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" style={style}>
                <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
            </svg>
        );
    }
}