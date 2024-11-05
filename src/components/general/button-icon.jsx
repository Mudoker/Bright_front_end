import PropTypes from 'prop-types';

const ButtonIcon = ({
    size,
    background,
    action,
    borderRadius,
    shape,
    children,
}) => {
    const buttonnStyle = {
        width: `w-[${size}]`,
        height: `h-[${size}]`,
        background: `bg-${background}`,
        borderRadius,
        padding: `p-2`,
    };

    if (shape == 'rounded') {
        buttonnStyle.borderRadius = 'rounded-full';
        buttonnStyle.background = 'bg-none';
    }

    const style = Object.values(buttonnStyle).join(' ');

    return (
        <button className={style} onClick={action}>
            {children}
        </button>
    );
};

ButtonIcon.propTypes = {
    size: PropTypes.string.isRequired,
    background: PropTypes.string,
    image: PropTypes.string,
    action: PropTypes.func,
    borderRadius: PropTypes.string,
    shape: PropTypes.string,
    children: PropTypes.node,
};

ButtonIcon.defaultProps = {
    shape: 'rounded',
};

export default ButtonIcon;
