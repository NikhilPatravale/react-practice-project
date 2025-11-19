import { useEffect, useState } from "react";

type entity = {
  id: number,
  name: string,
  image: string,
}

type resultsState = {
  next: string | null,
  prev: string | null,
  results: entity[],
}

const wait = () => new Promise(res => setTimeout(res, 2000));

async function fetchData(url: string) {
  try {
    await wait();
    const response = await fetch(url);
    if (response.ok) {
      const res = await response.json();
      return res;
    }
    return [];
  } catch (e) {
    console.log('Error:', e);
    return [];
  }
}

export default function useInfiniteScroll() {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchNext, setFetchNext] = useState(true);
  const [results, setResults] = useState<resultsState>({
    next: 'https://rickandmortyapi.com/api/character',
    prev: null,
    results: [],
  });

  useEffect(() => {
    (async () => {
      if (!isLoading) setIsLoading(true);
      if (fetchNext && results.next) {
        const updatedResult = await fetchData(results.next)
        setResults({
          next: updatedResult?.info?.next || null,
          prev: updatedResult?.info?.prev || null,
          results: [...results.results, ...(updatedResult?.results || [])],
        });
      }
      setIsLoading(false);
      setFetchNext(false);
    })()
  }, [results, isLoading, fetchNext]);

  const triggerNextFetch = () => {
    setFetchNext(true);
  }

  // For scroll based loading

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.innerHeight + document.documentElement.scrollTop >= (document.documentElement.scrollHeight - 10)) {
  //       console.log('trigger fetch');
  //       setFetchNext(true);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  return {
    isLoading,
    results,
    triggerNextFetch,
  }
}