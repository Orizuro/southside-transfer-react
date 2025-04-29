import Link from "next/link";

interface ButtonProps {
  href?: string;
  text?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export default function CtnButton({
  href = "/pay",
  text = "Book your ride",
  variant = 'primary',
  size = 'md',
  className = '',
  onClick
}: ButtonProps = {}) {

  // Base button styles
  const baseStyles = "font-medium rounded-lg transition-colors duration-200 inline-flex items-center justify-center";

  // Size variations
  const sizeStyles = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5",
    lg: "px-6 py-3 text-lg"
  };

  // Variant styles
  const variantStyles = {
    primary: "bg-secondary hover:bg-secondary-dark text-white shadow-sm",
    secondary: "bg-primary hover:bg-primary-dark text-white shadow-sm",
    outline: "bg-transparent border-2 border-secondary text-secondary hover:bg-secondary hover:text-white"
  };

  // Combine all styles
  const buttonStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  // If href is provided, render as Link
  if (href) {
    return (
      <Link href={href}>
        <button className={buttonStyles} onClick={onClick}>
          {text}
        </button>
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <button className={buttonStyles} onClick={onClick}>
      {text}
    </button>
  );
}
