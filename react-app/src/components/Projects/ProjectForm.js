import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postProject } from '../../store/projects';

function ProjectForm() {
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();




    return ( <></> )
}

export default ProjectForm;
