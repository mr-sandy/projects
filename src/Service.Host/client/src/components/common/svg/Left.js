import React from 'react';

const style = ({ colour = '#333' }) => (
    {
        stroke: colour,
        fill: colour
    }
);

export class Left extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" style={style(this.props)}>
                <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
            </svg>
        );
    }
}