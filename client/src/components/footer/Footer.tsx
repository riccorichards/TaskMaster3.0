import { FaGithubSquare, FaLinkedin } from "react-icons/fa";
import { SiUpwork, SiLeetcode, SiCodewars } from "react-icons/si";
import author from "../../assets/editedProfile.jpg";
import resume from "../../assets/Richards Trofimov.pdf";
import Utils from "../../utils/Utils";
import "./Footer.scss";
const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="introduce-myself">
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <div className="author-img">
              <img src={author} alt="author" />
            </div>
            <div>
              <h3>Richards T.</h3>
              <button
                onClick={() =>
                  Utils.handleDownloadResume(resume, "Richards_resume")
                }
              >
                Resume
              </button>
            </div>
          </div>
          <p>
            Hello everyone, I'm glad to see you here. As a full-stack software
            engineer with a keen interest in AI, I've honed my skills using a
            variety of AI tools and I'm passionate about collaborative work on
            meaningful projects. With expertise in databases like MongoDB,
            Postgres, and MySQL, my goal is to contribute to substantial
            projects. I'm currently expanding my horizons into Python for
            machine learning and Blockchain technology, eager to weave these
            cutting-edge fields into my future work.
          </p>
          <section className="networks">
            <a
              href="https://github.com/riccorichards"
              target="_blunk"
              style={{ color: "inherit" }}
            >
              <FaGithubSquare className="network-item" />
            </a>
            <a
              href="https://www.linkedin.com/in/riccot/"
              target="_blunk"
              style={{ color: "inherit" }}
            >
              <FaLinkedin className="network-item" />
            </a>
            <a
              href="https://www.upwork.com/freelancers/~019ca3b560397f1173"
              target="_blunk"
              style={{ color: "inherit" }}
            >
              <SiUpwork className="network-item" />
            </a>
            <a
              href="https://leetcode.com/riccorichards/"
              target="_blunk"
              style={{ color: "inherit" }}
            >
              <SiLeetcode className="network-item" />
            </a>
            <a
              href="https://www.codewars.com/users/riccorichards"
              target="_blunk"
              style={{ color: "inherit" }}
            >
              <SiCodewars className="network-item" />
            </a>
          </section>
        </div>
        <div className="my-projects">
          <h3>Projects</h3>
          <ul>
            <li>Portfolio</li>
            <li>
              TaskMaster3.0 <span className="new">New</span>
            </li>
            <li>TaskMaster2.0</li>
            <li>
              TaskMasterCLI <span className="new">New</span>
            </li>
            <li>AI-prompts generator</li>
            <li>YouTube Clone</li>
            <li>Jobs List</li>
          </ul>
        </div>
      </div>

      <span>© Copyright 2024. Made by RiccoRichards</span>
    </footer>
  );
};

export default Footer;
