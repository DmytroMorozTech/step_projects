import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {Image, Transformation} from 'cloudinary-react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { Typography } from '@material-ui/core';
import {toggleModal} from "../../redux/modal/modalActions";
import {useDispatch} from "react-redux";




const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        marginBottom:'40px'
    },
    gridList: {
        width: "100%",
        '& img': {
            width: '380px',
        },
    },
    card: {
        '&:hover > div > div': {
            display: 'flex'
        }
    },
    postInfo: {
        color: '#fff',
        height: '100%',
        display: 'none',
        cursor: 'pointer'

    },
    icons: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}));


export default function ImageGridList(props) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const {posts} = props

    return (
        <div className={classes.root}>
            <GridList cellHeight={350} className={classes.gridList} cols={3}>
                {posts.map((e) => (
                    <GridListTile key={e._id} cols={1} className={classes.card}>
                        <Image publicId={e.pic_url} key={e.pic_url} cloudName="dan-insta-step">
                            <Transformation width="350" height="350" crop="crop" />
                        </Image>
                        <GridListTileBar
                            className={classes.postInfo}
                            actionIcon={
                                    <div className={classes.icons}>
                                        <FavoriteIcon style={{margin: '5px'}}/>
                                        <Typography style={{margin: '5px'}}>{e.likes_counter}</Typography>

                                        <ChatBubbleIcon style={{margin: '5px'}}/>
                                        <Typography style={{margin: '5px'}}> {e.comments.length}</Typography>
                                    </div>
                            }
                            onClick = {()=>dispatch(toggleModal(e._id))}
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}