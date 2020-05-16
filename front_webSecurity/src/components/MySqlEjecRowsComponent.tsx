import React from 'react';
import {IconButton, TextField, Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Delete, NoteAdd} from "@material-ui/icons";
import {SqlEjecRowsCreate, SqlEjecRowsDelete, SqlEjecRowsGetAll} from "../scripts/Models/SqlEjecRowsModel";
import {KEY_LOCAL_STORAGE_USER_NAME} from "../constants/LocalStorageConstants";

interface IProps {
}

interface IState {
    strings: any;
    inText: string;
}

class MySqlEjecRowsComponent extends React.Component<IProps, IState>
{
    constructor(props: IProps)
    {
        super(props);
        this.state = {
            strings: [],
            inText: ""
        };
        this.getAllStandard();
    }

    getAllStandard(): void
    {
        let userName = localStorage.getItem(KEY_LOCAL_STORAGE_USER_NAME);
        if (userName !== null) {
            SqlEjecRowsGetAll(userName)
                .then((response: any) => this.setState({strings: response.data}));
        }
    }

    getAllEjection(): void
    {
        SqlEjecRowsGetAll("%%")
            .then((response: any) => this.setState({strings: response.data}));
    }

    handleCreate()
    {
        const {
            inText,
            strings
        } = this.state;
        let newStrings = strings;
        SqlEjecRowsCreate(inText)
            .then((response: any) => {newStrings.push(response.data); this.setState({inText: "",strings: newStrings})});
    }

    handleDelete(inID: number)
    {
        const {
            strings
        } = this.state;
        SqlEjecRowsDelete(inID)
            .then(() => this.setState({strings: strings.filter((string: any) => string.id !== inID)}));
    }

    render()
    {
        const {
            strings,
            inText
        } = this.state;
        return (
            <div style={{width: "100%", height:"100%"}}>
                <div
                    style={{display: "flex",flexDirection: "row", width: "100%", margin: "30px", justifyContent: "space-around"}}
                >
                    <Button
                        variant="contained"
                        onClick={() => {this.setState({inText: "<div onMouseMove=\"alert('pedro')\">обычный текст</div>"})}}
                    >
                        инъекция жс 1
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {this.setState({inText: "<b style='color: red; font-size: 32px; font-weight: bold; background: blue'>красный текст</b>"})}}
                    >
                        инъекция жс 2
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {this.getAllStandard()}}
                    >
                        обычная загрузка
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {this.getAllEjection()}}
                    >
                        инъекция
                    </Button>
                </div>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Текст</TableCell>
                                <TableCell align="right">Создал:</TableCell>
                                <TableCell align="center">Действия</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    <TextField
                                        style={{width: "100%"}}
                                        label="текст"
                                        value={inText}
                                        onChange={(event) => {this.setState({inText: event.target.value});}}
                                    />
                                </TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        title={"создать новую"}
                                        onClick={() => {this.handleCreate()}}
                                    >
                                        <NoteAdd/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            {strings.map((string: any) => (
                                <TableRow
                                    key={"TasksListID_" + string.id}
                                >
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        id={"TasksListID_" + string.id}
                                        ref={() => {
                                            let id = "TasksListID_" + string.id;
                                            let object = document.getElementById(id);
                                            if (object) {
                                                object.innerHTML = string.text;
                                            }
                                        }}
                                    >
                                    </TableCell>
                                    <TableCell align="right">{string.created_name_user}</TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            title={"удалить"}
                                            onClick={() => {
                                                this.handleDelete(string.id)
                                            }}
                                        >
                                            <Delete/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

export default MySqlEjecRowsComponent;
