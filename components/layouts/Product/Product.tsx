import { FC } from 'react';

import ProductInfoForm from 'components/layouts/Product/ProductInfoForm';
import ProductImageForm from 'components/layouts/Product/UploadImageForm';
import SectionWrapper from 'components/common/molecules/SectionWrapper';

import styles from './Product.module.scss';
import ProductDetailForm from './ProductDetailForm';
import Button from 'components/common/atoms/Button';

const Product: FC = () => {
  return (
    <SectionWrapper>
      <form className={styles.productForm}>
        <h1>填寫商品資訊</h1>
        <ProductInfoForm className={styles.subForm} />
        <div className={styles.line} />
        <ProductImageForm className={styles.subForm} />
        <div className={styles.line} />
        <ProductDetailForm className={styles.subForm} />
        <div className={styles.line} />
        <Button className={styles.button}>刊登商品</Button>
      </form>
    </SectionWrapper>
  );
};

export default Product;
