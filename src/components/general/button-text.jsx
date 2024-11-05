import PropTypes from 'prop-types';

const ButtonText = ({
    title,
    shape,
    width,
    height,
    backgroundColor,
    textColor,
    leftIconPath,
    rightIconPath,
    onClick,
}) => {
    const buttonStyles = {
        backgroundColor,
        width,
        height,
        color: textColor,
    };

    return (
        <div>
            <button
                className={`button-text ${shape}`}
                style={buttonStyles}
                onClick={onClick}
            >
                {leftIconPath && (
                    <span className="left-icon">{leftIconPath}</span>
                )}
                {title}
                {rightIconPath && (
                    <span className="right-icon">{rightIconPath}</span>
                )}
            </button>
        </div>
    );
};

ButtonText.propTypes = {
    title: PropTypes.string.isRequired,
    shape: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    leftIconPath: PropTypes.string,
    rightIconPath: PropTypes.string,
    onClick: PropTypes.func,
};

export default ButtonText;
