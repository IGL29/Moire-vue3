export default function useChangeImage(product, selectedColorId) {
  let pictureByColor = null;

  if (product) {
    const colorItem = product?.colors.find((color) => (
      Number(color.color.id) === Number(selectedColorId)
    ));
    if (colorItem?.gallery?.[0]?.file?.url) {
      pictureByColor = colorItem.gallery[0].file.url;
    }
  } else {
    pictureByColor = 'img/no_image.png';
  }
  return pictureByColor;
}
