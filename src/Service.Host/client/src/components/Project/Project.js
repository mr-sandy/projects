import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Loading } from '../common';
import ProjectDetails from './ProjectDetails';
import ProjectTimeline from './ProjectTimeline';
import Phases from './Phases';
import Activities from './Activities';
import DangerZone from './DangerZone';

class Project extends React.Component {
    render() {
        const { loading, project } = this.props;

        if (loading || !project) {
            return <Loading />;
        }

        return (
            <Grid fluid={false} style={{ paddingBottom: '100px' }}>
                <Row>
                    <Col xs={12}>
                        <ProjectDetails {...this.props} />
                        <ProjectTimeline {...this.props} />
                        <Phases {...this.props} />
                        <Activities {...this.props} />
                        <DangerZone {...this.props} />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Project;