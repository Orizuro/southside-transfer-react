
export default function Sucess() {
  return <div>
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h1 className="flex font-bold text-xl justify-center">Sucess!</h1>
        <p className="py-4">Press ESC key or click the button below to close</p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn" onClick={() => { }}>Close</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
}
