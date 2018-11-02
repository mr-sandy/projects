import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';

const toTitleCase = str => {
    return str.replace('-', ' ').replace(/([^\W_]+[^\s-]*) */g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}
const BreadcrumbItem = ({ caption, href, onClick }) => (
    <Breadcrumb.Item href={href} onClick={e => onClick(e)} >
        {toTitleCase(caption)}
    </Breadcrumb.Item>
);

class Breadcrumbs extends Component {

    render() {
        const { location, history, rootPathLength = 1 } = this.props

        const crumbs = location.pathname
            .split('/')
            .reduce((sofar, crumb, i, crumbs) => {
                const path = crumbs.slice(0, i + 1);
                const href = path.join('/') || '/';

                const handleClick = e => {
                    // we should just let the browser handle any paths 
                    // shorter than our root path, e.g.the 'Home' path
                    if (path.length > rootPathLength) {
                        e.preventDefault();
                        history.push(href);
                    }
                };

                return [
                    ...sofar,
                    <BreadcrumbItem key={i} caption={crumb || 'Home'} href={href} onClick={e => handleClick(e)} />
                ];
            }, []);

        return (
            <Breadcrumb>
                {crumbs}
            </Breadcrumb>
        );
    }
}

export default Breadcrumbs;
