import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import ImageGrid from "../ImageGrid/ImageGrid";
import Container from '@material-ui/core/Container';
import {useSelector} from "react-redux";


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Container>
                    <Box >
                    {children}
                    </Box>
                </Container>
            )}
        </div>
    );
}


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "transparent",
    },
    appBar: {
        background: 'transparent',
        boxShadow: 'none'
    },
    tabTitle: {
        color: '#000'
    }
}));

export default function PersonalTab(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const allPosts = useSelector(state => state.posts.postsList)
    const {posts, user} = props

    let savedPosts = []
    if(user.saved_posts) {
        user.saved_posts.map(e => {
            return allPosts.map(j => {
                if(e === j._id) {
                    savedPosts.push(j)
                }
            })
        })
    }

    // console.log(savedPosts)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="POSTS" {...a11yProps(0)} className={classes.tabTitle}/>
                    <Tab label="SAVED" {...a11yProps(1)} className={classes.tabTitle}/>
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <ImageGrid posts={posts}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                { savedPosts.length > 0 ? <ImageGrid posts={savedPosts}/> : 'User does not have saved posts'}
            </TabPanel>
        </div>
    );
}
