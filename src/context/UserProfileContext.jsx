import { createContext, useContext, useState } from "react";

const UserProfileContext = createContext({
  isAuth: false,
  likedRecipes: [],
});

export default UserProfileContext;

export function UserProfileContextProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [likedRecipes, setLikedRecipes] = useState(["r1", "r5", "r7", "r9"]);

  function handleLike(id) {
    setLikedRecipes((prev) => {
      return prev.includes(id)
        ? [...prev.filter((item) => item !== id)]
        : [...prev, id];
    });
  }

  //   useEffect(() => {
  //     async function preload() {
  //       setIsLoading(true);
  //       const { result } = await fakeFetchCrypto();
  //       const assets = await fetchAssets();

  //       setAssets(mapAssets(assets, result));
  //       setCrypto(result);
  //       setIsLoading(false);
  //     }
  //     preload();
  //   }, []);

  return (
    <UserProfileContext.Provider value={{ isAuth, likedRecipes, handleLike }}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(UserProfileContext);
}
