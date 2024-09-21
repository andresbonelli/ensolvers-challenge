import Header from "./assets/components/header";
import NoteCard from "./assets/components/noteCard";
import CreateNoteForm from "./assets/components/noteForm";

function App() {
  const lorem =
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. At repellendus debitis quas culpa veritatis saepe molestiae consectetur id. Laborum a adipisci sint commodi quaerat sed illo, non deserunt tempora minima.";
  return (
    <>
      <Header />
      <main className="flex sm:flex-row flex-col gap-20">
        <aside className="flex flex-col sm:place-items-end place-items-center sm:w-1/2  font-Montserrat pt-10 ">
          <section
            id="create-note-form"
            className="flex flex-col justify-start place-content-center sm:w-1/2   "
          >
            <h3 className=" font-MontserratSemibold text-3xl text-center  mb-10">
              Add a new note:
            </h3>
            <CreateNoteForm />
          </section>
        </aside>
        <aside
          id="notes-list"
          className="flex flex-col sm:place-items-start place-items-center sm:w-1/2 min-h-screen font-Montserrat py-10 gap-10 "
        >
          <section
            id="my-notes"
            className="flex flex-col justify-start place-content-center sm:w-1/2  gap-10"
          >
            <h3 className="font-MontserratSemibold text-3xl text-center ">
              My notes
            </h3>
            <div className="flex flex-row w-full justify-center place-items-center gap-5  ">
              <label htmlFor="filter-notes">Filter:</label>
              <input
                type="text"
                id="filter-notes"
                placeholder="by category..."
                className="w-80 p-2   bg-gray-50 focus:ring-grey focus:border-grey shadow-md "
              ></input>
              <button
                type="submit"
                className="h-full bg-softBlue hover:bg-blue text-white text-sm font-MontserratSemibold rounded p-2 shadow-md"
              >
                {`go`}
              </button>
            </div>
            <div
              id="notes-container"
              className="flex flex-col justify-start gap-5 place-items-center"
            >
              <NoteCard content={lorem} category="chores" />
            </div>
          </section>
        </aside>
      </main>
      {/* <footer></footer> */}
    </>
  );
}

export default App;
