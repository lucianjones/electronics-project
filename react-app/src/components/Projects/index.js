import React from 'react';
import { useSelector } from 'react-redux';

import ProjectForm from './ProjectForm';
import { getProjects } from '../../store/projects';

function Projects() {
    const user = useSelector(state => state.session.user)
    const projects = useSelector(state => state.projects)
    console.log(projects)
    return (
        <>
        </>
    )
}

export default Projects;
