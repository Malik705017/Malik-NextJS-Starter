import { FC } from 'react';
import classnames from 'classnames';

import TextArea from 'components/common/atoms/TextArea';

import styles from './ProductDetailForm.module.scss';

type ProductDetailFormProps = {
  className?: string;
};

const ProductDetailForm: FC<ProductDetailFormProps> = ({ className = '' }) => {
  return (
    <div className={classnames(styles.productDetailForm, className)}>
      <p>商品詳細資訊</p>
      <TextArea className={styles.textArea} />
    </div>
  );
};

export default ProductDetailForm;
