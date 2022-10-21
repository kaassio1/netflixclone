import React, {useEffect, useState} from "react";
import tmdb from "./tmdb";
import Movierow from "./components/movierow";
import FeatureMovie from "./components/FeatureMovie";
import './App.css';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null)

  useEffect(()=> {
    const loadAll = async () => {

      let list = await tmdb.getHomeList();
      setMovieList(list);

      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv');

      setFeatureData(chosenInfo);  
      console.log(chosenInfo);  
    }

    loadAll();
  }, []);

  return (
    <div className="page">

      {featureData && 
        <FeatureMovie item={featureData} /> 
      }      

      <section className="lists">
        {movieList.map((item, key)=>(
          <Movierow key={key} title={item.title} items={item.items}/>
        ))}

      </section>

    </div>
  )
};