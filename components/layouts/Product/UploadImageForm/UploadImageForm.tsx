import { FC, useState, ChangeEventHandler } from 'react';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import classnames from 'classnames';

import { storage } from 'firebaseConfig/firebaseStorage';
import { roundToX } from 'utils/calc';

import UploadInput from 'components/common/atoms/UploadInput';
import Button from 'components/common/atoms/Button';

import styles from './UploadImageForm.module.scss';
import Icon from 'components/common/atoms/Icon';
import Label from 'components/common/atoms/Label';

type UploadImageFormProps = {
  className?: string;
};

const UploadImageForm: FC<UploadImageFormProps> = ({ className }) => {
  const [previewImgUrls, setPreviewImgUrls] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [storageImgUrl, setStorageImgUrl] = useState<string[]>([]);
  const [progresspercent, setProgresspercent] = useState<number[]>([]);
  const [primaryImgUrl, setPrimaryImgUrl] = useState<string>('');

  const removeImage = (index: number) => {
    setPreviewImgUrls((prevState) => {
      let newState = [...prevState];
      newState.splice(index, 1);
      return [...newState];
    });
    setImageFiles((prevState) => {
      let newState = [...prevState];
      newState.splice(index, 1);
      return [...newState];
    });
    setProgresspercent((prevState) => {
      let newState = [...prevState];
      newState.splice(index, 1);
      return [...newState];
    });
  };

  const previewHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];

    if (!file) return;

    // check if image size > 1MB
    if (file.size > 1048576) {
      alert('檔案大小超過 1MB，請選擇其他檔案');
      return;
    }

    const reader = new FileReader();

    reader.addEventListener(
      'load',
      function () {
        // convert image file to base64 string
        if (reader.result) setPreviewImgUrls((prevState) => [...prevState, reader.result as string]);
      },
      true
    );

    if (file) {
      reader.readAsDataURL(file);
    }

    setImageFiles((prevState) => [...prevState, file]);
    setProgresspercent((prevState) => [...prevState, 0]);
  };

  const onSubmitHandler = () => {
    if (imageFiles.length === 0) return;

    imageFiles.forEach((imageFile, index) => {
      const storageRef = ref(storage, `files/${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgresspercent((prevState) => {
            let newState = [...prevState];
            newState[index] = progress;
            return newState;
          });
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setStorageImgUrl((prevState) => [...prevState, downloadURL]);
          });
        }
      );
    });
  };

  return (
    <div className={classnames(styles.uploadImageForm, className)}>
      <div className={styles.header}>
        <UploadInput className={styles.uploadInput} onChangeHandler={previewHandler}>
          <Button>選擇檔案</Button>
        </UploadInput>
        <ul className={styles.uploadNotation}>
          <li>上傳商品圖檔，提高關注度有利於出售</li>
          <li>最多可上傳 5 張圖檔，每張大小請勿超過 1 MB</li>
          <li>選擇一張圖片作為封面圖片</li>
          <li>
            已上傳 <span>{previewImgUrls.length}</span> 張，可再上傳 <span>{5 - previewImgUrls.length}</span> 張
          </li>
        </ul>
      </div>
      {previewImgUrls.length > 0 && (
        <>
          <div className={styles.line} />
          <div className={styles.gallery}>
            {previewImgUrls.map((previewImgUrl, index) => (
              <div className={styles.imageContaner} key={previewImgUrl} onClick={() => setPrimaryImgUrl(previewImgUrl)}>
                <img className={styles.image} src={previewImgUrl} alt={'preview-image'} />
                <p>{imageFiles[index].name}</p>
                {progresspercent[index] > 0 && progresspercent[index] < 100 && (
                  <div className={styles.progress}>
                    <div style={{ width: `${progresspercent[index]}%` }} />
                  </div>
                )}
                <p>{roundToX(imageFiles[index].size / 1048576, 3)} MB</p>
                {previewImgUrl === primaryImgUrl && <Label content="封面圖片" />}
                <Icon className={styles.icon} src={'/icons/trashcan.icon.png'} onClick={() => removeImage(index)} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UploadImageForm;
