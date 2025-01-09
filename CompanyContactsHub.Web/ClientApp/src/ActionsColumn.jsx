import React, { useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { GridRowModes, GridActionsCellItem } from '@mui/x-data-grid';
import axios from 'axios';

const ActionsColumn = ({id, isCompany, isContact, rowModesModel, setRowModesModel, refresh, setIsContact, setCompanyId, setModalOpen }) => {
    
    useEffect(() => {
        console.log('id', id);
        console.log('isCompany', isCompany);
        console.log('isContact', isContact);
        console.log('rowModesModel', rowModesModel);
        console.log('refresh', refresh);
        console.log('setIsContact', setIsContact);
        console.log('setCompanyId', setCompanyId);
        console.log('setModalOpen', setModalOpen);
    }, [])
    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };
    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };
    const handleDeleteClick = (id) => async () => {
        if (isCompany) {
            await axios.post('/api/companyHub/deleteCompany', { id: id });
        }
        else if (isContact) {
            await axios.post(`/api/companyHub/deleteContact?id=${id}`);
        }
        refresh();
    };
    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
    };

    const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

    if (isInEditMode) {
        return [
            <GridActionsCellItem
                key={'save'}
                icon={<SaveIcon />}
                label="Save"
                sx={{ color: 'primary.main' }}
                onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
                key={'cancel'}
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
            />,
        ];
    }

    return [
        <GridActionsCellItem
            key={'edit'}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            sx={{ color: 'orange' }}
        />,
        <GridActionsCellItem
            key={'delete'}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            sx={{ color: 'red' }}
        />,
        isCompany && <GridActionsCellItem
            key={'add'}
            icon={<PersonAddAltIcon />}
            label="Add Contact"
            onClick={() => { setIsContact(true), setCompanyId(id), setModalOpen(true) }}
            sx={{ color: 'purple' }}
        />
    ];
}

export default ActionsColumn;