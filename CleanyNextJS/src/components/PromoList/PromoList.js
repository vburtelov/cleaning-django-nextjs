import React from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import {Card} from "@mui/material";
import {useSelector} from "react-redux";

const PromoList = () => {
  const theme = useTheme();

  const promos = useSelector(state => state.promo.promos);

  return (
      <Box>
        <Box marginBottom={4}>
          <Typography
              sx={{
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
              gutterBottom
              color={'text.secondary'}
              align={'center'}
          >
            Акции
          </Typography>
          <Typography
              variant='h4'
              align={'center'}
              gutterBottom
              sx={{
                fontWeight: 700,
                marginTop: theme.spacing(1),
              }}>
            Действующие акции
          </Typography>
          <Typography variant='h6' align={'center'} color={'text.secondary'}>
            Мы предлагаем вам самые выгодные условия
          </Typography>
        </Box>
        <Grid container spacing={2} marginBottom={4}>
          {promos.map((item, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Card>
                  <Box padding={2} textAlign='center'>
                    <Typography variant={'h6'} gutterBottom textTransform='uppercase'>
                      {item.name}
                    </Typography>
                    <Box border={2} borderRadius={1} borderColor="primary.main" right={0} left={0} marginRight="auto" marginLeft="auto" width='60%'>
                      <Typography fontWeight='bold' variant={'body1'} color={'primary.main'} gutterBottom>
                        {item.code}
                      </Typography>
                    </Box>
                    <Typography variant={'body2'} gutterBottom marginTop={1}>
                      Скидка {item.discount} руб.
                    </Typography>
                    <Typography variant={'body2'} gutterBottom>
                      {item.is_active}
                    </Typography>
                    <Typography variant={'body2'} gutterBottom>
                      {item.is_visible}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
          ))}
        </Grid>
      </Box>
  );
};

export default PromoList;
