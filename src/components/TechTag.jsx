import { motion } from "framer-motion";
import BrandIcon from "@/components/BrandIcon";
import { TECH } from "@/data/tech";

export default function TechTag({ name }) {
  return (
    <motion.li
      whileHover={{ y: -3, scale: 1.06 }}
      whileTap={{ y: -3, scale: 1.06 }}
      transition={{ type: "spring", stiffness: 420, damping: 18 }}
      className="tag tag-hover inline-flex items-center gap-1.5 !py-1 cursor-default"
    >
      <BrandIcon def={TECH[name]} size={14} />
      {name}
    </motion.li>
  );
}
