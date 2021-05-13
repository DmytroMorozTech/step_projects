import React from 'react';
import classes from './Loader.module.scss'


const Loader = () => {
    return (
        // <div className={classes.popup}>
        //     <h1 className={classes.h1}>Receiving data from server</h1>
        //     <div className={classes.ldsRing}>
        //         <div/>
        //         <div/>
        //         <div/>
        //         <div/>
        //     </div>
        <div className={classes.loader}/>
    )
}

export default Loader;