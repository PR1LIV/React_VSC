const Image = ({ imageUrl, alt = 'image', style = {} }) => (
  <img src={imageUrl} alt={alt} style={style} />
);

export default Image;