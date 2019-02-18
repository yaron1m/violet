import React from "react";
import Avatar from '@material-ui/core/Avatar';

export default function IndexAvatar(props: IndexAvatarProps) {
    return (
        <Avatar
            style={{
                marginBottom: 15,
                marginLeft: 15,
            }}
        >
            {props.index}
        </Avatar>
    );
}

interface IndexAvatarProps {
    index: number;
}