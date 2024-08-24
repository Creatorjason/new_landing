"use client"

import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const AnimateOnScroll = ({ children, animation = {}, className = "" }) => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: { opacity: 1, y: 0, ...animation.visible },
        hidden: { opacity: 0, y: 50, ...animation.hidden }
      }}
      transition={{ duration: 0.7, ...animation.transition }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimateOnScroll;