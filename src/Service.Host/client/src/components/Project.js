import React from 'react';
import { Grid, Row, Col, Panel, FormGroup, ControlLabel, FormControl, Label, DropdownButton, MenuItem } from 'react-bootstrap';
import { Chart, ChartDetail } from './Chart';
import Status from './Status';
import moment from 'moment';

class Project extends React.Component {
    render() {
        const { project, chartData } = this.props;

        return (
            <Grid fluid={false}>
                <Row>
                    <Col xs={12}>
                        <h1>{project.name}</h1>
                        <div style={{ float: 'right' }}>
                            <DropdownButton
                                id="projectDropdown"
                                bsStyle="default"
                                title="Actions"
                            >
                                <MenuItem style={{color: 'red'}}>Delete Project</MenuItem>
                            </DropdownButton>
                        </div>
                    </Col>
                </Row>
                <Row style={{ marginTop: '20px' }}>
                    <Col xs={12}>
                        <Chart months={chartData.months} staticMode={true} >
                            <ChartDetail months={chartData.months} project={chartData.project} inhibitProjectName={true} columns={chartData.months.length + 1} />
                        </Chart>
                    </Col>
                </Row>
                <Row style={{ marginTop: '50px' }}>
                    <Col xs={12}>
                        <h3>Phase Details</h3>
                        {project.phases.map(phase => (
                            <div key={phase.phase} style={{ padding: '10px', display: 'inline-block', width: `${100 / project.phases.length}%` }}>
                            {/* <Col  key={phase.phase} xs={12} sm={6} md={4} lg={3} > */}
                                <Panel>
                                    <Panel.Heading><span  style={{fontWeight: 'bold'}}>Phase {phase.phase}</span></Panel.Heading>
                                    <Panel.Body>
                                        <div style={{ padding: '5px 0' }}>
                                            <label style={{ marginBottom: 0 }}>Status</label>
                                            <div style={{ paddingTop: '5px' }}><Status status={phase.status} /></div>
                                        </div>
                                        <div style={{ padding: '5px 0' }}>
                                            <label style={{ marginBottom: 0 }}>Planned</label>
                                            <span style={{ display: 'block' }}>{moment(phase.startDate).format('Do MMM YYYY')} to<br /> {moment(phase.endDate).format('Do MMM YYYY')}</span>
                                        </div>
                                    </Panel.Body>
                                </Panel>

                            </div>
                        ))}
                    </Col>
                </Row>
                <Row style={{ marginTop: '20px' }}>
                    <Col xs={12}>
                        <h3>Documents</h3>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Project;