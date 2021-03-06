﻿import React from 'react';
import { Button, ListGroup, ListGroupItem, Badge, Glyphicon } from 'react-bootstrap';
import ActivityDetails from './ActivityDetails';
import { getActivityDescription } from './utility';
import moment from 'moment';

class Activity extends React.Component {
    state = {
        expanded: false
    };

    render() {
        const { activity } = this.props;

        return activity.employee && (
            <ListGroupItem >
                <div onClick={() => this.handleClick()} style={{ cursor: 'pointer' }}>
                    <Glyphicon glyph={this.state.expanded ? 'chevron-down' : 'chevron-right'} /> <b>{activity.employee.fullName}</b> {getActivityDescription(activity)}
                    <span className="small pull-right text-muted">{moment(activity.activityDate).fromNow()}</span>
                    {this.state.expanded && <ActivityDetails activity={activity} />}
                </div>
            </ListGroupItem>
        );
    }

    handleClick() {
        this.setState({ expanded: !this.state.expanded });
    }
}

export default Activity;