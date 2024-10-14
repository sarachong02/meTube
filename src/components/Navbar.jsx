import React from 'react';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';

import { logo } from '../utils/constants';
import SearchBar from './SearchBar';

const Navbar = () => (
    <Stack direction = "row" alignItems="center" p={1} sx={{position: 'sticky', background:'#e5d9f2', top:0, justifyContent: 'space-between', borderBottom: '1px solid #D8D1FC'}}>
        <Link to="/" style={{display: 'flex', alignItems: 'center'}}>
            <img src={logo} alt="logo" height={90} width={170} style={{ marginTop: '-15px' }}/>  {/* add the logo */}
        </Link>
        <SearchBar />
    </Stack>
)

export default Navbar