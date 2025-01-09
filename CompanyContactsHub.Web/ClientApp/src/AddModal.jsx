import { useState, useEffect } from 'react';
import React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import axios from 'axios';

const AddModal = ({ open, onClose, refresh, isCompany, setIsCompany, companyId, isContact, setIsContact }) => {
    const [formData, setFormData] = useState({
        name: "",
        streetAddress: "",
        city: "",
        phoneNumber: "",
        role: '',
        companyId: null
    });
    const [companyName, setCompanyName] = useState("");

    useEffect(()=>{
        const getCompanyNameById = async () => {
            const { data } = await axios.get(`/api/companyHub/getCompanyNameById?id=${companyId}`);
            setCompanyName(data);
        }
        if (isContact) {
            getCompanyNameById();
        }
    })

    const onInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSave = async () => {
        const dataForBackend = {
            name: formData.name,
            address: `${formData.streetAddress}, ${formData.city}`,
            phoneNumber: formData.phoneNumber,
            role: formData.role,
            companyId: isContact ? companyId : null
        }
        if (isCompany) {
            await axios.post('/api/companyHub/addCompany', dataForBackend);
            setIsCompany(false);
        }
        else if (isContact) {
            await axios.post('/api/companyHub/addContactToCompany', dataForBackend);
            setIsContact(false);
        }
        setFormData({
            name: "",
            streetAddress: "",
            city: "",
            phoneNumber: "",
            role: '',
            companyId: null
        })
        refresh();
        onClose();
    }

    return (<>
        <Modal open={open}>
            <Box sx={{
                position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 750, bgcolor: "background.paper",
                borderRadius: 2, boxShadow: 24, p: 4, display: "flex", flexDirection: "column", gap: 2
            }}>
                <Typography variant='h6' sx={{ textAlign: 'center' }}>{isCompany && 'Add Company'}{isContact && `Add Contact for ${companyName}`}</Typography>
                <Box sx={{ display: 'column' }}>
                    <TextField label="Name" name="name" value={formData.name || ''} onChange={onInputChange} fullWidth sx={{ mb: 2 }} />
                    {isCompany && <><TextField label="Street Address" name="streetAddress" value={formData.streetAddress || ''} onChange={onInputChange} fullWidth sx={{ mb: 2 }} />
                        <TextField label="City" name="city" value={formData.city || ''} onChange={onInputChange} fullWidth sx={{ mb: 2 }} /></>}
                        {isContact && <TextField label="Role" name="role" value={formData.role || ''} onChange={onInputChange} fullWidth sx={{ mb: 2 }} />}
                    <TextField label="Phone Number" name="phoneNumber" value={formData.phoneNumber || ''} onChange={onInputChange} fullWidth sx={{ mb: 2 }} />
                    
                </Box>
                <Box sx={{ display: "flex", justifyContent: 'center', gap: 4 }}>
                    <Button variant="contained" onClick={handleSave} className="btn btn-primary" sx={{ width: '50%' }} >Add</Button>
                    <Button variant="outlined" onClick={onClose} className="btn btn-secondary" sx={{ width: '50%' }}>Cancel</Button>
                </Box>
            </Box>
        </Modal>
    </>)
}
export default AddModal;