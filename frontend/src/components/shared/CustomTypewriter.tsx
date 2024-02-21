import { Typewriter } from "react-simple-typewriter";

export default function CustomTypewriter() {
  return (
    <Typewriter
      words={[
        "Sejam bem vindo ao meu teste para a vaga de fullstack da WhiteMex!",
        "Espero que gostem da aplicação!",
        "Obrigado pela oportunidade!",
        "Stack do front: Typescript, Vite, React, Tailwind, React-Query",
        "Stack do back: Typescript, Node, Express, MongoDB",
      ]}
      cursor
      cursorBlinking
      cursorColor="rgb(96 165 250 / 1)"
      cursorStyle="_"
      typeSpeed={80}
      deleteSpeed={50}
      delaySpeed={1500}
      loop={true}
    />
  );
}
