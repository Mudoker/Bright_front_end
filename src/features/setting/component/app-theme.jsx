import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { setTheme } from '../../../features/theme/utils/themeSlice.ts';

function Theme({ name, image }) {
    const dispatch = useDispatch();
    const currentTheme = useSelector(state => state.currentTheme.value);

    const isDisabled = name !== 'Light default' && name !== 'Dark default';

    const normalizeThemeName = name => {
        return name.toLowerCase().replace(/ /g, '-');
    };

    const handleThemeButton = () => {
        const theme = normalizeThemeName(name);
        dispatch(setTheme(theme));
    };
    return (
        <div
            className="w-full cursor-pointer rounded-md border-[2px]"
            onClick={handleThemeButton}
        >
            <img
                src={image}
                alt=""
                className="h-[180px] w-[300px] object-fill"
            />
            <div className="flex flex-row gap-2 p-2">
                <input
                    type="radio"
                    name="theme"
                    value={name}
                    checked={currentTheme === normalizeThemeName(name)}
                    disabled={isDisabled}
                    onChange={handleThemeButton}
                />
                <p>{name}</p>
            </div>
        </div>
    );
}

Theme.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
};

export default Theme;
