import React from 'react';

export default function ImageComponent({ base64String }) {
    return (
        <img src={`data:image/jpeg;base64,${base64String}`} alt="Decoded Image" />
    );
}
