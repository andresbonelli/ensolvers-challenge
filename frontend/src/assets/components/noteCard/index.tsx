interface NoteCardProps {
  content: string;
  category?: string | null;
  isArchived?: boolean;
}

export default function NoteCard({
  content,
  category,
  isArchived,
}: NoteCardProps) {
  const bgColor = isArchived ? "bg-grey" : "bg-orange-100";
  return (
    <div
      id="note-card"
      className={`flex flex-col  justify-between w-96 min-h-44 p-5 ${bgColor} shadow-md gap-2`}
    >
      <p className="text-lg  ">{content}</p>
      <p className="text-sm font-MontserratLight ">{category}</p>
    </div>
  );
}
