import { createContext, useContext, useState } from "react";

const UserProfileContext = createContext({
  loading: false,
  isAuth: false,
  likedRecipes: [],
});

export default UserProfileContext;

export function UserProfileContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [likedRecipes, setLikedRecipes] = useState(["r2"]);

  function handleLike(id) {
    setLikedRecipes((prev) => {
      return prev.includes(id)
        ? [...prev.filter((item) => item !== id)]
        : [...prev, id];
    });
  }

  //   useEffect(() => {
  //     async function preload() {
  //       setLoading(true);
  //       const { result } = await fakeFetchCrypto();
  //       const assets = await fetchAssets();

  //       setAssets(mapAssets(assets, result));
  //       setCrypto(result);
  //       setLoading(false);
  //     }
  //     preload();
  //   }, []);

  return (
    <UserProfileContext.Provider
      value={{ loading, isAuth, likedRecipes, handleLike }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(UserProfileContext);
}
