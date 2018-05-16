import React from 'react';
import { Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap';
import { range } from 'underscore';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const styles = {
    firstHeader: {
        width: '120px',
        textAlign: 'right',
        borderTop: '1px solid #ccc',
        borderBottom: '1px solid #ccc'
    },
    header: {
        textAlign: 'center',
        padding: '10px 0',
        fontWeight: 'normal',
        borderTop: '1px solid #ccc',
        borderBottom: '1px solid #ccc'
    },
    lastHeader: {
        width: '20px',
        textAlign: 'left',
        borderTop: '1px solid #ccc',
        borderBottom: '1px solid #ccc'
    }
};

export class TableHeaders extends React.Component {
    render() {
        const { months, onPrev, onNext, staticMode = false } = this.props;

        return (
            <tr>
                {!staticMode && <th style={styles.firstHeader}>
                    {onPrev &&
                        <Button bsStyle="link" onClick={() => onPrev()}>
                            <Glyphicon glyph="menu-left" />
                        </Button>
                    }
                </th>}
                {months.map(month => <th key={`${month.month}-${month.year}`} style={styles.header}>{monthNames[month.month - 1]} {month.year}</th>)}
                {!staticMode && onNext &&
                    <th style={styles.lastHeader}>
                        <Button bsStyle="link" onClick={() => onNext()}>
                            <Glyphicon glyph="menu-right" />
                        </Button>
                    </th>
                }
            </tr>
        );
    }
}
