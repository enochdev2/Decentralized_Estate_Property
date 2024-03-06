import { FiGlobe } from 'react-icons/fi'

const Footer = () => {
  return (

    <div
      className=" px-10 py-6 w-full flex flex-col sm:flex-row
    justify-center sm:justify-between text-white border-t-2 border-t-primary-500 z-50"
    >
      <p className="flex space-x-4 items-center text-gray-600 text-lg">
        With ♥️ Dapp-Estate &copy;{new Date().getFullYear()}
      </p>
      <div className="flex space-x-4 justify-center items-center font-semibold text-lg">
        <FiGlobe />
        <p>English (US)</p>
      </div>
    </div>
  )
}

export default Footer
