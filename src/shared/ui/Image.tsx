import { cn } from '../lib'

type ImageProps = {
  src: string
  alt?: string
  className?: string
} & React.ImgHTMLAttributes<HTMLImageElement>

export default function Image({ src, alt, className, ...rest }: ImageProps) {
  function onError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
    e.currentTarget.src = '/images/placeholder.png'
    e.currentTarget.className = cn(className, 'bg-base-bg object-none')
  }

  return <img className={className} src={src} alt={alt} onError={onError} {...rest} />
}
