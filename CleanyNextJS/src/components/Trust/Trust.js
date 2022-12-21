/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Trust = () => {
  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant={'h4'} gutterBottom sx={{ fontWeight: 700 }}>
              Почему нам доверяют?
            </Typography>
            <Typography variant={'h6'} component={'p'} color={'text.secondary'}>
              Обратившись в нашу клининговую компанию, вы получите высококачественные услуги по приведению
              в порядок офисов, квартир, домов и других помещений после ремонта, праздника или ежедневно
              на условиях долгосрочного договора. Мы экономим время клиентов.
              Профессионально убираем, чистим, моем быстро, аккуратно, в соответствии со стандартами и нормативами.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant={'h4'} gutterBottom sx={{ fontWeight: 700 }}>
              Профессиональная уборка
            </Typography>
            <Typography variant={'h6'} component={'p'} color={'text.secondary'}>
              Все работы по уборке осуществляются нами
              с использованием оборудования и моющих средств известных производителей.
              Персонал нашей компании по уборке помещений использует только специальную технику и инструменты,
              предназначенные для выполнения конкретных работ.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Trust;
