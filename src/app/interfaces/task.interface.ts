export interface Task {
    id_task:              number;
    id_project:           number;
    id_user_task:         number;
    name_task:            string;
    description_task:     string;
    state_task:           string;
    assignment_date_task: Date;
    end_date_task:        Date;
    name_project:         string;
    description_project:  string;
    state_project:        string;
    startdate_project:    Date;
    enddate_project:      Date;
    id_user_admin:        number;
    id_user:              number;
    name_user:            string;
    lastname_user:        string;
    email_user:           string;
    password_user:        string;
    img_user:             string;
    priority_task:        string;
}


export enum Priority{
    Baja=1,
    Media=2,
    Alta=3
}
export interface TaskbPriority {
    priority:Priority,
    count:number
}
