import TasksStore from "../../store/TasksStore";
import {I_TASK} from "../../interfaces/TasksInterfaces";
import {sendHTTPRequest} from "./HTTPWorker";
import {BACKEND_DOMAIN_URL} from "../../constants/BasicConstants";

export function SqlEjecRowsCreate(text: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        let preparedBody: object = {
            text: text
        };
        sendHTTPRequest({
            method: "POST",
            url: BACKEND_DOMAIN_URL + "/api/sql_ejec_rows/create",
            data: preparedBody
        })
            .then((response: any) => {
                resolve(response);
            })
            .catch(response => {
                reject();
                alert("Ошибка создания");
            });
    });
}

export function SqlEjecRowsDelete(id: number) {
    return new Promise<void>((resolve, reject) => {
        let preparedBody: object = {
            id: id
        };
        sendHTTPRequest({
            method: "POST",
            url: BACKEND_DOMAIN_URL + "/api/sql_ejec_rows/delete",
            data: preparedBody
        })
            .then(response => {
                resolve();
            })
            .catch(response => {
                reject();
                alert("Ошибка удаления");
            });
    });
}

export function SqlEjecRowsGetAll(name: string): Promise<I_TASK[]> {
    return new Promise<I_TASK[]>((resolve, reject) => {
        let preparedBody: object = {
            created_name_user: name
        };
        sendHTTPRequest({
            method: "POST",
            url: BACKEND_DOMAIN_URL + "/api/sql_ejec_rows/getall",
            data: preparedBody
        })
            .then((response:any) => {
                resolve(response);
            })
            .catch(response => {
                reject();
                alert("Ошибка получения строк");
            });
    });
}
