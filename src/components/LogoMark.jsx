export default function LogoMark({ className = '', width = 44, height = 44 }) {
  const size = height || width;
  return (
    <img
      src="/kitebaze-icon.png"
      alt=""
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size, objectFit: 'contain' }}
      aria-hidden="true"
    />
  );
}

