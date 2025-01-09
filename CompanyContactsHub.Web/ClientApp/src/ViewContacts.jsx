import React, { useState, useEffect } from "react";
import { Typography, Box, Button } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AddModal from "./AddModal";
import { DataGrid, GridRowEditStopReasons } from '@mui/x-data-grid';
import ActionsColumn from "./ActionsColumn";

const ViewContacts = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isContact, setIsContact] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const columns = [
    { field: "name", headerName: "Name", flex: 1, editable: true },
    { field: "phoneNumber", headerName: "Phone Number", flex: 1, editable: true },
    { field: "role", headerName: "Role", flex: 1, editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      cellClassName: 'actions',
      getActions: ({ id }) => [
        <ActionsColumn
          id={id}
          isContact={true}
          rowModesModel={rowModesModel}
          setRowModesModel={setRowModesModel}
          refresh={getContacts}
        />]
    }
  ]
  const { companyId } = useParams();

  const getContacts = async () => {
    const { data } = await axios.get(`/api/companyHub/getContactsForCompany?id=${companyId}`);
    setRows(data);
  }

  useEffect(() => {
    getContacts();
    const getCompanyNameById = async () => {
      const { data } = await axios.get(`/api/companyHub/getCompanyNameById?id=${companyId}`);
      setCompanyName(data);
    }
    getCompanyNameById();
  }, [])


  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const processRowUpdate = async (newRow) => {
    const updatedRow = { ...newRow };
    await axios.post('/api/companyHub/updateContact', newRow);
    getContacts();
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  return (<>
    <AddModal
      open={modalOpen}
      onClose={() => { setModalOpen(false), setIsContact(false) }}
      companyId={companyId}
      isContact={isContact}
      setIsContact={setIsContact}
      refresh={getContacts}
    />
    <Typography variant="h5" sx={{ textAlign: 'center', mb: 2, mt: 10 }}>Contacts for {companyName}</Typography>
    <Box sx={{ width: '50%', margin: 'auto' }}>
      <Box display={"flex"} justifyContent={"space-between"} >
        <Button variant="outlined" component={Link} to={'/'} sx={{ mb: 2 }}>Back to companies</Button>
        <Button variant="outlined" onClick={() => { setModalOpen(true), setIsContact(true) }} sx={{ mb: 2 }}>Add Contact</Button>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
      />
    </Box>
  </>)
}
export default ViewContacts;