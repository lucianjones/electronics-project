const GET_PROJECTS = 'projects/GET_PROJECTS';
const GET_PROJECT = 'projects/GET_PROJECT';
const POST_PROJECT = 'projects/POST_PROJECT';
const PUT_PROJECT = 'projects/PUT_PROJECT';
const DELETE_PROJECT = 'projects/DELETE_PROJECT';

const get_projects = (projects) => ({
    type: GET_PROJECTS,
    payload: projects,
});

const get_project = (project) => ({
    type: GET_PROJECT,
    payload: project,
});

const post_project = (project) => ({
    type: POST_PROJECT,
    payload: project,
});

const put_project = (project) => ({
    type: PUT_PROJECT,
    payload: project,
});

const delete_project = (project) => ({
    type: DELETE_PROJECT,
    payload: project,
});


export const getProjects = () => async (dispatch) => {
    const response = await fetch('/api/projects', {
        headers: { 'Content-Type' : 'application/json' }
    });

    const result = await response.json();
    if (result.errors) { return result.errors };

    dispatch(get_projects(result.projects));
    return;
};

export const getProject = (id) => async (dispatch) => {
    const response = await fetch(`/api/projects/${id}`, {
        headers: { 'Content-Type' : 'application/json' }
    });

    const result = await response.json();
    if (result.errors) { return result.errors };

    dispatch(get_project(result));
    return;
};

export const postProject = (form) => async (dispatch) => {
    const response = await fetch('/api/projects/new', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
    });

    const result = await response.json();
    if (result.errors) { return result.errors };

    dispatch(post_project(result));
    return;
};

export const putProject = (form, id) => async (dispatch) => {
    const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type' : 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
    });

    const result = await response.json();
    if (result.errors) { return result.errors };

    dispatch(put_project(result));
    return;
};

export const deleteProject = (id) => async (dispatch) => {
    const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        header: { 'Content-Type' : 'application/json' },
        credentials: 'include',
    });

    const result = await response.json();
    if (result.errors) { return result.errors };

    dispatch(delete_project(result));
    return;
}

export default function projects(state = [], action) {
    switch (action.type) {
        case GET_PROJECTS:
            /* const projects = {};

            action.payload.forEach((project) => {
                projects[project.id] = project;
            });

            return { ...state, ...projects };
            */

            return [...action.payload ]

        case GET_PROJECT:
            return { project :  action.payload } ;

        case POST_PROJECT:
            return [ ...state, action.payload ];

        case PUT_PROJECT:
            return [ ...state, action.payload ];

        case DELETE_PROJECT:
            state = state.filter(({ id }) => id !== action.payload.id)
            return [ ...state ];
        
        default:
            return state;
    }
}





