﻿import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Breadcrumbs from '../containers/Breadcrumbs';

class Navigation extends React.Component {

    render() {
        return (
            <Grid className="header" fluid={false}>
                <Row>
                    <Col xs={12}>
                        <Breadcrumbs />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Navigation;
