type BubbleProps = {
  text: string;
  show: boolean;
};

export default function Bubble({ text, show }: BubbleProps) {
  if (!show) return null;

  return (
    <div className="absolute bottom-60 left-1/2 -translate-x-1/2 bg-white px-6 py-4 rounded-2xl shadow  w-[80%] text-base text-gray-800 text-center">
      {text}
    </div>
  );
}