import { useState, useEffect } from "react";
import Header from "./assets/components/header";
import NoteCard from "./assets/components/noteCard";
import CreateNoteForm from "./assets/components/noteForm";
import api from "./api";
import { NoteFromDB } from "./interfaces";

function App() {
  const [currentFilter, setCurrentFilter] = useState(() => {
    return localStorage.getItem("filter") || "";
  });
  const [filterInput, setFilterInput] = useState("");
  const [currentNotes, setCurrentNotes] = useState<NoteFromDB[] | null>(null);

  useEffect(() => {
    getNotes();
  }, []);

  function getNotes() {
    api
      .get("/note/")
      .then((res) => res.data)
      .then((data) => {
        setCurrentNotes(data);
        console.log(data);
      })
      .catch((error) => alert(error));
  }

  function getArchivedNotes() {
    api
      .get("/note/archived/")
      .then((res) => res.data)
      .then((data) => {
        setCurrentNotes(data);
        console.log(data);
      })
      .catch((error) => alert(error));
  }

  function handleDeleteNote(id: number) {
    api
      .delete(`/note/${id}`)
      .then((res) => {
        if (res.status === 200) console.log("Note deleted!");
        else alert("Failed to delete");
      })
      .catch((error) => alert(error));
    window.location.reload();
  }
  function handleNotesFilter(category: string) {
    setCurrentFilter(category);
    localStorage.setItem("filter", category);
  }

  function handleArchiveNote(id: number) {
    api
      .put(`/note/archive/${id}`)
      .then((res) => {
        if (res.status === 200) console.log("Note archived!");
        else alert("Failed to archive");
      })
      .catch((error) => alert(error));
    window.location.reload();
  }

  return (
    <>
      <Header />
      <main className="flex sm:flex-row flex-col sm:gap-20 ">
        <aside className="flex flex-col sm:place-items-end place-items-center sm:w-1/2 max-w-full font-Montserrat pt-10 ">
          <section
            id="create-note-form"
            className="flex flex-col justify-start place-content-center sm:w-1/2 w-80 "
          >
            <h3 className=" font-MontserratSemibold text-3xl text-center  mb-10  ">
              Add a new note:
            </h3>
            <CreateNoteForm onCreateNote={() => getNotes()} />
          </section>
        </aside>
        <aside
          id="notes-list"
          className="flex flex-col sm:place-items-start place-items-center sm:w-1/2 min-h-screen w-full font-Montserrat py-10 "
        >
          <section
            id="my-notes"
            className="flex flex-col justify-start place-content-center sm:w-1/2  gap-10 "
          >
            <h3 className="font-MontserratSemibold text-3xl text-center ">
              My notes
            </h3>
            <div className="flex flex-row justify-start w-full gap-5">
              <button
                onClick={getNotes}
                className="bg-softGreen hover:bg-green text-white text-sm font-MontserratSemibold rounded p-2 shadow-md w-24"
              >
                active
              </button>
              <button
                onClick={getArchivedNotes}
                className="bg-softGreen hover:bg-green text-white text-sm font-MontserratSemibold rounded p-2 shadow-md w-24"
              >
                archived
              </button>
            </div>
            <div className="flex flex-row justify-center place-items-center gap-5  ">
              <label htmlFor="filter-notes">Filter:</label>
              <input
                value={filterInput ?? ""}
                onChange={(e) => setFilterInput(e.target.value)}
                type="text"
                id="filter-notes"
                placeholder={currentFilter ?? "by category..."}
                className=" p-2   bg-gray-50 focus:ring-grey focus:border-grey shadow-md "
              ></input>
              <button
                onClick={() => handleNotesFilter(filterInput)}
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
              {currentNotes?.map((note) => {
                if (currentFilter) {
                  if (currentFilter === note.category) {
                    return (
                      <NoteCard
                        id={note.id}
                        content={note.title}
                        category={note.category}
                        onDelete={handleDeleteNote}
                        onArchive={handleArchiveNote}
                        isArchived={note.isArchived}
                      />
                    );
                  }
                } else {
                  return (
                    <NoteCard
                      id={note.id}
                      content={note.title}
                      category={note.category}
                      onDelete={handleDeleteNote}
                      onArchive={handleArchiveNote}
                      isArchived={note.isArchived}
                    />
                  );
                }
              })}
            </div>
          </section>
        </aside>
      </main>
      {/* <footer></footer> */}
    </>
  );
}

export default App;
