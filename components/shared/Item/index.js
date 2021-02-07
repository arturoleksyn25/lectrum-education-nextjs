import Link from "next/link";

import styles from './item.module.scss';

const Item = ({dateOfReceiving, content, id, type}) => {
  return (
    <div className={styles.block}>
      <span>{dateOfReceiving}</span>
      <Link href={`/${type}/${id}`}>
        <a>
          {content}
        </a>
      </Link>
    </div>
  )
}

export default Item;