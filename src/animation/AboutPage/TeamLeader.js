// Animation Variants
export const cardVariants = {
    hidden: (direction) => ({
      opacity: 0,
      x: direction === "left" ? -100 : 100, // Slide from left or right
      scale: 0.9,
    }),
    visible: {
      opacity: 1,
      x: 0, // Final position
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
  };
  
  // Heading Animation Variants
  export const headingVariants = {
    hidden: {
      opacity: 0,
      y: -40, // Start slightly above
    },
    visible: {
      opacity: 1,
      y: 0, // Slide down to final position
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: 0.2, // Slight delay for smoother effect
      },
    },
  };
  
  // Container Animation for Stagger Effect
  export const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2, // Delays each child animation slightly
      },
    },
  };
