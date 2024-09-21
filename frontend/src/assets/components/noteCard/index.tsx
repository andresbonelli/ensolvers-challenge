interface NoteCardProps {
  id: number;
  content: string;
  category?: string | null;
  isArchived?: boolean;
  onDelete: Function;
  onArchive: Function;
}

export default function NoteCard({
  id,
  content,
  category,
  isArchived,
  onDelete,
  onArchive,
}: NoteCardProps) {
  const bgColor = isArchived ? "bg-gray-200" : "bg-orange-100";
  const fontColor = isArchived ? "text-gray-400" : "text-black";
  return (
    <div
      key={id}
      id="note-card"
      className={`flex flex-col  justify-between w-full min-h-44 p-5 ${bgColor} ${fontColor} shadow-md gap-2`}
    >
      <p className="text-lg  ">{content}</p>
      <p className="text-sm font-MontserratLight ">{category}</p>
      {isArchived ? (
        <>
          <button
            onClick={() => onArchive(id)}
            className="bg-softGreen text-white"
          >
            restore
          </button>
          <button onClick={() => onDelete(id)} className="bg-red text-white">
            delete
          </button>
        </>
      ) : (
        <button
          onClick={() => onArchive(id)}
          className="bg-gray-400 text-white"
        >
          archive
        </button>
      )}
    </div>
  );
}
