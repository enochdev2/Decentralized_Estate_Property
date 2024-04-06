import { FiGlobe } from 'react-icons/fi'
import { TiSocialYoutube, TiSocialInstagram,TiSocialLinkedin, TiSocialTwitter, TiSocialFacebook } from 'react-icons/ti'

const Footer = () => {
  const social = [
    {
      link: "#",
      name: "Facebook",
      icon: <TiSocialFacebook/>
    },
    {
      link: "#",
      name: "Twitter",
      icon: <TiSocialTwitter/>
    },
    {
      link: "#",
      name: "Linkedin",
      icon: <TiSocialLinkedin/>
    },
    {
      link: "#",
      name: "Instagram",
      icon: <TiSocialInstagram/>
    },
  ]

  return (
    <footer className=''>
<canvas id="can"></canvas>
<div className="">
  <div className="">
  <div className="">
  <div className="">
 <a href="/" className="">
 <ing src="img/logo-primary.png"
 alt="" />
 {/* <FooterICON /> */}
 </a>
 <p>
 Lorem ipsum dolor sit amet
 consectetur adipisicing elit.
 Suscipit tempora quaerat maxime
 mollitia provident aperiam
 nostrum qui minus, porro libero
 accusamus hic est fugit ! Vel
 iusto quisquam perferendis amet
 ipsa?
 </p>
 </div>

<div className="">
 <ul className="">
 {
 social.map((social, index)=>(
 <li key={index}
 className="'social-item">
 <a href={social.link} className='woox-icon'>
{social.icon}
 </a>
 </li>
 ))}
 </ul>
  </div>
  </div>
  </div>
</div>
<div className="">
<div className="">
  <div className="">
  <div className="">
 <span>@ All right reserved 2024</span>
 <span>
 <a href="/">Enoch Tech</a> - Decentralized Real_Estate
 </span>

  <div className=""> 
  <ing src="img/logo-fire.png" alt="" />
   <div className=""> 
   <div className=""> Design By</div>
 <a href="https://theblockchainc.com"
 className="logo-title">
 @DeFi Prince
</a>
 </div>
 </div>

 <div className="">
  <ing src="img/crumina-logo.png" alt="" />
  <div className=" design-wrap"> 
   <div className=""> Design By</div>
 <a href="https://theblockchainco.com"
 className="logo-title">
 @The BlockChain
</a>
 </div>
  </div>
 </div>
 </div>
 </div>
 </div>
  {/* <a href="#" className="back-to-top">
 <svg className="woox-icon icon-top-arrow">
 <use xlinkHref="#icon-top-arrow"></use>
 </svg>
 </a> */}
    </footer>
  )
}

export default Footer
