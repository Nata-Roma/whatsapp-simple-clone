import { FC } from "react";
import styles from './loader.module.css';

interface LoaderProps {
color: string;
size: number;
styling?: {};
className: string;
}

const Loader: FC<LoaderProps> = ({ color, className, styling, size }) => {
  const circles = [...Array(12)].map((_, index) => (
    <div key={index} style={{ background: `${color}`, width: size * 0.075, height: size * 0.075 }} />
  ))

  return (
    <div className={styles.lds_default} style={{ height: size, width: size, ...styling }}>
      {circles}
    </div>
  )
}

export default Loader;