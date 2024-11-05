import catImage from '../asset/cat.jpg';
import withScrollbarTheme from '../hoc/scroll-bar';
import themes from '../test/data/themes';
import Theme from './app-theme';

function Appearance() {
    return (
        <div className="container-ns flex w-[74.4vw] flex-col overflow-auto">
            <div className="group sticky mx-3 border-b-[1px] border-slate-300 bg-background pb-[14px] pt-8 text-2xl font-light">
                {'Appearance'}
            </div>
            <div className="m-3 flex flex-col">
                <div className="mb-3 border-b-[1px] py-2">
                    <p className="text-md font-semibold">
                        {'Theme Preferences'}
                    </p>
                </div>
                <div className="flex items-center justify-center">
                    <form className="grid grid-cols-3 gap-4">
                        {themes.map((theme, index) => (
                            <label
                                key={index}
                                className="w-fit cursor-pointer rounded-md"
                            >
                                <Theme name={theme} image={catImage}></Theme>
                            </label>
                        ))}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default withScrollbarTheme(Appearance);
