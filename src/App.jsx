import Header from "./components/Header/Header";
import Score from "./components/Score/Score";
import Subtitle from "./components/Subtitle/Subtitle";
import CardsGrid from "./components/CardsGrid/CardsGrid";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import useFetch from "./hooks/useFetch";
import styles from "./App.module.scss";

function App() {
  const { data, loading, error } = useFetch();

  const handleReset = () => {
    localStorage.setItem("score", 0);
    localStorage.setItem("clickedImages", JSON.stringify([]));
    // Optionally reset bestScore if you want
    // localStorage.setItem("bestScore", 0);
    window.location.reload(); // Reload to reset UI state
  };

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <Header />
      <button onClick={handleReset}>Reset Game</button>
      <Score />
      <Subtitle totalCards={data?.images?.length || 0} />
      <CardsGrid data={data} />
      <Footer />
    </div>
  );
}

export default App;
