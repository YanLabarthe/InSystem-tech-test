import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

// CREDIT FOR THE SIDEBAR TO Neurolinker (https://tailwindcomponents.com/component/admin-panel-basic-template)
// I just adapted it to typescript / react.

interface SideBarProps {
  children: ReactNode;
}

const SideBar: React.FC<SideBarProps> = ({ children }) => {
  const [darkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const openNav = () => {
      setSidebarOpen(!sidebarOpen);
  };

  const getSidebarContentClass = (baseClass) => {
    return `${baseClass} ${sidebarOpen ? '' : 'hidden'}`;
  };

  const sidebarClasses = `flex justify-center w-60 fixed transition transform ease-in-out duration-1000 z-50 flex h-screen bg-[#1E293B] ${
    sidebarOpen ? "translate-x-0" : "-translate-x-48"
  }`;

  const mainContentClasses = `content ml-12 pt-20 transform ease-in-out duration-1000 px-2 md:px-5 pb-4 ${sidebarOpen ? 'ml-[240px]' : 'ml-12'}`;
  
  const maxToolbarClasses = `max-toolbar transition-transform ease-in-out duration-300 flex items-center border-4 border-white dark:border-[#0F172A] bg-[#1E293B] absolute top-2 rounded-full h-12 ${
    sidebarOpen ? "translate-x-0" : "translate-x-0 scale-x-0"
  }`;

  return (
    <div className={`${darkMode ? "dark bg-[#0F172A]" : "bg-white"}`}>
    <div className = "fixed w-full z-30 flex bg-white dark:bg-[#0F172A] p-2 items-center justify-center h-16 px-10">
        <div className = "grow h-full flex items-center justify-center"></div>
        <div className = "flex-none h-full text-center flex items-center justify-center">
            
                <div className = "flex space-x-3 items-center px-3">
                    <div className = "flex-none flex justify-center">
                    <div className="w-8 h-8 flex ">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShta_GXR2xdnsxSzj_GTcJHcNykjVKrCBrZ9qouUl0usuJWG2Rpr_PbTDu3sA9auNUH64&usqp=CAU" alt="profile" className="shadow rounded-full object-cover" />
                    </div>
                    </div>
                    <div className = "hidden md:block text-sm md:text-md text-black dark:text-white">User Name</div>
                </div>            
    </div>
    </div>
    <aside className={sidebarClasses}>
        <div className={maxToolbarClasses}>
            <div  className = "flex items-center space-x-3 group bg-gradient-to-r dark:from-cyan-500 dark:to-blue-500 from-indigo-500 via-purple-500 to-purple-500  pl-10 pr-2 py-1 rounded-full text-white  ">
                <div className= "transform ease-in-out duration-300 mr-12">
                    HubEau
                </div>
            </div>
        </div>
        <div onClick={openNav} className="-right-6 transition transform ease-in-out duration-500 flex border-4 border-white dark:border-[#0F172A] bg-[#1E293B] dark:hover:bg-blue-500 hover:bg-purple-500 absolute top-2 p-3 rounded-full text-white hover:rotate-45">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
        </div>
        <div className={getSidebarContentClass("max text-white mt-20 flex-col space-y-2 w-full h-[calc(100vh)]")}>
            <div onClick={() => navigate("/")} className =  "hover:ml-4 w-full text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-10 rounded-full transform ease-in-out duration-300 flex flex-row items-center justify-left space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>    
                <div>
                    Home
                </div>
            </div>
            <div onClick={() => navigate("/stations")} className =  "hover:ml-4 w-full text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-10 rounded-full transform ease-in-out duration-300 flex flex-row items-center justify-left space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                </svg>                      
                <div>
                    Stations
                </div>
            </div>
        </div>
          {!sidebarOpen &&
          <>
                  <div className= "mini mt-20 flex flex-col space-y-2 w-full h-[calc(100vh)]">

         <div onClick={() => navigate("/")} className= "hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-500 w-full bg-[#1E293B] p-3 rounded-full transform ease-in-out duration-300 flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>                  
            </div>
            <div onClick={() => navigate("/stations")} className= "hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-500 w-full bg-[#1E293B] p-3 rounded-full transform ease-in-out duration-300 flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                </svg>                 
            </div>
            </div>

            </>
            }
            
    </aside>
    <div className={mainContentClasses}>
      {children}
    </div>
</div>
  )
}

export default SideBar