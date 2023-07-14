import development from "/development.svg";

export default function Quiz() {
  return (
    <div className="layout h-screen">
      <img
        className="w-full md:w-1/2 m-auto my-10"
        src={development}
        alt="development img"
      />
      <h6 className="m-auto text-center">
        Can't wait for the quiz? Unfortunately Quiz is still in the development
        stage! ฅʕ•̫͡•ʔฅ
      </h6>
    </div>
  );
}
