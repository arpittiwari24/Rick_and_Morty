import axios from "axios"
import React, { useEffect, useState } from "react"


const App : React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [characters, setCharacters] = useState<any>([])
  const [searchValue,setSearchValue] = useState<string>("")

  useEffect(() => {
    setLoading(true)

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character`, {
        method: "no-cors",  
        withCredentials: false,
        })
        setCharacters(response.data.results)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  },[])

  const filteredCharacters = characters.filter((character: any) =>
    character.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <main className="py-10">
      <div className="text-center lg:text-6xl max-sm:text-4xl">
        <h1 className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 font-bold bg-clip-text text-transparent">Rick and Morty Characters</h1>
      </div>
      <div className="flex items-center justify-center py-10">
        <input 
        type="text" 
        placeholder="Enter Any Character"
        value={searchValue}
        onChange= {(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
        className="w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      {loading && <div className="flex items-center justify-center">Loading</div> }
      {filteredCharacters.length > 0 && !loading? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-6">
          {filteredCharacters.map((character: any) => (
            <div key={character.id}>
              <div className="bg-gradient-to-r from-gray-300 to-pink-300  rounded-lg overflow-hidden shadow-md cursor-pointer">
                <img
                  src={character.image}
                  alt="character Cover"
                  className="w-full h-48 object-cover object-center"
                />
                <div className="p-4 text-center">
                  <h2 className="text-black text-2xl font-bold mb-2">{character.name}</h2>
                  <p className="text-gray-600 mb-2">
                    Species:<span className="underline">{character.species}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-white text-center">No characters found</div>
      )}
    </main>
  )
}

export default App