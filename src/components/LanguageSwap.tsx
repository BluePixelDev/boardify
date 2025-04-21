import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Box } from '@mui/material';
import { Icon } from '@iconify/react';

const LanguageSwap: React.FC = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* USA Flag */}
            <IconButton onClick={() => changeLanguage('en')} color="inherit">
                <Icon icon={"flag:gb-4x3"} width={30} height={20} />
            </IconButton>
            
            {/* Czech Flag */}
            <IconButton onClick={() => changeLanguage('cs')} color="inherit">
                <Icon icon={"flag:cz-4x3"} width={30} height={20} />
            </IconButton>
        </Box>
    );
};

export default LanguageSwap;
