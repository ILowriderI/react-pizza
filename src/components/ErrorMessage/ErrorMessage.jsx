import errorImg from '../../img/oops.jpg';
import styles from './ErrorMessage.module.scss';

const ErrorMessage = ()=>{
return(
    <div className={styles.cont} >
        <h2>We cannot display data <br/>
       Come back when we fix everithing <br /> </h2>
        <img src={errorImg} alt="error data" />
    </div>
)
}

export default ErrorMessage;