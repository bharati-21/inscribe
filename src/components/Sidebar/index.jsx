import { HomeOutlined, LabelOutlined, ArchiveOutlined, DeleteOutlineOutlined, AccountCircleOutlined, Logout, Close } from '@mui/icons-material/';


import {v4 as uuid} from 'uuid';
import { Link, useNavigate } from 'react-router-dom';

import './sidebar.css';
import { useAuth, useNotes } from 'contexts/';


const Sidebar = () => {

    const navigate = useNavigate();
    const { authDispatch, authUser, isAuth } = useAuth();
    const { notesDispatch } = useNotes();

    const sidebarSections = [
        {
            key: uuid(),
            icon: <HomeOutlined />,
            name: 'Home',
            path: '/'
        },
        {
            key: uuid(),
            icon: <LabelOutlined />,
            name: 'Labels',
            path: '/labels'
        },
        {
            key: uuid(),
            icon: <ArchiveOutlined />,
            name: 'Archive',
            path: '/archive'
        },
        {
            key: uuid(),
            icon: <DeleteOutlineOutlined />,
            name: 'Trash',
            path: 'trash'
        },
        {
            key: uuid(),
            icon: <AccountCircleOutlined />,
            name: 'Profile',
            path: 'profile'
        },
    ];

    const { showSidebar, handleShowSidebar } = useNotes();

    const mappedSections = sidebarSections.map(({ key, icon, name, path}) => (
        <h6 key={key} className="aside-link-wrapper">
            <Link to={path} className="btn btn-link">
                <span className="icon mui-icon aside-section-icon">
                    {icon}
                </span>
                {name}
            </Link>
        </h6>
    ));


    const handleCreateNote = () => {
        notesDispatch({ 
            action: {
                type: 'SHOW_NEW_NOTE_FORM',
                payload: { showNewNoteForm: true, isEditing: null, editingNoteId: -1}
            }
        })
    }

    const handleLogout = () => {
        localStorage.removeItem("inscribe-token");
		localStorage.removeItem("inscribe-user");

        authDispatch({ action: {type: 'RESET_AUTH', payload: {authToken: '', isAuth: false, authLoading: false, authError: null, authUser: {}}}});
        navigate('/login');
    }

    if(!isAuth) return null;

    return (
        <aside className="sidebar flex-col flex-justify-between">
            { 
                showSidebar && <button className="btn btn-icon btn-sidebar-close" onClick={handleShowSidebar}>
                    { <Close fontSize="large" /> }
                </button>
            } 
            <section className="sidebar-nav-links flex-col">
                { mappedSections }
                <button className="btn btn-primary btn-new-note btn-full-width px-0-75 py-0-25 mt-1-5 text-reg" onClick={handleCreateNote}>Create new note</button>
            </section>
            <section className="sidebar-footer flex-row flex-align-center flex-justify-between flex-wrap">
                <article className="user-info flex-row flex-align-center">
                    <img src="https://elixir-ui.netlify.app/Components/assets/avatar-1.jpg" alt="Extra Small Size Avatar" className="avatar avatar-xs user-avatar" />
                    <p className="user-name text-sm">{authUser.firstName} {authUser.lastName}</p>
                </article>
                <button className="btn btn-icon btn-logout" onClick={handleLogout}>
                    <Logout />
                </button>
            </section>
        </aside>
    );
}

export { Sidebar }