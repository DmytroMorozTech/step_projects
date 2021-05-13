import React from 'react'
import {Image, Transformation} from 'cloudinary-react';


const Avatarka = ({avatarUrl}) => {

    return (
        <>
            <Image
                key = {avatarUrl}
                cloudName = "dan-insta-step"
                publicId = {avatarUrl}
                width = "80"
                crop = "scale">
            <Transformation height="150" width="150" crop="fill" radius="80" />
            </Image>
        </>
    )
}
export default Avatarka;