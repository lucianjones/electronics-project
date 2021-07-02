import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postProject } from '../../store/projects';

function ProjectForm() {
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    function submitForm(e) {
        e.preventDefault();
        const form = {
            name: name,
            user_id: user.id,
        }
        const response = dispatch(postProject(form));
        if (response.errors) {
            setErrors(response.errors);
        }
        setName('')
    };

    function updateName(e) {
        setName(e.target.value);
    };

    return ( 
        <>
            <form onSubmit={submitForm}>
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        name='name'
                        type='text'
                        placeholder='Name'
                        value={name}
                        onChange={updateName}
                    />
                    <button type='submit'>Create</button>
                </div>
            </form>
        </>
    )
}

export default ProjectForm;
