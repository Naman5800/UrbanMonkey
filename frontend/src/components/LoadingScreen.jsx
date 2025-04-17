import React from "react";
import { motion } from "framer-motion";

const LoadingScreen = () => {
  const screenVariants = {
    initial: { y: "-100%" },
    animate: { y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { y: "100%", transition: { duration: 0.5, ease: "easeIn" } },
  };

  const lineVariants = {
    initial: { scaleX: 0, originX: 0 },
    animate: { scaleX: 1, transition: { duration: 0.8, ease: "easeInOut", delay: 0.2 } },
  };

  const capVariants = {
    initial: { rotateY: 0 },
    animate: {
      rotateY: 360,
      transition: { duration: 0.8, ease: "linear", repeat: 1 },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
      variants={screenVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.img
        src="https://www.urbanmonkey.com/cdn/shop/files/trucker-monkey-002-umbt0002-tl-104887.jpg"
        alt="Urban Monkey Cap"
        className="w-24 h-24 object-cover mb-8"
        variants={capVariants}
      />
      <motion.div
        className="w-64 h-1 bg-blue-600"
        variants={lineVariants}
      />
    </motion.div>
  );
};

export default LoadingScreen;