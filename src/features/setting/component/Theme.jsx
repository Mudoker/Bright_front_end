import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
function Theme({ name, image }) {
    return (
        <div className="w-fit cursor-pointer rounded-md border-[2px]">
            <img
                src={image}
                alt=""
                className="h-[180px] w-[300px] object-fill"
            />
            <div className="flex flex-row gap-2 p-2">
                <input type="radio" name="theme" value={name} />
                <p>{name}</p>
            </div>
        </div>
    );
}

Theme.PropTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
};

export default Theme;
