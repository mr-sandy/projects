import React from 'react';
import { Button, ListGroup, ListGroupItem, Badge } from 'react-bootstrap';
import Activity from './Activity';
import { sortActivitiesMostRecentFirst } from './utility';
import moment from 'moment';

const styles = {
    outer: {
        marginTop: '50px'
    },
    header: {
    },
    button: {
        marginLeft: '10px'
    }
}

const pageSize = 5;

class Activities extends React.Component {
    state = {
        pages: 1
    };

    render() {
        const { project } = this.props;

        const activitiesToShow = pageSize * this.state.pages;
        const activityCount = project.activities.length;

        return (
            <div style={styles.outer}>
                <h3 style={styles.header}>Activities <Badge>{activityCount}</Badge></h3>
                <ListGroup>
                    {project.activities
                        .sort(sortActivitiesMostRecentFirst)
                        .slice(0, activitiesToShow)
                        .map((activity, i) => <Activity activity={activity} key={activity.index} />)
                    }
                </ListGroup>
                {activitiesToShow < activityCount && <Button bsStyle="info" style={{ marginRight: '10px' }} onClick={() => this.handleShowMoreClick()}>Show more</Button>}
                {this.state.pages > 1 && <Button onClick={() => this.handleShowLessClick()}>Show Less</Button>}
            </div>
        );
    }

    handleShowMoreClick() {
        this.setState({ pages: this.state.pages + 1 });
    }

    handleShowLessClick() {
        this.setState({ pages: 1 });
    }
}

export default Activities;