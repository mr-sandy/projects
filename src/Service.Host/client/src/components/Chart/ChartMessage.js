import React from 'react';

export class ChartMessage extends React.Component {
    render() {
        const { message, columns, inhibitProjectName = false } = this.props;
        return (
            <tr>
                {!inhibitProjectName && <td></td>}
                <td style={{textAlign: 'center', padding: '10px'}} colSpan={columns}>
                    {message}
                </td>
                {!inhibitProjectName && <td></td>}
            </tr>
        );
    }
}
