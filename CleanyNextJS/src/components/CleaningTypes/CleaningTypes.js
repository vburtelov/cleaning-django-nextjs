import React from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Image from 'next/image';

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


    const data = [
        {
            "id": 3,
            "image_url": "https://assets.maccarianagency.com/backgrounds/img1.jpg",
            "basic_services": [
                {
                    "id": 20,
                    "name": "Уборка в кладовке"
                },
                {
                    "id": 19,
                    "name": "Уборка в труднодоступных местах"
                },
                {
                    "id": 18,
                    "name": "Обеспыливание стен"
                },
                {
                    "id": 17,
                    "name": "Выведение глубоких пятен"
                },
                {
                    "id": 16,
                    "name": "Помыть биде"
                },
                {
                    "id": 15,
                    "name": "Помыть унитаз"
                },
                {
                    "id": 14,
                    "name": "Помыть ванну и душевую"
                },
                {
                    "id": 13,
                    "name": "Помыть посуду"
                },
                {
                    "id": 12,
                    "name": "Помыть обеденный стол"
                },
                {
                    "id": 11,
                    "name": "Помыть плиту"
                },
                {
                    "id": 10,
                    "name": "Помыть столешницу"
                },
                {
                    "id": 9,
                    "name": "Помыть раковину"
                },
                {
                    "id": 8,
                    "name": "Вынести мусор"
                },
                {
                    "id": 7,
                    "name": "Сложить вещи"
                },
                {
                    "id": 6,
                    "name": "Застелить постель"
                },
                {
                    "id": 5,
                    "name": "Помыть зеркала"
                },
                {
                    "id": 4,
                    "name": "Протереть пыль"
                },
                {
                    "id": 3,
                    "name": "Почистить мебель"
                },
                {
                    "id": 2,
                    "name": "Почистить ковёр"
                },
                {
                    "id": 1,
                    "name": "Помыть пол"
                }
            ],
            "extra_services": [
                {
                    "id": 15,
                    "name": "Помыть лоток",
                    "price": 300
                },
                {
                    "id": 14,
                    "name": "Помыть шкафы на кухне",
                    "price": 700
                },
                {
                    "id": 13,
                    "name": "Помыть микроволновку",
                    "price": 300
                },
                {
                    "id": 12,
                    "name": "Помыть духовку",
                    "price": 400
                },
                {
                    "id": 11,
                    "name": "Помыть холодильник",
                    "price": 500
                },
                {
                    "id": 10,
                    "name": "Убрать что-то ещё",
                    "price": 500
                },
                {
                    "id": 9,
                    "name": "Помыть люстру",
                    "price": 500
                },
                {
                    "id": 8,
                    "name": "Дезинфекция",
                    "price": 500
                },
                {
                    "id": 7,
                    "name": "Убраться в гардеробной",
                    "price": 500
                },
                {
                    "id": 6,
                    "name": "Забрать ключи",
                    "price": 300
                },
                {
                    "id": 5,
                    "name": "Доставить ключи",
                    "price": 300
                },
                {
                    "id": 4,
                    "name": "Погладить вещи",
                    "price": 500
                },
                {
                    "id": 3,
                    "name": "Убрать балкон",
                    "price": 500
                },
                {
                    "id": 2,
                    "name": "Помыть балконное остекление",
                    "price": 1000
                },
                {
                    "id": 1,
                    "name": "Помыть окно",
                    "price": 500
                }
            ],
            "name": "Генеральная уборка",
            "price_per_meter": 600
        },
        {
            "id": 2,
            "basic_services": [
                {
                    "id": 12,
                    "name": "Помыть обеденный стол"
                },
                {
                    "id": 11,
                    "name": "Помыть плиту"
                },
                {
                    "id": 10,
                    "name": "Помыть столешницу"
                },
                {
                    "id": 9,
                    "name": "Помыть раковину"
                },
                {
                    "id": 8,
                    "name": "Вынести мусор"
                },
                {
                    "id": 7,
                    "name": "Сложить вещи"
                },
                {
                    "id": 6,
                    "name": "Застелить постель"
                },
                {
                    "id": 5,
                    "name": "Помыть зеркала"
                },
                {
                    "id": 4,
                    "name": "Протереть пыль"
                },
                {
                    "id": 3,
                    "name": "Почистить мебель"
                },
                {
                    "id": 2,
                    "name": "Почистить ковёр"
                },
                {
                    "id": 1,
                    "name": "Помыть пол"
                }
            ],
            "extra_services": [
                {
                    "id": 14,
                    "name": "Помыть шкафы на кухне",
                    "price": 700
                },
                {
                    "id": 13,
                    "name": "Помыть микроволновку",
                    "price": 300
                },
                {
                    "id": 12,
                    "name": "Помыть духовку",
                    "price": 400
                },
                {
                    "id": 11,
                    "name": "Помыть холодильник",
                    "price": 500
                },
                {
                    "id": 10,
                    "name": "Убрать что-то ещё",
                    "price": 500
                },
                {
                    "id": 9,
                    "name": "Помыть люстру",
                    "price": 500
                },
                {
                    "id": 8,
                    "name": "Дезинфекция",
                    "price": 500
                },
                {
                    "id": 7,
                    "name": "Убраться в гардеробной",
                    "price": 500
                },
                {
                    "id": 6,
                    "name": "Забрать ключи",
                    "price": 300
                },
                {
                    "id": 5,
                    "name": "Доставить ключи",
                    "price": 300
                },
                {
                    "id": 4,
                    "name": "Погладить вещи",
                    "price": 500
                },
                {
                    "id": 3,
                    "name": "Убрать балкон",
                    "price": 500
                },
                {
                    "id": 2,
                    "name": "Помыть балконное остекление",
                    "price": 1000
                },
                {
                    "id": 1,
                    "name": "Помыть окно",
                    "price": 500
                }
            ],
            "name": "Поддерживающая уборка",
            "price_per_meter": 300
        },
        {
            "id": 1,
            "basic_services": [
                {
                    "id": 8,
                    "name": "Вынести мусор"
                },
                {
                    "id": 7,
                    "name": "Сложить вещи"
                },
                {
                    "id": 6,
                    "name": "Застелить постель"
                },
                {
                    "id": 5,
                    "name": "Помыть зеркала"
                },
                {
                    "id": 4,
                    "name": "Протереть пыль"
                },
                {
                    "id": 3,
                    "name": "Почистить мебель"
                },
                {
                    "id": 2,
                    "name": "Почистить ковёр"
                },
                {
                    "id": 1,
                    "name": "Помыть пол"
                }
            ],
            "extra_services": [
                {
                    "id": 10,
                    "name": "Убрать что-то ещё",
                    "price": 500
                },
                {
                    "id": 9,
                    "name": "Помыть люстру",
                    "price": 500
                },
                {
                    "id": 8,
                    "name": "Дезинфекция",
                    "price": 500
                },
                {
                    "id": 7,
                    "name": "Убраться в гардеробной",
                    "price": 500
                },
                {
                    "id": 6,
                    "name": "Забрать ключи",
                    "price": 300
                },
                {
                    "id": 5,
                    "name": "Доставить ключи",
                    "price": 300
                },
                {
                    "id": 4,
                    "name": "Погладить вещи",
                    "price": 500
                },
                {
                    "id": 3,
                    "name": "Убрать балкон",
                    "price": 500
                },
                {
                    "id": 2,
                    "name": "Помыть балконное остекление",
                    "price": 1000
                },
                {
                    "id": 1,
                    "name": "Помыть окно",
                    "price": 500
                }
            ],
            "name": "Лёгкая уборка",
            "price_per_meter": 200
        }
    ]

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
            {/*<Grid container spacing={2}>*/}
            {/*    <Grid item xs={12} md={4}>*/}
            {/*        <Typography variant={'h4'} gutterBottom align='center' sx={{fontWeight: 700}}>*/}
            {/*            Кто мы?*/}
            {/*        </Typography>*/}
            {/*    </Grid>*/}
            {/*    <Grid item xs={12} md={4}>*/}
            {/*        <Typography variant={'h4'} gutterBottom align='center' sx={{fontWeight: 700}}>*/}
            {/*            Кто мы?*/}
            {/*        </Typography>*/}
            {/*    </Grid>*/}
            {/*    <Grid item xs={12} md={4}>*/}
            {/*        <Typography variant={'h4'} gutterBottom align='center' sx={{fontWeight: 700}}>*/}
            {/*            Кто мы?*/}
            {/*        </Typography>*/}
            {/*    </Grid>*/}
            {/*</Grid>*/}
            {data.map((item, idx) => (
                <Grid container spacing={2} marginBottom={4}>
                    <Grid item xs={12} md={4}>
                        <Typography variant={'h4'} gutterBottom sx={{fontWeight: 700}}>
                            {item.name}
                        </Typography>
                        <Typography variant={'h6'} gutterBottom sx={{fontWeight: 700}}>
                            {item.price_per_meter} ₽/м²
                        </Typography>
                        {/* Button which align to bottom */}
                        <Grid container spacing={20} direction="column" justifyContent='space-between'>

                            <Grid item xs={8}>
                                <Image
                                    src={item.image_url}
                                    alt="Picture of the author"
                                    width={200}
                                    height={200}
                                    layout="responsive"
                                    objectFit="cover"
                                    objectPosition="center"
                                    quality={100}
                                    priority={true}
                                    loading="eager"
                                />


                            </Grid>

                            <Grid item xs={4}>
                                <Button
                                    variant={'outlined'}
                                    color={'primary'}
                                    size={'large'}
                                    fullWidth
                                    sx={{marginTop: 2}}
                                    onClick={() => {
                                        toggleHiddenType(idx)
                                    }}
                                >
                                    Показать ещё услуги
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
                                        <CheckCircleOutlineOutlinedIcon/>
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
