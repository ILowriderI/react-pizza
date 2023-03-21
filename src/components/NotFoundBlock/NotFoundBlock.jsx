
import img from '../../img/nf404.jpg';
import styles from './NotFoundBlock.module.scss'


const NotFoundBlock = ()=>{
    return (
        <div className={styles.wrap}>
        <h1>Nothing found 😕 </h1>
        <img  src={img} alt="not found" />
        </div>
    )
}

export default NotFoundBlock;