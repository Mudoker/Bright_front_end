/* eslint-disable react/prop-types */
import { cn } from '@/lib/utils';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect } from 'react';

export const TypewriterEffect = ({ words, className, cursorClassName }) => {
    const wordsArray = words.map(word => ({
        ...word,
        text: word.text.split(''),
    }));

    const [ref, inView] = useInView();
    const controls = useAnimation();

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    const renderWords = () => (
        <motion.div ref={ref} className="inline">
            {wordsArray.map((word, idx) => (
                <div key={`word-${idx}`} className="inline-block">
                    {word.text.map((char, index) => (
                        <motion.span
                            initial={{ opacity: 0 }}
                            key={`char-${index}`}
                            variants={{
                                visible: { opacity: 1 },
                            }}
                            className={cn(
                                `hidden text-white opacity-0`,
                                word.className
                            )}
                        >
                            {char}
                        </motion.span>
                    ))}
                    &nbsp;
                </div>
            ))}
        </motion.div>
    );

    return (
        <div
            className={cn(
                'text-center text-base font-bold sm:text-xl md:text-3xl lg:text-xl',
                className
            )}
        >
            {renderWords()}
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: 'reverse',
                }}
                className={cn(
                    'inline-block h-4 w-[4px] rounded-sm bg-yellow-500 md:h-6 lg:h-10',
                    cursorClassName
                )}
            ></motion.span>
        </div>
    );
};

export const TypewriterEffectSmooth = ({
    words,
    className,
    cursorClassName,
}) => {
    const wordsArray = words.map(word => ({
        ...word,
        text: word.text.split(''),
    }));

    const renderWords = () => {
        return (
            <div>
                {wordsArray.map((word, idx) => (
                    <div key={`word-${idx}`} className="inline-block">
                        {word.text.map((char, index) => (
                            <span
                                key={`char-${index}`}
                                className={`text-white ${word.className} font-monument-bold text-6xl font-semibold`}
                                style={{
                                    color: word.className ? '#fbbf24' : 'white',
                                }}
                            >
                                {char}
                            </span>
                        ))}
                        {idx !== words.length - 1 && <>&nbsp;</>}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className={cn('my-6 flex space-x-1', className)}>
            <motion.div
                className="overflow-hidden pb-2"
                initial={{
                    width: '0%',
                }}
                animate={{
                    width: 'fit-content',
                }}
                whileInView={{
                    width: 'fit-content',
                }}
                transition={{
                    duration: 1.2,
                    ease: 'linear',
                    delay: 0.2,
                }}
            >
                <div
                    className="lg:text:2xl text-xs font-bold sm:text-base md:text-xl xl:text-7xl"
                    style={{
                        whiteSpace: 'nowrap',
                    }}
                >
                    {renderWords()}
                </div>
            </motion.div>
            <motion.span
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: 'reverse',
                }}
                className={cn(
                    'block h-4 w-[4px] rounded-sm bg-yellow-500 sm:h-6 xl:h-16',
                    cursorClassName
                )}
            ></motion.span>
        </div>
    );
};
