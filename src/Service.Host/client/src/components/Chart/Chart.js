import React from 'react';
import { TableHeaders } from './TableHeaders';

const style = {
    width: '100%',
    borderCollapse: 'collapse'
};

export class Chart extends React.Component {
    render() {
        const { children, ...props } = this.props;

        return (
            <table style={style}>
                <thead>
                    <TableHeaders {...props} />
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        );
    }
}
