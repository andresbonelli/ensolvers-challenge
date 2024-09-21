export default function CreateNoteForm() {
  return (
    <form className="">
      <div className="mb-5 ">
        <label
          htmlFor="note-title-input"
          className=" block mb-2  text-gray-900"
        >
          Note content:
        </label>
        <textarea
          id="large-input"
          placeholder="write something..."
          className="block w-full p-2   bg-gray-50  focus:ring-grey focus:border-grey shadow-md "
        ></textarea>
      </div>

      <div>
        <label
          htmlFor="note-category-input"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Category:
          <span className="text-xs text-red font-MontserratLight pl-2">
            (optional)
          </span>
        </label>
        <input
          type="text"
          id="note-category-input"
          placeholder="eg: chores, reminders..."
          className="block w-full p-2   bg-gray-50 focus:ring-grey focus:border-grey shadow-md "
        ></input>
      </div>
      <button
        type="submit"
        className="w-full bg-softBlue hover:bg-blue text-white text-sm font-MontserratSemibold rounded p-2 mt-5 shadow-md"
      >
        create
      </button>
    </form>
  );
}
