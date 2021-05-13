import React, {useRef} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {useDispatch} from 'react-redux';
import {addCommentToPost} from '../../redux/posts/postsActions';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        margin: '0 auto',
        width: '100%',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    postcomment: {
        width: '10%',
        display: 'flex',

    },
    placeholder: {
        width: '90%',
        display: 'flex',
        resize:'none',        
    },
}));

const AddComment = (props) => {
    const {post, active_user, focus} = props
    const classes = useStyles();
    const dispatch = useDispatch();
    const inputRef = useRef('')
 
    const handleEnterKey = (e)=>{
        if(e.keyCode == '13'){
            handleSubmit(e)
        }
        }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addCommentToPost(active_user, post._id, {text: inputRef.current.value}))
        inputRef.current.value = ''
        console.log(inputRef.current.value)
    }
        if(focus) {
            inputRef.current.focus()
        }


return (

    <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit} onKeyUp={handleEnterKey} >
        <TextField placeholder="Add comment" inputProps={{'aria-label': 'description'}} className={classes.placeholder}
               inputRef={inputRef} multiline/>
        <Button
            type="submit"
            color="primary"
            className={classes.postcomment}
        >Post</Button>
    </form>
);
}

export default AddComment