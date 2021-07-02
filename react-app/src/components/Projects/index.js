import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ProjectForm from './ProjectForm';
import { getProjects, deleteProject } from '../../store/projects';

function Projects() {
    const user = useSelector(state => state.session.user);
    const projects = useSelector(state => state.projects);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProjects())
    }, [dispatch] );

    function deleteButton(id) {
        dispatch(deleteProject(id))
    }


    return (
        <>
            { user && <ProjectForm /> }
            { projects && projects.map(project => (
                <div key={ project.id }>
                    <p>{project.name}</p>
                    <button onClick={() => deleteButton(project.id)}>Delete</button>
                </div>
            ))}
        </>
    )
}

export default Projects;
