import { FC } from 'react';
import classnames from 'classnames';

import Input from 'components/common/atoms/Input';

import styles from './ProductInfoForm.module.scss';

type ProductInfoFormProps = {
  className?: string;
};

const ProductInfoForm: FC<ProductInfoFormProps> = ({ className = '' }) => {
  return (
    <div className={classnames(styles.productInfoForm, className)}>
      <div className={styles.inputRow}>
        <p>商品標題</p>
        <Input className={styles.productTitle} />
      </div>
      <div className={styles.inputRow}>
        <p>商品售價</p>
        <Input />
      </div>
      <div className={styles.inputRow}>
        <p>商品庫存</p>
        <Input />
      </div>
    </div>
  );
};

export default ProductInfoForm;
