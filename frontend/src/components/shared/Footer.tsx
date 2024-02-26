import { LinkedinIcon, GithubIcon, Braces } from "lucide-react";

function Footer() {
  return (
    <footer className="flex   items-center justify-center w-full  bg-white p-10 mt-5">
      <div className="flex flex-row justify-center items-center gap-10">
        <a
          href="https://www.linkedin.com/in/danilo-guedes-dev"
          target="_blank"
          rel="noreferrer"
        >
          <LinkedinIcon className="text-primary" />
        </a>
        <a
          href="https://www.github.com/danilo-guedes"
          target="_blank"
          rel="noreferrer"
        >
          <GithubIcon className="text-primary" />
        </a>
        <a
          href="http://localhost:3000/api-docs"
          target="_blank"
          rel="noreferrer"
        >
          <Braces className="text-primary" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
