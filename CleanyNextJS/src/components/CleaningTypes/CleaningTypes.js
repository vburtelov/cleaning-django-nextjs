import React from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Image from 'next/image';
import {useSelector} from "react-redux";

const CleaningTypes = () => {
    const theme = useTheme();

    // use state
    const [hiddenTypes, setHiddenTypes] = React.useState([]);

    // set hidden types true to false and false to true
    const toggleHiddenType = id => {
        if (hiddenTypes.includes(id)) {
            setHiddenTypes(hiddenTypes.filter(i => i !== id));
        } else {
            setHiddenTypes([...hiddenTypes, id]);
        }
    }

    const types = useSelector(state => state.types.types);


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
                    Типы уборок
                </Typography>
                <Typography
                    variant='h4'
                    align={'center'}
                    gutterBottom
                    sx={{
                        fontWeight: 700,
                        marginTop: theme.spacing(1),
                    }}
                >
                    Выберите подходящий Вам тип уборки
                </Typography>
                <Typography variant='h6' align={'center'} color={'text.secondary'}>
                    У каждого типа уборки свои особенности и цены
                </Typography>
            </Box>
            {types.map((item, idx) => (
                <Grid container spacing={2} marginBottom={4}>
                    <Grid item xs={12} md={4}>
                        <Typography variant={'h4'} gutterBottom sx={{fontWeight: 700}}>
                            {item.name}
                        </Typography>
                        <Typography variant={'h6'} gutterBottom sx={{fontWeight: 700}}>
                            {item.price_per_meter} ₽/м²
                        </Typography>
                        <Grid container direction="column">
                            <Grid item xs={8}>
                            <Typography variant={'h6'} gutterBottom sx={{fontWeight: 700}}>
                            {item.description}
                            </Typography>
                                <Image
                                    src={item.image_url}
                                    alt={item.name}
                                    width={400}
                                    height={400}
                                    layout="responsive"
                                    objectFit="cover"
                                />
                            </Grid>


                            <Grid item xs={4}>
                                <Button
                                    variant={'outlined'}
                                    size={'large'}
                                    fullWidth
                                    sx={{marginTop: 2}}
                                    onClick={() => {
                                        toggleHiddenType(idx)
                                    }}
                                >
                                    {hiddenTypes.includes(idx) ? 'Скрыть' : 'Показать ещё'}
                                </Button>
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant={'h6'} gutterBottom sx={{fontWeight: 700}}>
                            Входит в стоимость
                        </Typography>
                        <List>
                            {item.basic_services.map((basic_service, index) => (
                                <ListItem divider={true} sx={{
                                    height: 60,
                                    overflow: 'hidden',
                                    display: hiddenTypes.includes(idx) ? 'flex' : index > 5 ? 'none' : 'flex',
                                }}>
                                    <ListItemIcon>
                                        <CheckCircleOutlineOutlinedIcon/>
                                    </ListItemIcon>
                                    <ListItemText sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }} primary={basic_service.name}/>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant={'h6'} gutterBottom sx={{fontWeight: 700}}>
                            Дополнительные услуги
                        </Typography>
                        <List>
                            {item.extra_services.map((extra_service, index) => (
                                <ListItem divider={true} sx={{
                                    height: 60,
                                    overflow: 'hidden',
                                    display: hiddenTypes.includes(idx) ? 'flex' : index > 5 ? 'none' : 'flex',
                                }}>
                                    <ListItemIcon>
                                        <AttachMoneyOutlinedIcon sx={{ color: '#85bb65 '}}  />
                                    </ListItemIcon>
                                    <ListItemText sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }} primary={extra_service.name} secondary={extra_service.price + ' р.'}/>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={12} marginBottom={4}>
                        <Divider/>
                    </Grid>
                </Grid>
            ))}
        </Box>
    );
};

export default CleaningTypes;
