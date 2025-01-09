import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from './Home';
import ViewContacts from './ViewContacts';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/viewContacts/:companyId" element={<ViewContacts />} />
        </Routes>
    );
}

export default App;