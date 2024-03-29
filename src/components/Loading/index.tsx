import loading from '../../images/loader/Reload-1s-200px.svg';
import styles from './Loading.module.css';

export default function Loading() {
  return (
    <div className={ styles.loader_container }>
      <img className={ styles.loader } src={ loading } alt="img if loading" />
    </div>
  );
}
