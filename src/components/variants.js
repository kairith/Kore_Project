export const fadeIn = (direction, delay) => {
    return {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
            x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
        },
        show: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                type: "tween",
                duration: 0.8,
                delay: delay,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    };
};
