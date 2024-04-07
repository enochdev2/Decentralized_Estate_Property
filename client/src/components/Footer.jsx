import {
  TiSocialFacebook,
  TiSocialInstagram,
  TiSocialLinkedin,
  TiSocialTwitter,
} from 'react-icons/ti';
import logoprimary from '../assets/logo-primary.png';
import FooterICON from '../assets/FooterICON';

const Footer = () => {
  const social = [
    {
      link: '#',
      name: 'Facebook',
      icon: <TiSocialFacebook />,
    },
    {
      link: '#',
      name: 'Twitter',
      icon: <TiSocialTwitter />,
    },
    {
      link: '#',
      name: 'Linkedin',
      icon: <TiSocialLinkedin />,
    },
    {
      link: '#',
      name: 'Instagram',
      icon: <TiSocialInstagram />,
    },
  ];

  return (
    <footer className="fopter py-10 text-center items-start bg-dark-2 border-t-[#ffba00] border-t ">
      {/* <canvas id="can"></canvas> */}
      <div className="containers">
        <div className="row">
          <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-12 col-sm-offset-0 col-xs-12">
            <div className="widget w-info">
              <a href="/" className="site-logo">
                <ing src={logoprimary} alt="" />
                <FooterICON />
              </a>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Suscipit tempora quaerat maxime mollitia provident aperiam
                nostrum qui minus, porro libero accusamus hic est fugit ! Vel
                iusto quisquam perferendis amet ipsa?
              </p>
            </div>

            <div className=" widget w-contacts">
              <ul className=" socials social--white flex w-full justify-center space-x-5">
                {social.map((social, index) => (
                  <li key={index} className="social-item">
                    <a href={social.link} className="woox-icon">
                      {social.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="sub-footer mb-8">
        <div className="containers">
          <div className="row">
            <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-12 col-sm-offset-0 col-xs-12">
              <span>@ All right reserved 2024</span>
              <span>
                <a href="/" className="text-[#ffba00]">
                  Enoch Tech
                </a>{' '}
                - Decentralized Real_Estate
              </span>

              <div className="logo-design">
                <ing src="img/logo-fire.png" alt="" />
                <div className="design-wrap">
                  <div className="sub-title"> Design By</div>
                  <a
                    href="https://theblockchainc.com"
                    className="logo-title text-[#ffba00]"
                  >
                    @DeFi Prince
                  </a>
                </div>
              </div>

              <div className="logo-desgin logo-design-crumina">
                <ing src="img/crumina-logo.png" alt="" />
                <div className="design-wrap">
                  <div className=""> Design By</div>
                  <a href="https://theblockchainco.com" className="logo-title">
                    @The BlockChain
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a href="#" className="back-to-top">
        <svg className="">
          <use xlinkHref="#icon-top-arrow"></use>
        </svg>
      </a>
    </footer>
  );
};

export default Footer;
