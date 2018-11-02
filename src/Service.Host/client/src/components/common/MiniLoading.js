import React from 'react';

const styles = {
    outer: {
        display: 'inline-block',
        height: '20px',
        margin: '0 20px',
        fontSize: '15px'
    },
    loading: {
        backgroundColor: '#88cbf0',
        height: '100%',
        width: '3px',
        animation: 'stretchdelay 1.2s infinite ease-in-out',
        display: 'inline-block'
    }
};

export class MiniLoading extends React.Component {
    render() {
        return (
            <div style={styles.outer} >
                <div style={{ ...styles.loading }}></div>{' '}
                <div style={{ ...styles.loading, animationDelay: '-1.0s' }}></div>{' '}
                <div style={{ ...styles.loading, animationDelay: '-0.9s' }}></div>{' '}
                <div style={{ ...styles.loading, animationDelay: '-0.8s' }}></div>
            </div>
        );
    }
}