import React from 'react';
import { Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap';
import { Chart, ChartDetail, ChartMessage } from './Chart';
import { LinkContainer } from 'react-router-bootstrap';

class Dashboard extends React.Component {
    render() {
        const { chartData, viewEarlierDashboard, viewLaterDashboard, zoomIn, zoomOut } = this.props;

        return (
            <Grid fluid={false}>
                <Row>
                    <Col xs={12}>
                        <h1>Project Dashboard</h1>
                        <div>
                            <Button bsStyle="link" style={{ float: 'right', outline: 'none', padding: '6px' }} onClick={() => zoomIn()}>
                                <Glyphicon glyph="zoom-in" />
                            </Button>
                            <Button bsStyle="link" style={{ float: 'right', outline: 'none', padding: '6px' }} onClick={() => zoomOut()}>
                                <Glyphicon glyph="zoom-out" />
                            </Button>
                        </div>
                        <Chart months={chartData.months} onPrev={() => viewEarlierDashboard()} onNext={() => viewLaterDashboard()}>
                            {chartData.projects.length > 0
                                ? chartData.projects.map(project => <ChartDetail key={project.name} months={chartData.months} project={project} columns={chartData.months.length} />)
                                : <ChartMessage columns={chartData.months.length} message="No projects at this time" />
                            }
                        </Chart>
                        <LinkContainer style={{ marginTop: '40px' }} to={'/projects/new'}>
                            <Button bsStyle="success">Add Project &nbsp;&nbsp;<Glyphicon glyph="plus" /></Button>
                        </LinkContainer >
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Dashboard;