import PropTypes from 'prop-types';
import React from 'react';

const Divider = ({
    width = '100%',
    color = 'rgba(0, 0, 0, 0.1)',
    height = '1px',
}) => {
    const dividerStyle = {
        width: width,
        height: height,
        backgroundColor: color,
    };

    return <div style={dividerStyle}></div>;
};

Divider.propTypes = {
    width: PropTypes.string,
    color: PropTypes.string,
    height: PropTypes.string,
};

export default Divider;
