import { SessionCode } from "../components";

function Home() {
  return (
    <div>
      <main className="max-w-[1500px] mx-auto py-4">
        <p className="max-w-[900px] text-center mx-auto text-xl">
          Bienvenue sur notre application de quiz en ligne, où le savoir
          rencontre le plaisir ! Testez vos connaissances avec une gamme variée
          de quiz couvrant différents sujets et niveaux de difficulté. Mettez
          vos compétences à l'épreuve, apprenez de nouvelles choses et défiez
          vos amis pour décrocher la première place du classement !
        </p>
        <SessionCode />
      </main>
    </div>
  );
}

export default Home;
