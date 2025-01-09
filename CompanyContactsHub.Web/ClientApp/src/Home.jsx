import React, { useState, useEffect } from "react";
import { Button, Box, Typography, FormControl, InputAdornment, Input } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {  DataGrid, GridRowEditStopReasons } from '@mui/x-data-grid';
import axios from 'axios';
import AddModal from "./AddModal";
import { Link } from "react-router-dom";
import ActionsColumn from "./ActionsColumn";

const Home = () => {
    const [searchText, setSearchText] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [isCompany, setIsCompany] = useState(false);
    const [companyId, setCompanyId] = useState(null);
    const [isContact, setIsContact] = useState(false);
    const [rows, setRows] = useState([]);;
    const [rowModesModel, setRowModesModel] = React.useState({});
    const columns = [
        { field: "name", headerName: "Name", flex: 1, editable: true },
        { field: "address", headerName: "Address", flex: 1, editable: true },
        { field: "phoneNumber", headerName: "Phone Number", flex: 1, editable: true },
        {
            field: 'contacts',
            headerName: 'View Contacts',
            width: 200,
            sortable: false,
            renderCell: (params) => (
                <Button component={Link} to={`/viewContacts/${params.row.id}`} variant="text" size="small" sx={{ '&:hover': { textDecoration: 'underline' } }}>
                    View Contacts ({params.row.contacts.length})
                </Button>
            )
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 150,
            cellClassName: 'actions',
            getActions: ({ id }) => [
                <ActionsColumn
                id={id}
                isCompany={true}
                rowModesModel={rowModesModel}
                setRowModesModel={setRowModesModel}
                refresh={getCompanies}
                setIsContact={setIsContact}
                setCompanyId={setCompanyId}
                setModalOpen={setModalOpen}
                />]            
        }
    ]
    
    const getCompanies = async () => {
        const { data } = await axios.get('/api/companyHub/getCompanies');
        setRows(data);
    }
    useEffect(() => {
        getCompanies();
    }, [])

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };
    
    const processRowUpdate = async (newRow) => {
        const updatedRow = { ...newRow };
        await axios.post('/api/companyHub/updateCompany', newRow);
        getCompanies();
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    return (<>
        <AddModal
            open={modalOpen}
            onClose={() => { setModalOpen(false), setIsCompany(false), setIsContact(false) }}
            refresh={getCompanies}
            isCompany={isCompany}
            setIsCompany={setIsCompany}
            companyId={companyId}
            isContact={isContact}
            setIsContact={setIsContact}
        />
        <Typography variant="h5" sx={{ textAlign: 'center', mt:10 }}>Company Contacts Hub</Typography>
        <Box sx={{width: '70%', margin: 'auto'}}>
            <Box display={"flex"} justifyContent={"space-between"} >
                <FormControl>
                    <Input
                        placeholder="Search"
                        startAdornment={<InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>}
                        sx={{ mb: 2 }}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </FormControl>
                <Button variant="outlined" onClick={() => { setModalOpen(true), setIsCompany(true) }} sx={{ mb: 2 }}>Add Company</Button>
            </Box>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <DataGrid
                    rows={rows.filter((row) => Object.values(row).some((value) => String(value).toLowerCase().includes(searchText.toLowerCase())))}
                    columns={columns}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
               />
            </Box>
        </Box>
    </>)
}


export default Home;