import "./UserSearch.css";
import {useState} from "react";
import dateFormat from 'dateformat';


export const UserSearch = () => {

    const [theme , setTheme] = useState("Light");
    const [imgSrc , setImgSrc] = useState("assets/icon-sun.svg");
    const [searchString , setSearchString] = useState("")
    const [userData , setUserData] = useState({});

    const setDarkMode = () => {
        document.querySelector('body').setAttribute("data-theme","dark");
        console.log("darktheme")
    }

    const setLightMode = () => {
        document.querySelector('body').setAttribute("data-theme","light");
        console.log("lighttheme")

      }

      
const toggleTheme = () => {
    if(theme === "Light") {
      setTheme("Dark");
      setImgSrc("assets/icon-moon.svg")
      setLightMode();
    }else {
        setTheme("Light");
        setImgSrc("assets/icon-sun.svg")
      setDarkMode();
    }
  
  }

  const userInput = (e) => {
    setSearchString(e.target.value);
  }

        // const getUser = async(searchString) => {

        // const response =  await Axios.get(
        //     `https://api.github.com/users/${searchString}`
        //   ).then((response) => {
        //     return response.json();
            
        //   }).then((data) => {
        //     console.log(data);
        //     console.log(response);

        //     setUserData(data);
        //   });
            
        //   
        const getUser = async e => {
            e.preventDefault();
        
        const response= await fetch(`https://api.github.com/users/${searchString}`);
        const user = await response.json();
    
        console.log(user);
    
        if (user) {
            setUserData(user);
        }
    
        };

        // 

        // };
        


  return (
  <> 

  <div className="container-wrapper">

    <div className="container">
      <div className="dev-finder">
        <div className="dev-heading">
          <p>devfinder</p>
        </div>
        <div onClick={toggleTheme}  className="dev-theme">
          <p>{theme}</p>
          <img src={imgSrc} alt=""/>
        </div>
      </div>

      <div className="dev-search">
     <form onSubmit={getUser}>

        <div className="dev-input">

          <img src="assets/icon-search.svg" alt=""/>
          <input type="text" name="" onChange={userInput} value= {searchString}  placeholder="Search GitHub username…" required/>
        </div>

        <button type="submit" name="button">Search</button>
        </form>
      </div>

      <div className="dev-info">
        <div className="dev-avatar">
          <img src={(userData.avatar_url) ? (userData.avatar_url) : "assets/avatar.svg"} alt=""/>
        </div>
        <div className="dev-details">

          <div className="dev-details-name">
            <div className="dev-details-name-username">
              <p className="dev-name">{(userData.avatar_url) ? (userData.name) : "The Octocat"}</p>
              <p className="dev-username">{(userData.login) ? (userData.login) : "@octocat"}</p>
            </div>

            <div className="dev-details-name-joined">
              <p>Joined
                <span>
                {(userData.created_at) ? dateFormat((userData.created_at), " dd mmm yyyy") : " 25 Jan 2011"}
                </span>
              </p>
            </div>

          </div>

          <div className="dev-details-bio">
            <p>{(userData.bio) ? (userData.bio) : "This profile has no bio"}</p>
          </div>

          <div className="dev-details-repo">
            <div className="dev-repo">
              <p className="repo">Repos</p>
              <p className="repo-num">{(userData.public_repos) ? (userData.public_repos) : "8"}</p>
            </div>
            <div className="dev-followers">
              <p className="followers">Followers</p>
              <p className="followers-num">{(userData.followers) ? (userData.followers) : "3938"}</p>
            </div>

            <div className="dev-following">
              <p className="following">Following</p>
              <p className="following-num">{(userData.following) ? (userData.following) : "9"}</p>
            </div>
          </div>

          <div className="dev-details-links">
            <div className="dev-links-left">
              <div className="location">
                <img src="assets/icon-location.svg" alt=""/>
                <p>{(userData.location) ? (userData.location) : "San Francisco"}</p>
              </div>

              <div className="website">
                <img src="assets/icon-website.svg" alt=""/>
                <p>
                  <a href={(userData.blog)}>
                  {(userData.blog) ? (userData.blog).slice(8,28) : "https://github.blog"} 
                  </a>
                </p>
              </div>
            </div>

            <div className="dev-links-right">
              <div className="twitter">
                <img src="assets/icon-twitter.svg" alt=""/>
               <a href={`https://twitter.com/${userData.twitter_username}`} ><p>{(userData.twitter_username) ? (userData.twitter_username) : "Not Available"}</p></a>
              </div>

              <div className="company">
                <img src="assets/icon-company.svg" alt=""/>
                <p>{(userData.company) ? (userData.company) : "@github"}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div> </>
    )
}