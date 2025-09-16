import Logo from '@/shared/ui/logo';
import { NavigationContainer } from './gnb/NavigationContainer';

const Header = () => {
	return (
		<>
			<header className="flex items-center justify-center p-6">
				<div className="">
					<span className="sr-only">hyun qook jeong home</span>
					<h1 className="logo-block">
						<a href="/home" data-cursorrole="none" className="block">
							<Logo />
						</a>
					</h1>
				</div>
				<div className="cell gnb-block hidden">
					<button type="button" className="hgbtn btn-toggle-gnb" data-cursorrole="none">
						<span className="txt-open">
							<span className="txt txt1">C</span>
							<svg
								id="gnb-obj"
								viewBox="0 0 11 11"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<circle cx="5.5" cy="5.5" r="5.5" />
							</svg>
							<span className="txt txt2">NTACT</span>
						</span>
					</button>

					{/* gnb-wrap */}
					<nav className="gnb-wrap">
						<ul id="gnb">
							<li>
								<a href="mailto:hyunqok@kakao.com" data-cursorrole="none">
									Mail
								</a>
							</li>
							<li>
								<a href="/work" data-cursorrole="none">
									Project List
								</a>
							</li>
							<li>
								<a href="/certificate" data-cursorrole="none">
									SW Career Certificate
								</a>
							</li>
						</ul>
					</nav>
					{/* //gnb-wrap */}
				</div>
				{/* <NavigationContainer /> */}
			</header>
		</>
	);
};

export default Header;
