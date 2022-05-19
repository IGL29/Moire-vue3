import { ref } from 'vue';

export default () => {
  const srcImage = ref('');

  const doSetImage = (product, selectedColorId) => {
    if (product && selectedColorId !== undefined) {
      const colorItem = product?.colors.find((color) => (
        Number(color.color.id) === Number(selectedColorId)
      ));
      if (colorItem?.gallery?.[0]?.file?.url) {
        srcImage.value = colorItem.gallery[0].file.url;
      } else {
        srcImage.value = 'img/no_image.png';
      }
    } else {
      srcImage.value = 'img/no_image.png';
    }
  };

  return { srcImage, doSetImage };
};
