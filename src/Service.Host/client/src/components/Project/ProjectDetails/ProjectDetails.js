import React from 'react';
import { Button } from 'react-bootstrap';
import { MiniLoading } from '../../common';
import ProjectDetailsEditor from './ProjectDetailsEditor';
import moment from 'moment';

class ProjectDetails extends React.Component {
    state = {
        editing: false,
        projectName: this.props.project.name,
        startDate: moment(this.props.project.startDate)
    };

    render() {
        const { updating, project, canEdit } = this.props;

        return this.state.editing
            ? (
                <ProjectDetailsEditor
                    project={project}
                    onCancel={() => this.handleCancelEditClick()}
                    onChange={(name, startDate) => this.handleChange(name, startDate)} />
            )
            : (
                <React.Fragment>
                    <h1>{project.name} {updating && <MiniLoading />}</h1>
                    <span className="lead">Project start: {moment(project.startDate).format('Do MMM YYYY')}</span>
                    {canEdit && <Button style={{ float: 'right' }} onClick={e => this.handleEditClick()}>Edit</Button>}
                </React.Fragment>
            );
    }

    handleEditClick() {
        this.setState({ editing: true });
    }

    handleCancelEditClick() {
        this.setState({ editing: false });
    }

    handleChange(name, startDate) {
        const { updateProject, project } = this.props;

        this.setState({ editing: false });

        updateProject(project.id, name, startDate);
    }
}

export default ProjectDetails;