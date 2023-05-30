import binService from "../services/bin";

let currentURL;

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("url")) {
    document.querySelector(".url").classList.add("hidden");
  }
});

const NewURL = ({ domain }) => {
  async function createURL(event) {
    try {
      let data = await binService.createBin();
      currentURL = domain + data;
    } catch (error) {
      currentURL = "Error: URL not created";
    }
    event.target.nextElementSibling.classList.remove("hidden");
  }

  return (
    <div className="newUrl-container">
      <button className="btn-new" onClick={createURL}>
        Create URL
      </button>
      <p className="url hidden">{currentURL}</p>
    </div>
  );
};
export default NewURL;
