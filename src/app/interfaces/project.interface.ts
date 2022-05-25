import { User } from "./user.interface";

export interface Project {
    id_project:          number;
    name_project:        string;
    description_project: string;
    state_project:       string;
    startdate_project:   Date;
    enddate_project:     Date;
    id_user_admin:       number;
    id_user_project:     number;
}

export interface ProjectSingle {
    id_project:          number;
    name_project:        string;
    description_project: string;
    id_user_project     : number;
}