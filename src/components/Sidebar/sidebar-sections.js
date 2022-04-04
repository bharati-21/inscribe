import { v4 as uuid } from "uuid";
import {
	HomeOutlined,
	LabelOutlined,
	ArchiveOutlined,
	DeleteOutlineOutlined,
	AccountCircleOutlined,
} from "@mui/icons-material/";

export const sidebarSections = [
    {
        key: uuid(),
        icon: <HomeOutlined />,
        name: "Home",
        path: "/",
    },
    {
        key: uuid(),
        icon: <LabelOutlined />,
        name: "Labels",
        path: "/labels",
    },
    {
        key: uuid(),
        icon: <ArchiveOutlined />,
        name: "Archive",
        path: "/archive",
    },
    {
        key: uuid(),
        icon: <DeleteOutlineOutlined />,
        name: "Trash",
        path: "trash",
    },
    {
        key: uuid(),
        icon: <AccountCircleOutlined />,
        name: "Profile",
        path: "profile",
    },
];