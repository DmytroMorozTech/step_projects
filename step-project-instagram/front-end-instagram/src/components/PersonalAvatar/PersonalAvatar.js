import React from 'react';
import {Image, Transformation} from "cloudinary-react";

function PersonalAvatar(props) {
    const {avatar} = props
    return (
            <Image
                key = {avatar}
                cloudName = "dan-insta-step"
                publicId = {avatar}
                width = "150"
                crop = "scale">
                <Transformation background="#fafafa" height="150" width="150" crop="fill" radius="max" />
            </Image>
    );
}

export default PersonalAvatar;