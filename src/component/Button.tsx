// components/Button.tsx
interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => (
    <button
        onClick={onClick}
        className={`bg-[#086568] text-white rounded-3xl py-2 px-5 ${className || ''}`}
    >
        {children}
    </button>
);