import Loader from './Loader';
import styles from '../../styles/loading.module.css';

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loadingContainer}
      >
        <img
          src="/whatsapp.png"
          style={{ marginBottom: 10 }}
          height="200"
          alt='Loading'
        />
        <Loader color="#3cbc28" size={60} className="" />
      </div>
    </div>
  );
};

export default Loading;
