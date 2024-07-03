import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.svg";
import Close from "../assets/images/icon-close.svg";
import Hamburger from "../assets/images/icon-menu.svg";
import RightNav from "./CartProfile";
import "../../styles/Navbar.css";

export default function Navbar() {
	// working in mobile first so implement toggle
	const [openMenu, setOpenMenu] = useState(false);

	//set the opposite of what it currently is
	//if it's false, it'll become true
	const toggleNavbar = () => {
		setOpenMenu(!openMenu);
	};

	return (
		<>
			<header>
				<div className="navbar">
					<div className="left-side">
						<button
							onClick={toggleNavbar}
							aria-expanded={openMenu ? "true" : "false"}
						>
							<img className="hamburger" src={Hamburger} alt="open menu" />
						</button>
						<Link className="logo" to="/">
							<p>See/Possible</p>
						</Link>
						<div id="links">
							<button className="closeNav" onClick={toggleNavbar}>
								<img src={Close} alt="close navbar" />
							</button>
							<div>

							</div>
						</div>
						<div className="mobile-bg" onClick={toggleNavbar}></div>
					</div>
					<RightNav />
				</div>
			</header>
		</>
	);
}
